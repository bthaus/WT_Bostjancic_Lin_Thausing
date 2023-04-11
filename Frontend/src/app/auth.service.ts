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
      
    login(username:string, password:string, type:string ) {
        return this.api.login(username,password,type)
        .pipe(tap((res:any)=> {
          localStorage.setItem("auth_token", res)
          this._isLoggedIn$.next(true);
        }));
          
    }
}
   