import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CognitoService } from 'src/app/shared/services/cognito.service';

@Component({
  selector: 'app-authenticate',
  templateUrl: './authenticate.component.html',
  styleUrls: ['./authenticate.component.scss']
})
export class AuthenticateComponent {

  username:any;
  userpassword:any;
  uname:any;
  uemail:any;
  upwd:any;
  validationCode:any;

  showSignUp:boolean=true;
  showAuthenticateWindow:boolean=true;
  errMessage:string = '';
  showLoading:boolean = false;

  constructor(private cognitoService: CognitoService, private router:Router){

  }


  login(param:any){
    console.log(param.value);
    this.errMessage ='';
    this.showLoading = true;
    this.cognitoService.authenticate(param.value.username, param.value.password).then(session => {
      // console.log(session);
      this.router.navigate(['/apidemo']);
      this.showLoading = false;
    }).catch(err => {
      this.errMessage = err;
      this.showLoading = false;
    })
  }

  signup(param:any){
    this.showLoading = true;
    this.cognitoService.register(param.value.username, param.value.password, param.value.useremail).then(user => {
      console.log('333 user registered', user);
      this.showAuthenticateWindow = !this.showAuthenticateWindow;
      this.showLoading = false;
    }).catch((err)=>{
      console.log('444 Registration Failed', err);
      if(err.code === "InvalidParameterException"){
        console.log("User name does not match with criteria!");
      }else if(err.code === "InvalidPasswordException"){
        console.log("Password does not match with criteria!");
      }
      this.showLoading = false;
    });
  }

  confirmUser(param:any){
    const userName:string = param.value.username;
    const validationCode:string = param.value.validationCode;
    this.showLoading = true;
    this.cognitoService.confirmUser(userName,validationCode).then(()=>{
      console.log("555 Verified");
      this.showLoading = false;
      this.router.navigate(['/login']);
    }).catch(err => {
      this.showLoading = false;
      console.log("666 Varification Failed!");
    });
  }

  logout(){
    this.cognitoService.logout();
    this.router.navigate(['/login']);
  }



  }

