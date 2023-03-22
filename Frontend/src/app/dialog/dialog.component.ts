import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validators, FormControl } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

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
    ){}

  ngOnInit(): void{
    this.movieForm = this.formBuilder.group({

      'movieTitle': new FormControl('',[Validators.required]),
      'description':new FormControl('',[Validators.required]),
      'duration': new FormControl('',[Validators.required]),
      'minAge':new FormControl('',[Validators.required])
    });

    if(this.editData){
      this.actionBtn = "Update";
      this.movieForm.controls['ID'].setValue(this.editData.ID);

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
            alert("Movie added");
            this.dialogRef.close('added');
          },
          error:()=>{
            alert("Movie could not be added.")
          }
        })
      }
    }else{
      this.updateMovie()  
  }    
  }
  updateMovie(){
    this.api.putMovie(this.movieForm.value,this.editData.id)
    .subscribe({
      next:(res)=>{
        alert("Updated")
        console.log("Movie updated");
        this.movieForm.reset();
        this.dialogRef.close('updated');
      },
      error:(err)=>{
        alert("Error while updated the Record.")
      }
    })
  }
}
