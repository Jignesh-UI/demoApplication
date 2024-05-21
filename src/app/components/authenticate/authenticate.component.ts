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

  constructor(private cognitoService: CognitoService, private router:Router){

  }


  login(param:any){
    console.log(param.value);
    this.cognitoService.authenticate(param.value.username, param.value.password).then(session => {
      console.log('222 Login Successfull:', session);
      this.router.navigate(['/apidemo']);
    }).catch(err => {
      console.log('111 Login Failed', err);
    })
  }

  signup(param:any){
    // console.log(param.value);
    // console.log(param.value.username);
    // console.log(param.value.useremail);
    // console.log(param.value.password);

      this.cognitoService.register(param.value.username, param.value.password, param.value.useremail).then(user => {
        console.log('333 user registered', user);
        this.showAuthenticateWindow = !this.showAuthenticateWindow;
      }).catch((err)=>{
        console.log('444 Registration Failed', err);
        if(err.code === "InvalidParameterException"){
          console.log("User name does not match with criteria!");
        }else if(err.code === "InvalidPasswordException"){
          console.log("Password does not match with criteria!");
        }
      });
    }

    confirmUser(param:any){
      const userName:string = param.value.username;
      const validationCode:string = param.value.validationCode;

      this.cognitoService.confirmUser(userName,validationCode).then(()=>{
        console.log("555 Verified");
        this.router.navigate(['/login']);
      }).catch(err => {
        console.log("666 Varification Failed!");
      });
    }

    logout(){
      this.cognitoService.logout();
      this.router.navigate(['/login']);
    }

  }

