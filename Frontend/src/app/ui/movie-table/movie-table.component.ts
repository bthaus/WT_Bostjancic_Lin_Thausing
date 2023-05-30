import { Component, Input, AfterViewInit, ViewChild, OnInit, Output, EventEmitter } from '@angular/core';
import { Film, Films } from 'src/assets/json-objects/IFilm';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-movie-table',
  templateUrl: './movie-table.component.html',
  styleUrls: ['./movie-table.component.scss']
})
export class MovieTableComponent implements OnInit {

  @Output() selectedFilmEmitter = new EventEmitter<Film>();

  films!: Films;

  displayedColumns: string[] = ['name', 'age', 'description', 'actions'];
  dataSource!: MatTableDataSource<Film>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.api.getAllMovies().subscribe({
      next: result => {
        this.films = result;
        this.dataSource = new MatTableDataSource<Film>(this.films);
        this.dataSource.paginator = this.paginator;
      },
      error: err => console.error(err),
    });
  }

  select(filmName: string) {
    let film: Film | undefined = this.films?.find(film => film.name === filmName);
    if (film) this.selectedFilmEmitter.emit(film);
  }
}
