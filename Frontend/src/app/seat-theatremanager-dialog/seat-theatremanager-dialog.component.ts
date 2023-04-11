import { Component, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from '../services/api.service';
import { FormBuilder, FormGroup } from '@angular/forms';

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
          alert("Error")
        }
      })
    }else{
      this.api.removeFeature(this.editData, feature)
      .subscribe({
        //if success run this
        next:(res)=>{
        },
        error:()=>{
          alert("Error")
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
          alert("Error")
        }
      })
  }
}
