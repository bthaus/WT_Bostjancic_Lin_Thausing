import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validators, FormControl } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent {
  [x: string]: any;

  movieForm !: FormGroup;
  actionBtn: string = "Save";
 
  constructor(private formBuilder: FormBuilder,
    private api: ApiService,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private dialogRef: MatDialogRef<DialogComponent>,
    public snackBar: MatSnackBar
    ){}

  ngOnInit(): void{
    this.movieForm = this.formBuilder.group({
      'movieTitle': new FormControl('',[Validators.required, Validators.minLength(1), Validators.maxLength(60)]),
      'description':new FormControl('',[Validators.required, Validators.minLength(1), Validators.maxLength(250)]),
      'duration': new FormControl('',[Validators.required,Validators.pattern(/^-?(0|[1-9]\d*)?$/), Validators.min(1), Validators.max(600)],),
      'minAge':new FormControl('',[Validators.required,Validators.pattern(/^-?(0|[1-9]\d*)?$/), Validators.min(0), Validators.max(100)])
    });

    if(this.editData){
      this.actionBtn = "Update";
      this.movieForm.controls['movieTitle'].setValue(this.editData.name);
      this.movieForm.controls['description'].setValue(this.editData.description);
      this.movieForm.controls['duration'].setValue(this.editData.duration);
      this.movieForm.controls['minAge'].setValue(this.editData.minimumAge);
    }
  }

  addMovie(){
    if(!this.editData){
      if(this.movieForm.valid){
        this.api.addMovie(this.movieForm.value)
        .subscribe({
          //if success run this
          next:(res)=>{
            this.dialogRef.close('added');
            this.snackBar.open("Movie added successfully");
          },
          error:(err:any)=>{
            this.snackBar.open("Movie could not be added.");
          }
        })
      }
    }else{
      this.updateMovie()  
  }    
  }
  updateMovie(){
    this.api.putMovie(this.movieForm.value,this.editData)
    .subscribe({
      next:(res)=>{
        this.snackBar.open("Movie updated successfully.");
        this.movieForm.reset();
        this.dialogRef.close('updated');
      },
      error:(err)=>{
       this.snackBar.open("Error while fetching movie data..");

      }
    })
  }
}
