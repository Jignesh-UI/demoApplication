import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotifyService {

  notifyLength:number = 0;
  notifications:any[]=[];

  constructor(private http: HttpClient) { }

  async getNotifications(){
    // console.log("notification function from service");
    const notificationURL = "https://dqnlczmotihntutd3dv4dcleri0dfxzc.lambda-url.us-east-1.on.aws/";
    this.http.get(notificationURL).subscribe((response:any)=>{

      if(this.notifyLength == 0 ){
        this.notifyLength = response.data.length;
      }else{
        this.notifyLength = this.notifyLength +1;
      }

      if(this.notifications.length == 0){
        this.notifications = response.data;
      }else{
        this.notifications = [...this.notifications, response.data[0]];
      }

      // console.log(this.notifications);
    }, err =>{
      console.log(err)
    })

  }

}
