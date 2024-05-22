import { Injectable } from '@angular/core';
import { AuthenticationDetails, CognitoRefreshToken, CognitoUser, CognitoUserAttribute, CognitoUserPool } from 'amazon-cognito-identity-js';

@Injectable({
  providedIn: 'root'
})
export class CognitoService {

  private userPool: CognitoUserPool;
  registeredUser: CognitoUser | undefined;


  constructor() {
    this.userPool = new CognitoUserPool({
      UserPoolId:'us-east-1_av5OlLBuA',
      ClientId:'2kupi71j9n99gv6h6kocrss0o'
    });
   }

   register(username: string, password:string, email:string){
    const attributeList = [
      new CognitoUserAttribute({
        Name:'email',
        Value: email
      })
    ];

      return new Promise((resolve,reject)=> {
        this.userPool.signUp(username, password, attributeList,[],(err,result)=>{
          if(err){
            // console.log("+++ User Not Registered")
            reject(err);
          }else{
            // console.log(result);
            // console.log("+++ User Registered")
            this.registeredUser = result?.user;
            resolve(result?.user);
          }
        })
      });
   }

   confirmUser(userName:string, validationCode:string){
      const userData = {
        Username: userName,
        Pool:this.userPool
      };
      const cognitoUser = new CognitoUser(userData);

      return new Promise((resolve,reject)=>{
        cognitoUser.confirmRegistration(validationCode,true,(err,result)=>{
          if (err) {
            // console.log("+++ User Confirmed")
            // console.log("Authentication Failed!");
            reject(err);
        } else {
            // console.log("--- User Not Confirmed")
            // console.log("Authentication Successfull!");
            resolve(result); // 'SUCCESS'
        }
        })
      });
   }

   authenticate(username:string, password:string){
     const authenticateDetails = new AuthenticationDetails({
       Username:username,
       Password:password
     });
     const userData = {
       Username: username,
       Pool: this.userPool
     };

     const cognitoUser = new CognitoUser(userData);
     return new Promise((resolve,reject)=>{
       cognitoUser.authenticateUser(authenticateDetails, {
         onSuccess:(result) => {
          console.log("+++ Authentication Resolve")
           resolve(result);
         },
         onFailure:(err)=>{
          console.log("--- Authentication Failed")
          console.log(err);
           reject(err.message);
         }
       });
     });
   }

   logout(){
    const cognitoUser = this.userPool.getCurrentUser();
    if(cognitoUser){
      cognitoUser.signOut();
    }
   }

   getAuthenticatedUser(){
    return this.userPool.getCurrentUser();
   }

   isAuthenticated(){
    const user = this.userPool.getCurrentUser();
    if(user){
      return true
    }
    return false;
   }



}
