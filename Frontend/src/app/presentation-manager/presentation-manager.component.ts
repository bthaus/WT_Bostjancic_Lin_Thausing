import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DialogComponent } from '../dialog/dialog.component';
import { ApiService } from '../services/api.service';
import { DilogPresentationsComponent } from '../dilog-presentations/dilog-presentations.component';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-presentation-manager',
  templateUrl: './presentation-manager.component.html',
  styleUrls: ['./presentation-manager.component.css']
})
export class PresentationManagerComponent {
  [x: string]: any;
  displayedColumns: string[] = ['presentationID', 'movieName','date', 'hallID', 'edit'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private dialog: MatDialog,
    private api: ApiService, 
    private router:Router,
    private authService:AuthService,
    private snackBar: MatSnackBar,
    ){}

  ngOnInit(): void {
    console.log(this.getAllPresentation());
  }
  
  openDialogP() {
    this.dialog.open(DilogPresentationsComponent, {
      width:'26%'
    }).afterClosed().subscribe(result => {
      this.getAllPresentation();
    });
  }

  getAllPresentation(){
    this.api.getAllCinemaHalls()
    .subscribe({
      next:(res)=>{
        var obj = JSON.parse(res);
        var presentations = new Array();

        for(let i = 0; i < obj.halls.length; i++){
          if(obj.halls[i].presentations != undefined){
            for(let j = 0; j < obj.halls[i].presentations.length; j++){
              presentations.push({"hallID": obj.halls[i].ID, "presentationID":  obj.halls[i].presentations[j].ID, "movieName": obj.halls[i].presentations[j].movie.name, "date": this.getDate(obj.halls[i].presentations[j].start)});
            }
          }
        }


        this.dataSource = new MatTableDataSource(presentations);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error:(err:any)=>{
        this.snackBar.open("Error while fetching presentation data.");
      }
    })
  }

  getDate(dateString:string){
    return new Date(dateString).toLocaleString();
  }

  getAllMoviesPresentation(){
    this.api.getAllMovies()
    .subscribe({
      next:(res)=>{
        this.dataSource = new MatTableDataSource(res);
        console.log(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error:(err)=>{
        this.snackBar.open("Error while fetching presentation data");
      }
    })
  }


  editPresentation(row: any){
    this.dialog.open(DialogComponent,{
      width:'30%',
      data:row
    }).afterClosed().subscribe(result => {
      this.getAllPresentation();
    })
  }


  deletePresentation(id:number){
    this.api.deletePresentation(id)
    .subscribe({
      next:(res)=>{
        this.getAllPresentation();
      },
      error:(err)=>{
        this.snackBar.open("Error while deleting presentation data");
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
