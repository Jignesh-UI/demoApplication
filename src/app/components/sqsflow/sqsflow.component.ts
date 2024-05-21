import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NotifyService } from 'src/app/shared/services/notify.service';

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

  constructor(private http: HttpClient, private ns: NotifyService) {
  }

  async ngOnInit() {
    await this.loadData();
  }

  async loadData(){
    this.showLoading = true;
    this.http.get(this.fetchDBurl).subscribe((sdata:any) => {
      console.log(sdata.data);
      this.itemsMaster.push(sdata.data);
      console.log(this.itemsMaster);
      this.showLoading = false;
    })
  }

  async updateItemsQty(itemid: number, itemname: string, itemquantity: number){
    // console.log(itemid);
    // console.log(itemname);
    // console.log(itemquantity);
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
    await this.ns.getNotifications();
  }

  async updateItemsQty1(){

  }

}
