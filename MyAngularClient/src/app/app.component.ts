import { Component, OnInit } from '@angular/core';
import { OktaAuthService } from '@okta/okta-angular';
import { Router, ActivatedRoute } from '@angular/router';
import {ServicesService} from "./login/services/services.service";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public title = 'Tech Explorers';
  public isAuthenticated: boolean;
  currentUser="na "

  constructor(public servicesService:ServicesService,public route:Router,public oktaAuth: OktaAuthService,public activateRoute:ActivatedRoute) {
    this.oktaAuth.$authenticationState.subscribe(
      (isAuthenticated: boolean)  => this.isAuthenticated = isAuthenticated
    );
  }

ngOnInit() {
  this.servicesService.user$.subscribe
  (
    (value)=>{this.currentUser=value
    console.log(value);}
  );
console.log(this.currentUser)
  }

  login() {
    this.route.navigate(["/login"])
  }

  logout() {
    this.servicesService.setValue(null);
  }
}
