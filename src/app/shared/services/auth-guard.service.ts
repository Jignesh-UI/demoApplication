import { Injectable } from '@angular/core';
import { CognitoService } from './cognito.service';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(private cognitoService: CognitoService, private router:Router ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):Observable<boolean> | Promise<boolean> | boolean {
    const isAuthenticated = this.cognitoService.isAuthenticated();
    console.log(isAuthenticated);
    if(isAuthenticated === false){
      this.router.navigate(['/login']);
    }
    return isAuthenticated;
  }

}
