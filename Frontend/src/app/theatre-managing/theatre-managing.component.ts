import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DialogComponent } from '../dialog/dialog.component';
import { ApiService } from '../services/api.service';
import { DialogHallsComponent } from '../dialog-halls/dialog-halls.component';
import { SeatTheatremanagerDialogComponent } from '../seat-theatremanager-dialog/seat-theatremanager-dialog.component';
import { AppComponent } from '../app.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-theatre-managing',
  templateUrl: './theatre-managing.component.html',
  styleUrls: ['./theatre-managing.component.css']
})
export class TheatreManagingComponent {

  [x: string]: any;
  displayedColumns: string[] = ['ID', 'feature','numSeats', 'edit'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private dialog: MatDialog,
    private api: ApiService,
    private snackBar: MatSnackBar,
    private appComponent:AppComponent
    ){}


  ngOnInit(): void {
    this.getAllTheatres();
   // console.log(this.getAllTheatres);
  }
  
  openTheatreDia() {
    this.dialog.open(DialogHallsComponent, {
      width:'26%'
    }).afterClosed().subscribe(result => {
      this.getAllTheatres();
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
        this.snackBar.open("Error while fetching theatre data");     
      }
    })
  }

  editHall(row: any){
    this.dialog.open(SeatTheatremanagerDialogComponent,{
      width:'30%',
      data:row
    }).afterClosed().subscribe(result => {
      this.getAllTheatres();
    });
  }

  deleteTheatre(id:number){
    this.api.deleteHall(id)
    .subscribe({
      next:(res)=>{
        this.getAllTheatres();
      },
      error:(err:any)=>{
        this.snackBar.open("Error while deleting theatres.");      
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
