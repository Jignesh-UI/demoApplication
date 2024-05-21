import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CognitoService } from 'src/app/shared/services/cognito.service';
import { NotifyService } from 'src/app/shared/services/notify.service';

@Component({
  selector: 'app-apidemo',
  templateUrl: './apidemo.component.html',
  styleUrls: ['./apidemo.component.scss']
})
export class ApidemoComponent implements OnInit{
  apiURL="https://3eg5qzfgfi.execute-api.us-east-1.amazonaws.com/dev/demoAPI";

  itemname:any;
  itemquantity:any;

  message:string = "";

  private headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization':'XX'
    })
  }

  constructor(private http: HttpClient, private ns: NotifyService, private cognitoService: CognitoService) {
  }

  async ngOnInit() {
    this.itemname = "iPhone 12";
    this.itemquantity = 21;
  }

  addItems(itemname:string = 'asdf',itemqty:number = 0){
    const params ={
      "itemname": itemname,
      "itemquantity": itemqty
    }
    console.log(params);
    this.cognitoService.getAuthenticatedUser()?.getSession((err: any,session: any) => {
      if(err){
        return;
      }

      this.headers = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': session.getIdToken().getJwtToken()
        })
      }
console.log(session.getIdToken().getJwtToken());
debugger;
      this.http.post(this.apiURL, params, this.headers).subscribe((response:any)=>{
        console.log(response);
        console.log(response.body.message);
        this.itemname = "";
        this.itemquantity = 0;
        this.message = response.body.message;
        setTimeout(async  ()=>{
          this.message = "";
        }, 1000)
      }, err =>{
        debugger;
        console.log(err);
      });

    });




  }

}
