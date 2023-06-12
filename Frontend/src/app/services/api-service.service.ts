import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Data } from '@angular/router';
import { map } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { of } from 'rxjs/internal/observable/of';
import { Films } from 'src/assets/json-objects/IFilm';
import { Hall, Halls, Presentation, Seats } from 'src/assets/json-objects/IHall';
import { Review } from 'src/assets/json-objects/IReviews';
import { Ticket, Tickets, User, Users } from 'src/assets/json-objects/IUsers';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  [x: string]: any;

 protocol = "http://";
 host= "localhost:3000";

User:any;


  constructor(private http: HttpClient) { }

  //Movies

  getAllMovies(){
    return this.http.get<any>(this.protocol + this.host +"/getMovies");
  }

//Create
  addMovie(data: any){
    return this.http.get<any>(this.protocol + this.host +  "/Manager" + "/addMovie/" + data.movieTitle +"/" +  data.duration+ "/" + data.minAge+ "/"+ data.description);

  }
  //Update: /Manager/updateMovie/:movieString'
  putMovie(data:any, movieID:number){
    //id: number, name: string, description:string, duration:number, minAge:number
    var movieString = JSON.stringify({"id":movieID, "name":data.movieTitle, "description":data.description, 
    "duration": data.duration, "minimumAge": data.minAge});
    return this.http.get<any>(this.protocol + this.host +"/Manager" + "/updateMovie/"+ movieString);
  }
  //Delete
  deleteMovie(movieID:number){
    return this.http.get<any>(this.protocol + this.host + "/Manager" +"/removeMovie/" +movieID);
  }

  //CinemaHall
  getHall(){
    return this.http.get<any>(this.protocol + this.host + "/getHall/");

  }
  getAllCinemaHalls(){
    return this.http.get<any>(this.protocol + this.host + "/getCinema");
  }


  //Cinema
  addHall(data: any){
    return this.http.get<any>(this.protocol + this.host +  "/Manager" + "/addMovie/" + data.movieTitle +"/" +  data.duration+ "/" + data.minAge+ "/"+ data.description);

  }

  //app.get('/Manager/removeHall/:hallID',function(req,res){
  //Call remove CinemaHall

  deleteHall(id: number){
    return this.http.get<any>(this.protocol + this.host +  "/Manager" + "/removeHall/"  +id);
  }

  //Presentation
  addPresentation(data:any){
    return this.http.get<any>(this.protocol + this.host + "/Manager" +"/addPresentation/" + data.movieID+"/"+data.date+"/"+data.hallID );
  }

//Delete Presentation
  deletePresentation(id:number){
    return this.http.get<any>(this.protocol + this.host + "/Manager" + "/removePresentation/" + id );
  }
  private _jsonPATH = 'assets/json-data/';

  private  movieData = this._jsonPATH + "Movies.json";


  public getFilms(): Observable<Films> {
    console.log(this.movieData);
    return JSON.parse(this.movieData);
  }

  public getHallsByFilmId(id: number): Observable<Halls> {
    let observable: Observable<Halls> = this['getJSON']("Cinema.json");
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
}
