import { Component, OnInit } from '@angular/core';
import { LoginComponent } from './../login/login.component';
import { ServicesService } from "./../login/services/services.service";
import { Router, ActivatedRoute } from '@angular/router';
import {DashboardService} from "./services/dashboard.service";
import { ToastrService } from 'ngx-toastr';

import {config} from "./../../environments/config";
export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}


export interface Food {
  value: string;
  viewValue: string;
}

export interface User {
  value: string;
  viewValue: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
];
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource :any;
  label1="asdas"
  selectedUser="";
  currentUser = null;
  assets:any;
  firstHeader=config.firstHeader;
  constructor(public toastrService:ToastrService,public dashboardService:DashboardService,public servicesService: ServicesService, public loginComponent: LoginComponent, public router: Router, private activateRoute: ActivatedRoute) { 


  }
  
  
  
  
  
  
  elements: any = [
    { id: 1, first: 'Mark', last: 'Otto', handle: '@mdo' },
    { id: 2, first: 'Jacob', last: 'Thornton', handle: '@fat' },
    { id: 3, first: 'Larry', last: 'the Bird', handle: '@twitter' },
  ];
assetDesc="";
transactionTable;
assetName="";
selectedAsset="";
assetsList:any;
finalAsset=[];
  foods: Food[] = [
    { value: 'localAgent', viewValue: 'localAgent' },
    { value: 'logisticCompany', viewValue: 'logisticCompany' },
    { value: 'distributor', viewValue: 'distributor' },
    { value: 'consumer', viewValue: 'consumer' },
  ];


  users2=[{ value: 'logisticCompany', viewValue: 'logisticCompany' }]

  users3=[{ value: 'distributor', viewValue: 'distributor' }]

  users4=[{ value: 'consumer', viewValue: 'consumer' }]


  users: User[] = [

  ]
  headElements = ['ID', 'First', 'Last', 'Handle'];
  async ngOnInit() {



    await this.servicesService.user$.subscribe((value) => {
      if (value == null || value == undefined) {
        this.currentUser = value;
        this.router.navigate(["/login"]);
      }
      else{
      this.currentUser = value;
      this.getAssets();
      this.getTransaction();

      // this.getBalance()
    // this.dashboardService.getAssets(this.currentUser)
      }
    }
    );
    // this.currentUser=this.activateRoute.snapshot.params.user;
    console.log(this.currentUser)
      for (var i = 0; i < this.foods.length; i++) {
        if (this.currentUser != this.foods[i].value) {
          this.users.push(this.foods[i])
        }
      }
  }
getTransaction()
{
  this.dashboardService.getTransaction(this.currentUser).subscribe
  (
(res)=>{this.dataSource=res},
(data)=>{}

  )

}
getAssets()
{
  this.finalAsset=[]
this.dashboardService.getAssets(this.currentUser).subscribe(
  (data)=>{console.log(data)
  this.assets=data;
  this.getAssetList()
  },
  (err)=>{this.toastrService.error("unable to fetch assets",err)}
)
}

getAssetList()
{
  this.dashboardService.getAssetList(this.currentUser).subscribe
  (
    (res)=>{console.log(res)
      this.assetsList=res;
    for (var i=0;i<this.assets.length;i++)
    {
      for (var j=0;j<this.assetsList.length;j++){
      // if(!(this.assetsList[i].name==undefined|| this.assets[i].name==undefined)){
      //   console.log("In 130")
      //   break;
      // }
      console.log(i,j)
      if(this.assets[i]['name']==this.assetsList[j]['name']&& this.assetsList[j].name!=undefined)
      {
        var data={
          name:this.assets[i].name,
          displayName:this.assetsList[j].details.displayName
        }
console.log(data)
        this.finalAsset.push(data);
        

      }

    }
  }
    console.log(this.finalAsset)
    
    
    },
    (err)=>{this.toastrService.error("unable to get asset list")}
  )
}




  onChange(value) {
    this.selectedUser=value.value;
  }


  onChange2(value)
  {
    this.selectedAsset=value.value;
  }
  sendAssets()
  {
    let value={
      "from":this.currentUser,
      "to":this.selectedUser,
      "name":this.selectedAsset,
      "desc":this.assetDesc
    }
    this.dashboardService.sendAssets(value).subscribe
    (
      (res)=>{
        this.getAssets();
        this.getTransaction();
        this.toastrService.success("Asset Sent")},
      (err)=>{console.log(err)}
    )
  }

  addAssets()
  {
    let value={
      "from":this.currentUser,
      "to":this.currentUser,
      "name":this.assetName,
      "desc":this.assetDesc
    }
    this.dashboardService.addAssets(value).subscribe
    (
      (res)=>{this.getAssets();
        this.getTransaction();
        this.toastrService.success("Asset Added",res.toString())},
      (err)=>{this.toastrService.error("Error While Adding Asset",err)}
    )
  }


  getBalance()
  {
    this.dashboardService.getBalance(this.currentUser).subscribe
    (
      (data)=>{console.log(data)},
      (err)=>{}
    )
  }




  add(value) {
    console.log(value)
  }
}









