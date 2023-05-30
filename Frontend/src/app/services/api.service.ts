import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Data } from '@angular/router';
import { Observable, map, of } from 'rxjs';
import { Films } from 'src/assets/json-objects/IFilm';
import { Seats } from 'src/assets/json-objects/IHall';
import { Review } from 'src/assets/json-objects/IReviews';
import { Ticket, Tickets, User, Users } from 'src/assets/json-objects/IUsers';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  [x: string]: any;
 protocol = "http://";
 host= "localhost:3000";

 login(username: string, password:string) {
  return this.http.post<any>(this.protocol + this.host + '/login', {"username":username, "password":password})
}


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
  putMovie(data:any, movieObject:any){
    //id: number, name: string, description:string, duration:number, minAge:number
    const headers = { 'content-type': 'application/json'} 
    
    movieObject.name = data.movieTitle;
    movieObject.description = data.description;
    movieObject.duration = data.duration;
    movieObject.minimumAge = data.minAge;

    let movieString = JSON.stringify(movieObject);

    return this.http.post<any>(this.protocol + this.host +"/Manager" + "/updateMovie/", movieString, {'headers':headers});
  }
  //Delete
  deleteMovie(movieID:number){
    return this.http.get<any>(this.protocol + this.host + "/Manager" +"/removeMovie/" +movieID);
  }
  //Delete comment
  deleteReview(movieObject:any, indexToDelete:number){
    //id: number, name: string, description:string, duration:number, minAge:number
    const headers = { 'content-type': 'application/json'} ;

    if (indexToDelete > -1) { // only splice array when item is found
      movieObject.reviews.splice(indexToDelete, 1); // 2nd parameter means remove one item only
    }

    let movieString = JSON.stringify(movieObject);

    return this.http.post<any>(this.protocol + this.host +"/Manager" + "/updateMovie/", movieString, {'headers':headers});
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
    let id = 0;
    let seats = new Array();

    for(let i = 0; i < data.rowSeats; i++){

      for(let j = 0; j < data.colSeats; j++){
        seats.push({"ID": id++, "row": i, "number": id, "type":"normal"});
      }
    }

    const headers = { 'content-type': 'application/json'} 
    let numSeats = data.colSeats*data.rowSeats;
    let hallData = JSON.stringify({"ID":data.id, "features":data.features, "numSeats":numSeats, "seats": seats});

    return this.http.post<any>(this.protocol + this.host +  "/Manager" + "/setHall/", hallData, {'headers':headers});
  }
  addFeature(hallObject:any, feature:string){
    if(!hallObject.features.includes(feature)){
      if(hallObject.features.length > 0){
        hallObject.features += ", " + feature;
      }else{
        hallObject.features += feature;
      }
    }

    return this.updateHall(hallObject);
  }
  removeFeature(hallObject:any, feature:string){
    if(hallObject.features.includes(feature)){
      if(hallObject.features.includes(feature + ", ")){
        hallObject.features = hallObject.features.replace(feature + ", ", '');
      }else if(hallObject.features.includes(", "+ feature)){
        hallObject.features = hallObject.features.replace(", " + feature, '');
      }
      else{
        hallObject.features = hallObject.features.replace(feature, '');
      }
    }

    return this.updateHall(hallObject);
  }
  updateSeatType(hallObject:any, id:number, type:string){
    let index = this.findSeatIndex(hallObject, id);

    if(index != -1){
      hallObject.seats[index] = type;
    }

    return this.updateHall(hallObject);
  }

  findSeatIndex(hallObject:any, id:number){
    let seat:any;
    let index = 0;

    for(seat in hallObject.seats){
      if(seat.ID == id){
        return index;
      }

      index++;
    }

    return -1;
  }

  updateHall(hallObject:any){
    const headers = { 'content-type': 'application/json'} 
    return this.http.post<any>(this.protocol + this.host +  "/Manager" + '/updateHall', hallObject, {'headers':headers});
  }

  //app.get('/Manager/removeHall/:hallID',function(req,res){
  //Call remove CinemaHall

  deleteHall(id: number){
    return this.http.get<any>(this.protocol + this.host +  "/Manager" + "/removeHall/"  +id);
  }

  //Presentation
  addPresentation(data:any){
    const headers = { 'content-type': 'application/json'} ;
    let request = {"movieID": data.movie.ID, "date":data.date, "hallID": data.hallID}
    return this.http.post<any>(this.protocol + this.host + "/Manager" +"/addPresentation/", JSON.stringify(request), {'headers':headers} );
  }

//Delete Presentation
  deletePresentation(id:number){
    return this.http.get<any>(this.protocol + this.host + "/Manager" + "/removePresentation/" + id );
  }

  deleteTicketManager(id:number){
    let username = localStorage.getItem("username");
    return this.http.get<any>(this.protocol + this.host + "/Manager" + "/removeTicket/" + username + "/" + id );
  }

  sellTicket(presentationID:number, seatID:number){
    let username = localStorage.getItem("username");
    return this.http.get<any>(this.protocol + this.host + "/Manager" + "/sellTicket/" + username + "/" + presentationID + "/" + seatID);
  }

  removeTicket(ticketID:number){
    return this.http.get<any>(this.protocol + this.host + "/Manager" + "/removeTicket/" + ticketID);
  }

  //M Server

  
  
  public getDatesForMovieInHalls(id: number): Observable<{ hall: number, dates: Date[] }> {
   
    let dates: Date[] = [new Date("2015-03-25T12:00:00Z"), new Date("2015-03-25T13:50:00Z"), new Date("2015-03-25T15:40:00Z"), new Date("2015-03-25T17:30:00Z")];
    let observable: Observable<{ hall: number, dates: Date[] }> = of({ hall: 1, dates: dates });
    return observable;
  }

  public getSeatsForHallById(hallID: number): Observable<Seats> {
    let observable: Observable<Seats> = this['getJSON']("Seats.json");
    return observable;
  }

  public getReviewsByMovieId(movieID: number): Observable<Review[]> {
    let observable: Observable<Review[]> = this['getJSON']("Reviews.json");
    observable.pipe(map((reviews: Review[]) => {
      return reviews.filter((review: Review) => review.movieID === movieID);
    }));
    return observable;
  }

  public getPurchasedTicketsByUsername(Username: string): Observable<Tickets | undefined> {
    this['getJSON']("Users_Extended.json").subscribe({ next: (users: any) => console.log(users) });
    let user: Observable<User | undefined> = this['getJSON']("Users_Extended.json").pipe(map((users: Users) => {
      return users.userlist.filter((user: User) => user.username === Username);
    })).pipe(map((user: User[]) => {
      return user.pop();
    }));
    let tickets: Observable<Tickets | undefined> = user.pipe(map(user => user?.tickets));
    return tickets;
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
