import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-dialog-halls',
  templateUrl: './dialog-halls.component.html',
  styleUrls: ['./dialog-halls.component.css']
})
export class DialogHallsComponent {
  [x: string]: any;
  theatreForm !: FormGroup;
  actionBtn: string = "Save";

  constructor(private formBuilder: FormBuilder,
    private api: ApiService,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private dialogRef: MatDialogRef<DialogComponent>,
    ){}

  ngOnInit(): void{
    this.theatreForm = this.formBuilder.group({
      'features':new FormControl('',[Validators.required]),
      'colSeats': new FormControl('',[Validators.required]),
      'rowSeats': new FormControl('',[Validators.required])
    });

    if(this.editData){
      this.actionBtn = "Update";
      this.theatreForm.controls['features'].setValue(this.editData.features);
      this.theatreForm.controls['colSeats'].setValue(this.editData.colSeats);
      this.theatreForm.controls['rowSeats'].setValue(this.editData.rowSeats);
    }

  }

  addTheatre(){
    if(!this.editData){
      if(this.theatreForm.valid){
        this.api.addHall(this.theatreForm.value)
        .subscribe({
          next:(res)=>{
            alert("Theatre added");
          },
          error:()=>{
            alert("Theatre could not be added.")
          }
        })
      }
    }else{
     //Call for update TheatreHall
     this.updateTheatre(); 
  }    
}
  updateTheatre(){
      console.log("Hello");
  }
}