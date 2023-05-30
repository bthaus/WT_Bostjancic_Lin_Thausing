import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import { Globals } from 'src/assets/Globals';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  redirect: string | undefined;
  redirectUrl: string = '/home';

  constructor(private route: ActivatedRoute, private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => this.redirect = params['route']);
  }

  form: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  submit() {
    if (this.form.valid) {
      const val = this.form.value;
  
      if (val.username && val.password) {
          this.authService.login(val.username, val.password)
              .subscribe(
                  (res:any) => {
                      console.log("User is logged in");
                      var type:any = val.type;
                      if(res.type == "Customer"){
                        
                        this.router.navigateByUrl('/program');
                      }
                      else{
                        this.router.navigateByUrl('/presentation');
                      }
                      
                  }
              );
      }
    }
  }

  @Input() error: string | undefined;

  @Output() submitEM = new EventEmitter();

}
