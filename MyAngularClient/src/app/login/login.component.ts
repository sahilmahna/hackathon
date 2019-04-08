import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
// import { BehaviorSubject } from 'rxjs/Rx';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject,Observable } from 'rxjs';
import { Injectable } from "@angular/core";
import {ServicesService} from "./services/services.service";
import { OktaAuthService } from '@okta/okta-angular';

// import { AlertService, AuthenticationService } from '../_services';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
@Injectable({
  providedIn: 'root'
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;
    public empDetailSubject = new BehaviorSubject<any>("no");
   public test="sahil";
   customerUpdate$: Observable<any>;
    constructor(private oktaAuthService:OktaAuthService,private toaster:ToastrService,
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,public servicesService:ServicesService
       ) {

        this.customerUpdate$ = this.empDetailSubject.asObservable();
       }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });

        // reset login status

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    getEmployeeDetail(){
      return this.empDetailSubject.asObservable();
  }

    // convenience getter for easy access to form fields
    get f() { return this.loginForm.controls; }
login(name,password)
{
  if(this.servicesService.login(name.value,password.value))
  {
          this.router.navigate(["/dashboard"])
          this.toaster.success('Logged In ', name.value);
  }
  else
    this.toaster.error('Please check credentials ', name.value);

}
    // onSubmit() {
    //   // this.oktaAuthService.loginRedirect();
    //   // console.log(this.empDetailSubject.next("sahil"));

    // if(this.servicesService.login(this.f))
    // {
    //         this.router.navigate(["/dashboard"])

    // }




    // }
}
