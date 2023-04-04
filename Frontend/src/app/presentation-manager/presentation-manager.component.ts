import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DialogComponent } from '../dialog/dialog.component';
import { ApiService } from '../services/api.service';
import { DilogPresentationsComponent } from '../dilog-presentations/dilog-presentations.component';

@Component({
  selector: 'app-presentation-manager',
  templateUrl: './presentation-manager.component.html',
  styleUrls: ['./presentation-manager.component.css']
})
export class PresentationManagerComponent {
  [x: string]: any;
  displayedColumns: string[] = ['MovieID', 'MovieTitle','Date', 'HallID', 'edit'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private dialog: MatDialog,
    private api: ApiService,
    ){}

  ngOnInit(): void {
    console.log(this.getAllPresentation());
  }
  
  openDialogP() {
    this.dialog.open(DilogPresentationsComponent, {
      width:'26%'
    });
  }

  getAllPresentation(){
    this.api.getAllCinemaHalls()
    .subscribe({
      next:(res)=>{
        var obj = JSON.parse(res);
        var presentations = new Array();

        for(let i = 0; i < obj.halls.length; i++){
          for(let j = 0; j < obj.halls[i].presentations.length; j++){
            presentations.push(obj.halls[i].presentations[j]);
          }
        }


        this.dataSource = new MatTableDataSource(presentations);
        //console.log(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error:(err)=>{
        alert("Error while fetching the Records.")
      }
    })
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
        alert("Error while fetching the Records.")
      }
    })
  }


  editPresentation(row: any){
    this.dialog.open(DialogComponent,{
      width:'30%',
      data:row
    })
  }


  deletePresentation(id:number){
    this.api.deletePresentation(id)
    .subscribe({
      next:(res)=>{
        alert("Success");

      },
      error:()=>{
        alert("Error while delete");
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
