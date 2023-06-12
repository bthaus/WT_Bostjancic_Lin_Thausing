import { HttpClient, HttpClientModule } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, tap } from "rxjs";
import { ApiService } from './services/api.service';


@Injectable()
export class AuthService {
  private _isLoggedIn$ = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this._isLoggedIn$.asObservable();

    constructor(private http: HttpClient,private api: ApiService) {
      const token = localStorage.getItem("auth_token");
      this._isLoggedIn$.next(!!token);

    }

     isCustomer(){
      return localStorage.getItem("role") == "Customer";
     }
     isManager(){
      return localStorage.getItem("role") == "Manager";
     }
     
    login(username:string, password:string ) {
        return this.api.login(username,password)
        .pipe(tap((res:any)=> {
          localStorage.setItem("auth_token", res.token)
          localStorage.setItem("username", username);
          localStorage.setItem("role", res.type);
          this._isLoggedIn$.next(true);
        }));
          
    }

    logout(){
      localStorage.removeItem("auth_token");
      localStorage.removeItem("username");
      localStorage.removeItem("role");


      this._isLoggedIn$.next(false);
    }
}
   