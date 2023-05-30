import { Component, Injectable } from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AuthService } from './auth.service';
import { ApiService } from './services/api-service.service';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Login';
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  hide = true

    constructor(public dialog: MatDialog,private api: ApiService,
      public authService: AuthService, private router:Router) {}
  


  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(DialogAnimationsExampleDialog, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }

  logout(){
    this.authService.logout();
    this.router.navigateByUrl('/');
  }
}

@Component({
  selector: 'openPopUp',
  templateUrl: 'openPopUp.html',
})


export class DialogAnimationsExampleDialog {
  constructor(public dialogRef: MatDialogRef<DialogAnimationsExampleDialog>) {}
}

@Injectable()
export class ManagerActivate implements CanActivate {
  res: boolean = false;
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean>|Promise<boolean>|boolean {
    this.authService.isLoggedIn$.subscribe(res => this.res = res);
    if (this.res && localStorage.getItem("role") != "Manager"){
      this.router.navigateByUrl('/');
    }else if (this.res == false || localStorage.getItem("role") != "Manager") {
      this.router.navigateByUrl('/login');
    }
    return true;
  }
}