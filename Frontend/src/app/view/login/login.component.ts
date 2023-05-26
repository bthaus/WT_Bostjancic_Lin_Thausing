import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Globals } from 'src/assets/Globals';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  redirect: string | undefined;
  redirectUrl: string = '/home';

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => this.redirect = params['route']);
  }

  form: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  submit() {
    if (this.form.valid) {
      this.submitEM.emit(this.form.value);
      Globals.authUser(this.form.value["username"], this.form.value["password"]);
      if (Globals.isAuth() && !!this.redirect) this.redirectUrl = "/" + this.redirect;
      this.router.navigateByUrl(this.redirectUrl);
    }
  }

  @Input() error: string | undefined;

  @Output() submitEM = new EventEmitter();

}
