import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CognitoService } from 'src/app/shared/services/cognito.service';
import { NotifyService } from 'src/app/shared/services/notify.service';

@Component({
  selector: 'app-apidemo',
  templateUrl: './apidemo.component.html',
  styleUrls: ['./apidemo.component.scss']
})
export class ApidemoComponent implements OnInit{
  apiURL="https://3eg5qzfgfi.execute-api.us-east-1.amazonaws.com/dev/demoAPI";

  @ViewChild('itemname1') itemname1: ElementRef | undefined;

  itemname:any;
  itemquantity:any;
  message:string = "";
  showLoading:boolean = false;

  constructor(private http: HttpClient, private ns: NotifyService, private cognitoService: CognitoService) {
  }

  async ngOnInit() {
    this.itemname = "iPhone 12";
    this.itemquantity = 21;
  }

  addItems(itemname:string = '',itemqty:number = 0){
    const params ={
      "itemname": itemname,
      "itemquantity": itemqty
    }
    this.showLoading = true;

    this.cognitoService.getAuthenticatedUser()?.getSession((err: any,session: any) => {
      if(err){
        console.log(err);
        this.showLoading = false;
        return;
      }

      const requestToken = session.getIdToken().getJwtToken()
      const header = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `${requestToken}`
      });
      console.log(requestToken);
      this.http.post(this.apiURL, params, {headers: header}).subscribe((response:any)=>{
        console.log(response);
        console.log(response.body.message);
        this.itemname = "";
        this.itemquantity = 0;
        this.message = response.body.message;
        this.itemname1?.nativeElement.focus();
        this.showLoading = false;
        setTimeout(async  ()=>{
          this.message = "";
        }, 1000)
      }, err =>{
        console.log(err);
        this.showLoading = false;
      });

    });
  }

}
