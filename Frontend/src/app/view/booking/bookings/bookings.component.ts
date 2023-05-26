import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSelect } from '@angular/material/select';
import { ActivatedRoute, Router } from '@angular/router';
import { ReplaySubject, Subject, take, takeUntil } from 'rxjs';
import { DataApiService } from 'src/app/api/data-api.service';
import { Globals } from 'src/assets/Globals';
import { Film } from 'src/assets/json-objects/IFilm';
import { Hall, Seats } from 'src/assets/json-objects/IHall';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.scss']
})

export class BookingsComponent implements OnInit {
  protected films: Film[] | undefined;
  hall: Hall | undefined;

  selectedFilm: Film | undefined;
  timeSelected: { hallID: number, movieID: number, date: Date } | undefined;
  disableSelection: boolean = false;
  filmDates: Date[] | undefined;
  hallAndMovieIDs: { hallID: number, movieID: number } | undefined;
  reservationData: { hallId: number, movieId: number, date: Date, seats: Seats } | undefined;

  constructor(private router: Router, private route: ActivatedRoute, private service: DataApiService) { }

  ngOnInit(): void {
    if (!Globals.isAuth()) {
      this.router.navigateByUrl('login?route=bookings');
    }
  }

  onSelect(film: Film) {
    this.selectedFilm = film;
    this.disableSelection = true;
    this.service.getDatesForMovieInHalls(film.id).subscribe({
      next: (dates: { hall: number, dates: Date[] }) => {
        this.hallAndMovieIDs = { hallID: dates.hall, movieID: film.id };
        this.filmDates = dates.dates;
      },
      error: err => console.error(err)
    });
  }

  back() {
    this.timeSelected = undefined;
    this.filmDates = undefined;
    this.disableSelection = false;
    this.hallAndMovieIDs = undefined;
    this.selectedFilm = undefined;
    this.reservationData = undefined;
  }

  setDate(date: { hallID: number, movieID: number, date: Date }) {
    this.service.getSeatsForHallById(date.hallID).subscribe({
      next: (seats: Seats) => {
        this.timeSelected = date;
        this.reservationData = { hallId: date.hallID, movieId: date.movieID, date: date.date, seats: seats }
      },
      error: err => console.error(err),
    });

  }
}
