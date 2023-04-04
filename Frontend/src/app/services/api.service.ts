import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Data } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

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
    const headers = { 'content-type': 'application/json'} 
    let movieString = JSON.stringify({"ID":data.ID, "name":data.movieTitle, "description":data.description, 
    "duration": data.duration, "minimumAge": data.minAge});
    return this.http.post<any>(this.protocol + this.host +"/Manager" + "/updateMovie/", movieString, {'headers':headers});
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
    let id = 0;
    let seats = new Array();

    for(let i = 0; i < data.rowSeats; i++){
      let row = new Array();

      for(let j = 0; j < data.colSeats; j++){
        row.push({"ID": id++, "row": i, "number": id+1, "type":"normal"});
      }
      seats.push(row);
    }

    const headers = { 'content-type': 'application/json'} 
    let numSeats = data.colSeats*data.rowSeats;
    let hallData = JSON.stringify({"ID":data.id, "features":data.features, "numSeats":data.numSeats, "seats": seats});

    return this.http.post<any>(this.protocol + this.host +  "/Manager" + "/setHall/", hallData, {'headers':headers});
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

 ///Manager/addPresentation/:movieID/:date/:hallID'

/*
  addHall(data: any){
    return this.http.get(this.protocol + this.host + "/addMovie/");
  }
  //
 
//app.get('/Manager/removeHall/:hallID',function(req,res){
  //Call remove CinemaHall
  deleteHall(cinemaID: number){
    return this.http.get<any>(this.protocol + this.host + "/removeHall/"  + this.username+ "/"+ this.passw+"/" +cinemaID);
  }

  //Calls for CinemaSeats
  addSeat(data: any){
    return this.http.get(this.protocol + this.host + "/addSeat/" + this.username+ "/"+ this.passw+ "/" + data.hallID+ "/"+ data.type+ "/" + data.row+"/"+ data.number);
  }

  removeSeats(seatID: number, hallID: number){
    return this.http.get<any>(this.protocol + this.host + "/removeSeat/"  + this.username+ "/"+ this.passw+"/" + seatID + "/" + hallID);
  }

  //Presentation
    addPresentation(data:any){
      return this.http.get<any>(this.protocol + this.host + "/Manager" +"/addPresentation/" + data.movieID+"/"+data.date+"/"+data.hallID );
    }
//app.get('/Manager/removePresentation/:presentationID',function(req,res){

  deletePresentation(id:number){
    return this.http.get<any>(this.protocol + this.host + "/Manager" + "/removePresentation/" + id );
  }


  /*
  app.post('/setHall/:username/:password',function(req,res){

    app.get('/addHall/:username/:password',function(req,res){
    
     app.get('/getHall/:hallID',function(req,res){
    
     app.get('/removeHall/:username/:password/:hallID',function(req,res){
    
*/


}
