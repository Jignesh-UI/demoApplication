import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NotifyService } from 'src/app/shared/services/notify.service';
import { CognitoService } from 'src/app/shared/services/cognito.service';

@Component({
  selector: 'app-sqsflow',
  templateUrl: './sqsflow.component.html',
  styleUrls: ['./sqsflow.component.scss'],
})
export class SqsflowComponent implements OnInit {
  fetchDBurl="https://5ltc6nwed6jqbi2gfyttqyxzga0cpscy.lambda-url.us-east-1.on.aws/";
  itemsMaster: any[] =[];
  showLoading:boolean = false;

  qty:any;

  constructor(private http: HttpClient, private ns: NotifyService, private cognitoService: CognitoService) {
  }

  async ngOnInit() {
    await this.loadData();
  }

  async loadData(){
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
    this.http.get("https://3eg5qzfgfi.execute-api.us-east-1.amazonaws.com/dev/demoAPI/all",{headers:header}).subscribe((sdata:any) => {
      console.log(sdata);
      this.itemsMaster.push(sdata.body.data);
      // console.log(this.itemsMaster);
      this.showLoading = false;
    });
  });

  }

  async updateItemsQty(itemid: number, itemname: string, itemquantity: number){


    this.showLoading = true;
    const params = {
      itemid: itemid,
      itemname: itemname,
      itemquantity: itemquantity,
    };
    this.http.post(this.fetchDBurl,params).subscribe((response:any) => {
      console.log("Post Response");
      console.log(response);

      setTimeout(async  ()=>{
        console.log('works');
        await this.ns.getNotifications();
        this.showLoading = false;
      }, 30000)

      // this.ns.getNotifications();
    });

  }

  async getNotifications(){
    this.showLoading = true;
    await this.ns.getNotifications();
    this.showLoading = false;
  }

}
