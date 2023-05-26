import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { filter, map, observable, Observable, of, skip } from 'rxjs';

import { Film, Films } from 'src/assets/json-objects/IFilm';
import { Hall, Halls, Presentation, Seats } from 'src/assets/json-objects/IHall';
import { Review, Reviews } from 'src/assets/json-objects/IReviews';
import { Ticket, Tickets, User, Users } from 'src/assets/json-objects/IUsers';

@Injectable({
  providedIn: 'root'
})
export class DataApiService {
  private _jsonPATH = 'assets/json-data/';

  constructor(private http: HttpClient) { }

  public getFilms(): Observable<Films> {
    return this.getJSON("Movies.json");
  }

  public getHallsByFilmId(id: number): Observable<Halls> {
    let observable: Observable<Halls> = this.getJSON("Cinema.json");
    observable.pipe(map((halls: Halls) => {
      let hallContainsMovie: boolean = false;
      halls.forEach((hall: Hall) => {
        hall.presentations.forEach((presentation: Presentation) => {
          if (presentation.movie.id === id) {
            hallContainsMovie = true;
            return;
          }
        });
      });
      return hallContainsMovie;
    }));
    return observable;
  }

  public getDatesForMovieInHalls(id: number): Observable<{ hall: number, dates: Date[] }> {
    /*let observable: Observable<Array<{ hall: number, dates: Date[] }> | undefined>;
    observable = this.getHallsByFilmId(id).pipe(map((halls: Halls) => {
      let hallDateObject: Array<{ hall: number, dates: Date[] }> = new Array<{ hall: number, dates: Date[] }>;
      halls.forEach((hall: Hall) => {
        hall.presentations.forEach((presentation: Presentation) => {
          let dates: Date[] = new Array<Date>;
          if (presentation.ID === id) {
            presentation.movie.presentations.forEach((date: string) => {
              dates.push(new Date(date));
            });
          }
          if (dates !== undefined) hallDateObject?.push({ hall: hall.ID, dates: dates });
        });
      });
      return hallDateObject;
    }));*/
    let dates: Date[] = [new Date("2015-03-25T12:00:00Z"), new Date("2015-03-25T13:50:00Z"), new Date("2015-03-25T15:40:00Z"), new Date("2015-03-25T17:30:00Z")];
    let observable: Observable<{ hall: number, dates: Date[] }> = of({ hall: 1, dates: dates });
    return observable;
  }

  public getSeatsForHallById(hallID: number): Observable<Seats> {
    let observable: Observable<Seats> = this.getJSON("Seats.json");
    return observable;
  }

  public getReviewsByMovieId(movieID: number): Observable<Review[]> {
    let observable: Observable<Review[]> = this.getJSON("Reviews.json");
    observable.pipe(map((reviews: Review[]) => {
      return reviews.filter((review: Review) => review.movieID === movieID);
    }));
    return observable;
  }

  public getPurchasedTicketsByUsername(Username: string): Observable<Tickets | undefined> {
    this.getJSON("Users_Extended.json").subscribe({ next: users => console.log(users) });
    let user: Observable<User | undefined> = this.getJSON("Users_Extended.json").pipe(map((users: Users) => {
      return users.userlist.filter((user: User) => user.username === Username);
    })).pipe(map((user: User[]) => {
      return user.pop();
    }));
    let tickets: Observable<Tickets | undefined> = user.pipe(map(user => user?.tickets));
    return tickets;
  }

  public getJSON(file: string): Observable<any> {
    return this.http.get(this._jsonPATH + file);
  }

  public postTickets(ticketInfo: { hallID: number; movieID: number; seats: string; user: string; }) {
    //TODO: post user booking
    console.error("Not implemented yet! postTickets()");

  }
  postReview(movieID: number, reviewText: string, stars: number, Username: string) {
    //TODO: post review
    console.error("Not implemented yet! postReview()");
  }
  postCancelTicket(ticket: Ticket) {
    throw new Error('Method not implemented.');
  }
}
