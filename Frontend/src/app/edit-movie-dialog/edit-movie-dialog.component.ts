import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validators, FormControl } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-movie-dialog',
  templateUrl: './edit-movie-dialog.component.html',
  styleUrls: ['./edit-movie-dialog.component.css']
})
export class EditMovieDialogComponent {
  [x: string]: any;

  movieForm !: FormGroup;
  actionBtn: string = "Save";

  constructor(private formBuilder: FormBuilder,
    private api: ApiService,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private dialogRef: MatDialogRef<EditMovieDialogComponent>,
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
      this.movieForm.controls['movieTitle'].setValue(this.editData.name);
      this.movieForm.controls['description'].setValue(this.editData.description);
      this.movieForm.controls['duration'].setValue(this.editData.duration);
      this.movieForm.controls['minAge'].setValue(this.editData.minimumAge);
    }
  }

  addMovie(){
    this.updateMovie() 
  }
  updateMovie(){
    this.api.putMovie(this.movieForm.value,this.editData)
    .subscribe({
      next:(res)=>{
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
