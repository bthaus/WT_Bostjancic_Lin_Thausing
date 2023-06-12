import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptorInterceptor implements HttpInterceptor {

  constructor(private router:Router, private authService:AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const jwt = localStorage.getItem('auth_token');
    if (!!jwt) {
     req = req.clone({
       setHeaders: {
         token: `${jwt}`
       }
     });
   }
   return next.handle(req).pipe(tap (()=> {},
   (err:any) => {
     console.log(err.status + ": " + err.message)
     if(err instanceof HttpErrorResponse){
       
     }if(err.status === 401){ 
      this.authService.logout();
       this.router.navigateByUrl("/login");
     }else{
       return;
     }
   }));
 }
}

