import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { AuthService } from '../auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm = new FormGroup({
    username: new FormControl(null,Validators.required),
    password: new FormControl(null,Validators.required),
    type: new FormControl(null,Validators.required)

  }); 


  constructor(private fb:FormBuilder, 
               private authService: AuthService, 
               private router: Router) {

  
  }

  login() {
      const val = this.loginForm.value;

      if (val.username && val.password && val.type) {
          this.authService.login(val.username, val.password,val.type)
              .subscribe(
                  () => {
                      console.log("User is logged in");
                      this.router.navigateByUrl('/movie');
                  }
              );
      }
  }

}
