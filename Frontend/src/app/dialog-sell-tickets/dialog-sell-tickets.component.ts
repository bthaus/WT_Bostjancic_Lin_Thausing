import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-dialog-sell-tickets',
  templateUrl: './dialog-sell-tickets.component.html',
  styleUrls: ['./dialog-sell-tickets.component.css']
})
export class DialogSellTicketsComponent {
  [x: string]: any;
  ticketForm !: FormGroup;
  actionBtn: string = "Save";
  Movies:any;
  presentations:any;
  seats:any;
  totalPrice:number = 0;

  constructor(private formBuilder: FormBuilder,_formBuilder:FormBuilder,
    private api: ApiService,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private dialogRef: MatDialogRef<DialogComponent>,
    ){}

  ngOnInit(): void{
    this.getAllMovies();

    this.ticketForm = this.formBuilder.group({
      'movieID':new FormControl('',[Validators.required]),
      'presentationID': new FormControl('',[Validators.required]),
      'seatID': new FormControl('',[Validators.required])
    });

    if(this.editData){
      this.actionBtn = "Update";
      this.ticketForm.controls['movieID'].setValue(this.editData.features);
      this.ticketForm.controls['presentationID'].setValue(this.editData.colSeats);
      this.ticketForm.controls['seatID'].setValue(this.editData.rowSeats);
    }

  }

  sellTicket(){
    this.api.sellTicket(this.ticketForm.value.presentationID.ID, this.ticketForm.value.seatID)
    .subscribe({
      next:(res)=>{
        this.dialogRef.close('added');
      },
      error:(err: any)=>{
        alert("Error while fetching the Records.")
      }
    })
  }

  getAllMovies(){
    this.api.getAllMovies()
    .subscribe({
      next:(res)=>{
        this.Movies = res;
      },
      error:(err: any)=>{
        alert("Error while fetching the Records.")
      }
    })
  }

  getPresentations(movie:any){
    this.presentations = [];
    this.api.getAllCinemaHalls()
    .subscribe({
      next:(res)=>{
        if(res != undefined){
          let currentDate = new Date();

          let obj = JSON.parse(res);
            for(let i = 0; i < obj.halls.length; i++){
              if(obj.halls[i].presentations != undefined){
                for(let j = 0; j < obj.halls[i].presentations.length; j++){
                  if(obj.halls[i].presentations[j].movie.ID == movie.ID){
                    //check if the presentation is in the future
                    let compareDate = new Date(obj.halls[i].presentations[j].start);

                    if(compareDate >= currentDate){
                      this.presentations.push({"ID": obj.halls[i].presentations[j].ID,"start":obj.halls[i].presentations[j].start, "hallID": obj.halls[i].ID});
                    }
                  }
                }
              }
            }
        }
      },
      error:(err: any)=>{
        alert("Error while fetching the Records.")
      }
    })
  }

  getSeats(hallID:number, presentationID:number){
    this.seats = [];
    this.api.getAllCinemaHalls()
    .subscribe({
      next:(res)=>{
        if(res != undefined){
          let obj = JSON.parse(res);
            for(let i = 0; i < obj.halls.length; i++){
              if(obj.halls[i].ID == hallID){
                for(let j = 0; j < obj.halls[i].seats.length; j++){
                  if(!this.isSeatTaken(obj.halls[i].seats[j].ID, presentationID, obj.halls[i])){
                    this.seats.push(obj.halls[i].seats[j]);
                  }
                }
                break;
              }
            }
        }

        this.ticketForm.controls['seatID'].setValue(null);
      },
      error:(err: any)=>{
        alert("Error while fetching the Records.")
      }
    })
  }

  isSeatTaken(seatID:number, presentationID:number, hall:any){
    if(hall.presentations != undefined){
      for(let i = 0; i < hall.presentations.length; i++){
        if(hall.presentations[i].ID == presentationID){
          if(hall.presentations[i].tickets != undefined){
            for(let j = 0; j < hall.presentations[i].tickets.length; j++){
              if(hall.presentations[i].tickets[j].seat.ID == seatID){
                return true;
              }
            }
          }
        }
        return false;
      }
    }
    return false;
  }

  calculatePrice(seatType:string, row:number){
    let price = 5;

    if(seatType === "luxury"){
      price += 2
    }else if(seatType === "removeable"){
      price -= 1
    }

    price += row * 0.1;

    let d = new Date(this.ticketForm.value.presentationID.start).getDay()
    
    if(d == 0){
      price += 2;
    }else if(d == 5 || d == 6){
      price += 1;
    }

    this.totalPrice = price;
  }

  getDate(date:string){
    return new Date(date).toLocaleString();
  }
}
