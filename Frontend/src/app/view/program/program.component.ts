import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { Globals } from 'src/assets/Globals';
import { Films } from 'src/assets/json-objects/IFilm';

@Component({
  selector: 'app-program',
  templateUrl: './program.component.html',
  styleUrls: ['./program.component.scss']
})
export class ProgramComponent implements OnInit {
  films: Films | undefined;
  constructor(private router: Router, private api: ApiService) {
  }

  ngOnInit(): void {
    /*
    this.api.getFilms().subscribe({
    
      next: result => this.films = result,
      error: err => console.error(err),
    });
    */
  }
}
