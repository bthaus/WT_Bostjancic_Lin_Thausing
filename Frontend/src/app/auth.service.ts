import { HttpClient, HttpClientModule } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, tap } from "rxjs";

@Injectable()
export class AuthService {
  private _isLoggedIn$ = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this._isLoggedIn$.asObservable();

    constructor(private http: HttpClient) {
      const token = localStorage.getItem("auth_token");
      this._isLoggedIn$.next(!!token);

    }
      
    login(username:string, password:string, type:string ) {
        return this.http.post<any>('http://localhost:3000/login', {"username":username, "password":password, "type":type})
        .pipe(tap((res:any)=> {
          localStorage.setItem("auth_token", res)
          this._isLoggedIn$.next(true);
        }));
          
    }
}
   