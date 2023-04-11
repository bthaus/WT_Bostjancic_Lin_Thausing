import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { ApiService } from '../services/api.service';
import {MatGridListModule} from '@angular/material/grid-list';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-dilog-presentations',
  templateUrl: './dilog-presentations.component.html',
  styleUrls: ['./dilog-presentations.component.css']
})
export class DilogPresentationsComponent {
  [x: string]: any;
  presentationForm !: FormGroup;
  actionBtn: string = "Save";
  Movies:any;
  Halls:any;


  constructor(private formBuilder: FormBuilder,
    private api: ApiService,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private dialogRef: MatDialogRef<DialogComponent>){
  }

  

  ngOnInit(): void{
    this.getAllMoviesForSchedule(); 
    this.getAllHallsForSchedule();

    this.presentationForm = this.formBuilder.group({
      'movie': new FormControl('',[Validators.required]),
      'date':new FormControl('',[Validators.required]),
      'hallID':new FormControl('',[Validators.required])
    });

    if(this.editData){
      this.actionBtn = "Update";
      this.presentationForm.controls['movie'].setValue(this.editData.movie);
      this.presentationForm.controls['date'].setValue(this.editData.movie.date);
      this.presentationForm.controls['hallID'].setValue(this.editData.movie.hallID);
    }

  }

  getAllMoviesForSchedule(){
    this.api.getAllMovies()
    .subscribe({
      next:(res: any)=>{
        this.Movies = res;
      },
      error:()=>{
        this.Movies=[];
        alert("Error.")
      }
    })
  }
  getAllHallsForSchedule(){
    this.api.getAllCinemaHalls()
    .subscribe({
      next:(res: any)=>{
       this.Halls = [];
        var obj = JSON.parse(res);

        for(let i = 0; i < obj.halls.length; i++){
          this.Halls.push(obj.halls[i]);
        }
      },
      error:()=>{
        this.Halls=[];
        alert("Error.")
      }
    })
  }
  async addPresentation(){
    let currentDate = new Date();
    let compareDate = new Date(this.presentationForm.value.date);

    if(compareDate > currentDate){
      if(await this.checkValidDate(this.presentationForm.value.hallID)){
        if(this.presentationForm.valid){
          this.api.addPresentation(this.presentationForm.value)
          .subscribe({
            //if success run this
            next:(res: any)=>{
              this.dialogRef.close('added');
            },
            error:(res)=>{
              alert(res.body);
            }
          })
        }
      }else{
        alert("Presentation interferes with another presentation. Please choose another date, time or hall.");
      }
    }else{
      alert("Date and time invalid. The time has to be in the future.");
    }
  }
  
  //checks if the chosen date interferes with another screening of a movie in the hall
  async checkValidDate(hallID:number){
    let fromDate = new Date(this.presentationForm.value.date);
    let toDate = new Date(fromDate.getTime() + this.presentationForm.value.movie.duration*60000);

    const res = await firstValueFrom(this.api.getAllCinemaHalls());

    var obj = JSON.parse(res);

    //iterating all halls
    for(let i = 0; i < obj.halls.length; i++){
      //finding the chosen hall
      if(obj.halls[i].presentations != undefined && obj.halls[i].ID === hallID){
        //comparing all presentation times
        for(let j = 0; j < obj.halls[i].presentations.length; j++){
          let compareFromDate = new Date(obj.halls[i].presentations[j].start);
          let compareToDate = new Date(compareFromDate.getTime() + obj.halls[i].presentations[j].movie.duration*60000);

          if (fromDate <= compareFromDate && compareFromDate <= toDate) return false; //date starts in compareDate
          if (fromDate <= compareToDate   && compareToDate   <= toDate) return false; //compareDate ends in date
          if (compareFromDate <  fromDate && toDate   <  compareToDate) return false; //date in compareDate
        }
        //no overlapping dates in the hall
        return true;
      }
    }
    return true;
  }
} 





