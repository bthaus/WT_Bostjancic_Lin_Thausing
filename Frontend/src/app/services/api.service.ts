import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Data } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
 protocol = "http://";
 host= "localhost:3000";

 login(username: string, password:string, type:string) {
  localStorage.setItem("username", username);
  return this.http.post<any>(this.protocol + this.host + '/login', {"username":username, "password":password, "type":type})
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
