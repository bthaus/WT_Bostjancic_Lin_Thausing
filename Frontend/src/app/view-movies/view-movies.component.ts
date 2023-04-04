import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { interval } from 'rxjs';
import { DialogComponent } from '../dialog/dialog.component';
import { ApiService } from '../services/api.service';
import { EditMovieDialogComponent } from '../edit-movie-dialog/edit-movie-dialog.component';
import { DialogManagerCommentsComponent } from '../dialog-manager-comments/dialog-manager-comments.component';

@Component({
  selector: 'app-view-movies',
  templateUrl: './view-movies.component.html',
  styleUrls: ['./view-movies.component.css']
})
export class ViewMoviesComponent {
 
  displayedColumns: string[] = ['id','name', 'description', 'duration', 'minimumAge', 'edit'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private dialog: MatDialog,
    private api: ApiService,
    ){}

  ngOnInit(): void {
    this.getAllMovies();
    console.log(this.getAllMovies);

  }
  
  openDialog() {
    this.dialog.open(DialogComponent, {
      width:'26%'
    }).afterClosed().subscribe(result => {
      this.getAllMovies();
    });
  }

  getAllMovies(){
    this.api.getAllMovies()
    .subscribe({
      next:(res)=>{
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error:(err: any)=>{
        alert("Error while fetching the Records.")
      }
    })
  }

  editMovie(row: any){
    this.dialog.open(EditMovieDialogComponent,{
      width:'30%',
      data:row
    }).afterClosed().subscribe(result => {
      this.getAllMovies();
    });
  }

  editReviews(row: any){
    this.dialog.open(DialogManagerCommentsComponent,{
      width:'30%',
      data:row
    }).afterClosed().subscribe(result => {
      this.getAllMovies();
    });
  }


  deleteMovie(id:number){
    this.api.deleteMovie(id)
    .subscribe({
      next:(res)=>{
        this.getAllMovies();
      },
      error:()=>{
        alert("Error while deleting");
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
