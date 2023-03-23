import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-dilog-presentations',
  templateUrl: './dilog-presentations.component.html',
  styleUrls: ['./dilog-presentations.component.css']
})
export class DilogPresentationsComponent {
  [x: string]: any;
  presentationForm !: FormGroup;
  actionBtn: string = "Save";

  constructor(private formBuilder: FormBuilder,
    private api: ApiService,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private dialogRef: MatDialogRef<DialogComponent>){}

  

  ngOnInit(): void{
   //Morgen add - how should we do this?? @-@
    this.presentationForm = this.formBuilder.group({
      'movieID': new FormControl('',[Validators.required]),
      'date':new FormControl('',[Validators.required]),
      'hallID':new FormControl('',[Validators.required])
    });

    if(this.editData){
      this.actionBtn = "Update";
      this.presentationForm.controls['movieID'].setValue(this.editData.movie.name);
      this.presentationForm.controls['date'].setValue(this.editData.movie.description);
      this.presentationForm.controls['hallID'].setValue(this.editData.movie.duration);
    }

  }


  addPresentation(){
      if(this.presentationForm.valid){
        this.api.addPresentation(this.presentationForm.value)
        .subscribe({
          //if success run this
          next:(res: any)=>{
            alert("Presentation added");
          },
          error:()=>{
            alert("Presentation could not be added.")
          }
        })
      }
    
      
  } 
} 





