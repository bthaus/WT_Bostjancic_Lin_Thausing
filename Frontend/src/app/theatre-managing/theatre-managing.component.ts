import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DialogComponent } from '../dialog/dialog.component';
import { ApiService } from '../services/api.service';
import { DialogHallsComponent } from '../dialog-halls/dialog-halls.component';

@Component({
  selector: 'app-theatre-managing',
  templateUrl: './theatre-managing.component.html',
  styleUrls: ['./theatre-managing.component.css']
})
export class TheatreManagingComponent {

  [x: string]: any;
  displayedColumns: string[] = ['ID', 'feature','num', 'edit'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private dialog: MatDialog,
    private api: ApiService,
    ){}


  ngOnInit(): void {
    this.getAllTheatres();
    console.log(this.getAllTheatres);
  }
  
  openTheatreDia() {
    this.dialog.open(DialogHallsComponent, {
      width:'26%'
    });
  }

  getAllTheatres(){
    this.api.getAllCinemaHalls()
    .subscribe({
      next:(res: any)=>{
        var obj = JSON.parse(res);

        var halls = new Array();

        for(let i = 0; i < obj.halls.length; i++){
          halls.push(obj.halls[i]);
        }

        this.dataSource = new MatTableDataSource(halls);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error:(err: any)=>{
        alert("Error while fetching the Records.")
      }
    })
  }

  editHall(row: any){
    this.dialog.open(DialogComponent,{
      width:'30%',
      data:row
    })
  }

  deleteTheatre(id:number){
    this.api.deleteHall(id)
    .subscribe({
      next:(res)=>{
        alert("Success");
      },
      error:()=>{
        alert("Error while deleting..");
      }
    })
  }
  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
