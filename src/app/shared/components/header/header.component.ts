import { Component, OnInit } from '@angular/core';
import { NotifyService } from '../../services/notify.service';
import { CognitoService } from '../../services/cognito.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  showNotification:boolean = false;
  nlength:number = 0;
  currentUser:any;

  async ngOnInit() {}

  constructor(public ns: NotifyService,private cognitoService: CognitoService, private router:Router){
    this.nlength = ns.notifyLength;
    this.currentUser = cognitoService.getAuthenticatedUser();

  }

  expandCollapseNotification(){
    this.showNotification = !this.showNotification;
  }

  logout(){
    this.cognitoService.logout();
    this.router.navigate(['/login']);

  }

}
