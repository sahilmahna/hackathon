import { Injectable } from '@angular/core';
import { BehaviorSubject,observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {


  public user=new BehaviorSubject<any>(null);
  public user$=this.user.asObservable();
  constructor() { }



  setValue(value)
  {
    console.log(value+"in set");
    this.user.next(value)
  }

  
  login(name,password)
  {
     if((name=="localAgent" && password=="localAgent")||(name=="logisticCompany" && password=="logisticCompany"||name=="consumer" && password=="consumer")||(name=="distributor" && password=="distributor"))
          {
            console.log("logged in");
            this.setValue(name);
            // this.loading = false;
            
            // this.router.navigate(["/dashboard/"+f.username.value])
          return true;
          }
          else {
          console.log("not logged in");
          this.setValue(null);

          
        }
  }
}
