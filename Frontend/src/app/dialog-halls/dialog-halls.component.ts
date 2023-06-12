import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { ApiService } from '../services/api.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-dialog-halls',
  templateUrl: './dialog-halls.component.html',
  styleUrls: ['./dialog-halls.component.css']
})
export class DialogHallsComponent {
  [x: string]: any;
  theatreForm !: FormGroup;
  actionBtn: string = "Save";
  allFeatures: string[] | undefined;

  constructor(private formBuilder: FormBuilder,_formBuilder:FormBuilder,
    private api: ApiService,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private dialogRef: MatDialogRef<DialogComponent>,
    public snackBar: MatSnackBar
    ){}

  ngOnInit(): void{

    this.allFeatures =  ['3d', '4d', 'atmos', 'hdr', '4k'];
    this.theatreForm = this.formBuilder.group({
      'features':new FormControl(''),
      'colSeats': new FormControl('',[Validators.required,Validators.pattern(/^-?(0|[1-9]\d*)?$/)]),
      'rowSeats': new FormControl('',[Validators.required,Validators.pattern(/^-?(0|[1-9]\d*)?$/)])
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
            this.dialogRef.close('added');
            this.snackBar.open("Theatre successfully added.");
          },
          error:(err)=>{
            this.snackBar.open("Error, theatre could not added.");
          }
        })
      }
    }   
  }
}