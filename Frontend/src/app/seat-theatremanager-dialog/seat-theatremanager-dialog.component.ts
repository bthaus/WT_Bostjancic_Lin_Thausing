import { Component, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from '../services/api.service';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-seat-theatremanager-dialog',
  templateUrl: './seat-theatremanager-dialog.component.html',
  styleUrls: ['./seat-theatremanager-dialog.component.css']
})
export class SeatTheatremanagerDialogComponent {
  features = this._formBuilder.group({
    threed: this.editData.features.includes("3d"),
    fourd: this.editData.features.includes("4d"),
    atmos: this.editData.features.includes("atmos"),
    hdr: this.editData.features.includes("hdr"),
    fourk: this.editData.features.includes("4k")
  });

  seatTypes = [
    "normal", "luxury", "removeable"
  ];

  displayedColumns = ['ID', 'row', 'number', 'type'];
  dataSource!: MatTableDataSource<any>;
  
  constructor(private _formBuilder: FormBuilder,private dialog: MatDialog,
    private api: ApiService,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    ){}
  
  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.editData.seats);
  }

  updateFeature(isChecked:boolean, feature:string){
    if(isChecked){
      this.api.addFeature(this.editData, feature)
      .subscribe({
        //if success run this
        next:(res)=>{
        },
        error:()=>{
          this.snackBar.open("Error while updating features from seats.");
        }
      })
    }else{
      this.api.removeFeature(this.editData, feature)
      .subscribe({
        //if success run this
        next:(res)=>{
        },
        error:()=>{
          this.snackBar.open("Error while removing features from seats.");
        }
      })
    }
  }

  updateSeatType(id:number, type:string){
    this.api.updateSeatType(this.editData, id, type)
      .subscribe({
        //if success run this
        next:(res)=>{
        },
        error:()=>{
          this.snackBar.open("Error while updating seattypes from seats.");
        }
      })
  }
}
