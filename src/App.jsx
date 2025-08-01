import { useEffect, useState } from 'react'
import {useDispatch} from 'react-redux';
import authService from './appwrite/auth';
import {login,logout} from "./store/authSlice"
import './App.css'
import { Header,Footer } from './components';
import { Outlet } from 'react-router-dom';

function App() {
  const [loading,setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(()=>{
    authService.getCurrentUser().then((userData)=>{
      if(userData) dispatch(login({userData}))
      else dispatch(logout())
    })
    .catch((error)=>{console.log(error)})
    .finally(()=>{
      setLoading(false)
    })
  },[])

  return !loading ? (
    <div className="min-h-screen flex flex-wrap content-between bg-gray-400">
      <div className='w-full block'>
        <Header/>
        <main className='flex items-center justify-center'>
          TODO:{/*<Outlet />*/}
        </main>
        <Footer />
      </div>
    </div>
  ):null
}

export default App
