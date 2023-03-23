import { Component } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';


export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

    title = 'Login';
    emailFormControl = new FormControl('', [Validators.required, Validators.email]);
    hide = true
    loginForm = new FormGroup({
      username: new FormControl(null,Validators.required),
      password: new FormControl(null,Validators.required),
      type: new FormControl(null,Validators.required)
  
    }); 
  
      constructor(public dialog: MatDialog,private fb:FormBuilder, 
        private authService: AuthService, 
        private router: Router) {}
    
  
    matcher = new MyErrorStateMatcher();
    
  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(DialogAnimationsExampleDialog, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }

  login() {
    const val = this.loginForm.value;
    console.log(this.loginForm.value);

    if (val.username && val.password && val.type) {
        this.authService.login(val.username, val.password,val.type)
            .subscribe(
                () => {
                    console.log("User is logged in");
                    var type:any = val.type;
                    if(type == "Customer"){
                      this.router.navigateByUrl('/movie');
                    }
                    else{
                      this.router.navigateByUrl('/presentation');
                    }
                    
                }
            );
    }
}

}

export class DialogAnimationsExampleDialog {
  constructor(public dialogRef: MatDialogRef<DialogAnimationsExampleDialog>) {}
}
