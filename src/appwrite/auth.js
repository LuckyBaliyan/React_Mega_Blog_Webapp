import conf from '../conf/conf';
import {Client,Account, ID} from 'appwrite';


export class Authservice {
    client = new Client();

    constructor(){
        this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId);
        this.account = new Account(this.client);
    }

    async createAccount({email,password,name}){
        try{
           const userAccount = await this.account.create(ID.unique(),email,password,name);
           if(userAccount){
             return this.login({email,password});
           }else{
            return userAccount
           }
        }catch(error){
            throw error;
        }
    }

    async login({email,password}){
        try{
            return await this.account.createEmailPasswordSession(email,password)
        }catch(error){
            throw error;
        }
    }

    async getCurrentUser(){
        try{
           return await this.account.get();
        }catch (error){
            throw error
        }

        return null;
    }
    
    async logOut(){
        try{
          await this.account.deleteSessions();
        }catch(error){
            throw new error
        }
    }
} 

const authService = new Authservice();

export default authService;