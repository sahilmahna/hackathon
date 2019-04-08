import { Injectable } from '@angular/core';
// import {Http} from '@angular/http';
import { RequestOptions } from '@angular/http';
import { Headers } from '@angular/http';
import {environment} from "./../../../environments/environment";
import { HttpHeaders,HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  headers=new HttpHeaders({ 'Content-Type': 'application/json' });
  url="http://"+environment.url+":"+environment.port;
  constructor(public http:HttpClient) { }

  getBalance(user)
  {
    return this.http.get(this.url+"/getBalance/"+user);
  }
  getAssets(user)
  {
    return this.http.get(this.url+"/assets/"+user);

  }
  getAssetList(user)
  {
    return this.http.get(this.url+"/asset-list/"+user)
  }
  addAssets(assetDetail)
  {

    return this.http.post(this.url+"/asset-issuance",assetDetail,{ headers: this.headers })
  }

  sendAssets(assetDetail)
  {

    return this.http.post(this.url+"/transfer",assetDetail,{ headers: this.headers })
  }

  getTransaction(user)
  {
    return this.http.get(this.url+"/transactions/"+user)
  }
}
