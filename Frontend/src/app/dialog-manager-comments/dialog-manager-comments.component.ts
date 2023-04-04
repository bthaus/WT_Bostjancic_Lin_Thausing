import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../services/api.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-dialog-manager-comments',
  templateUrl: './dialog-manager-comments.component.html',
  styleUrls: ['./dialog-manager-comments.component.css']
})
export class DialogManagerCommentsComponent implements OnInit {
    displayedColumns = ['reviews', 'edit'];
    [x: string]: any;
    dataSource!: MatTableDataSource<any>;

@ViewChild(MatPaginator) paginator!: MatPaginator;
@ViewChild(MatSort) sort!: MatSort;
constructor(private dialog: MatDialog,
  private api: ApiService,
  @Inject(MAT_DIALOG_DATA) public editData: any,
  ){}

ngOnInit(): void {
  this.dataSource = new MatTableDataSource(this.editData.reviews);
}

deleteReview(index:number){
  this.api.deleteReview(this.editData, index)
  .subscribe({
    next:(res)=>{
      this.dataSource = new MatTableDataSource(this.editData.reviews);
    },
    error:(err)=>{
      alert("Error while updated the Record.")
    }
  })
}
}

