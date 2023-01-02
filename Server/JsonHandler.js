let fs = require('fs');

const users=[];
let manager="Manager";
let customer="Customer";

class UserList{
    constructor(userlist){
        this.userlist=userlist;
    }
}
class Hall{
    constructor(numSeats,seatType,features){
        const seats=new Array(numSeats);
        const moviess=new Array(10)
        this.schedule=moviess
        let rows=numSeats/10;
        let counter=0;
        this.features=features;
        for(let i=0;i<rows;i++){
            for(let j=0;j<10;j++){
                if(counter<=numSeats)  seats[counter++]=new Seat(i,j,seatType);
              
            }
        }
        this.seats=seats;

    }
    addSeat(seat){
        this.seats.push(seat)
    }
    addMovies(movies){
        this.movies=movies;
    }
    addMovie(movie){
        this.movies.push(movie);
    }
    addPresentations(presentations){
        this.schedule=presentations;
    }
    addPresentation(Presentation){
        this.schedule.push(Presentation);
    }
}
class Seat{
    constructor(row,number,type){
        this.row=row;
        this.number=number;
        this.type=type;
    }
}
class Cinema{

    constructor(numHalls,numSeats,seatType){
        const halls=new Array(numHalls)
        this.halls=halls;
        for(let i=0;i<numHalls;i++){

            halls[i]=new Hall(numSeats,seatType,'3d');
        }
       
    }
    addHall(hall){
        this.halls.push(hall);
    }
}
class User{
    constructor(username, password,type){
        this.username=username;
        this.password=password;
        this.type=type;
    }
}
class Movie{
    constructor(name, description, duration, minimumAge){
        const reviews=new Array(1);
        reviews.push("Die Hard is a classic action film that combines high-stakes tension, expertly choreographed action scenes, and a healthy dose of humor, making it a must-see for any fan of the genre.")
        this.reviews=reviews;
        this.name=name;
        this.description=description;
        this.duration=duration;
        this.minimumAge=minimumAge;
    }
   
}
class Presentation{
    //movie= Movie, date=Date
    constructor(movie,date){
        this.movie=movie;
        this.start=date;
    }
    
}



 function writeFile(data,filename){
//WT_Bostjancic_Lin_Thausing/Server/
        fs.writeFileSync('./Server/JSONfiles/'+filename+'.json', data, (err) => {
            if (err){
                return err;
            } 
            else  {
                console.log("successfully written")
                return data;  
            } 
          });
          
}
function initDefaultUsers(){
users.push(new User("Bodo","BodoPasswort",manager));
users.push(new User("Panda","PandaPW",manager));
users.push(new User('melly',"mellyPW",customer));
users.push(new User("Martin","martinpw",customer));
let userlist=JSON.stringify(new UserList(users));
writeFile(userlist,"Users")

}
function addUser(user){

}
function initDefaultData(){

let ima=new Cinema(3,7,'normal');
let hall=new Hall(10,"luxury","atmos");
hall.addSeat(new Seat(1,0,"replacable"))
ima.addHall(hall)   
const schedule=new Array(3);
schedule.push(new Presentation(new Movie("die hard","dying hard",120,18)),new Date("July 4 1776 12:30"))
schedule.push(new Presentation(new Movie("die hard2","hardly dying",120,18)),new Date("July 4 1776 14:30"))
schedule.push(new Presentation(new Movie("die hard3","dye haar",120,18)),new Date("July 4 1776 16:30"))

ima.halls.forEach(element => {
    element.addPresentations(schedule)
});
let data=JSON.stringify(ima);
writeFile(data,"Cinema")

}
function readFileByName(name){
    console.log("reading "+ name)
      return fs.readFileSync('./Server/JSONfiles/'+name+'.json', 'utf8', (err, data) => {
            if (err) return err;
            console.log("successfully read")
          });
   
}

function containsUserimpl(user){
    let checker=false;
    let datauser;
    let data=readFileByName("Users")
    let list=JSON.parse(data);
    console.log(list.userlist)
    list.userlist.forEach(element => {
    if(element.username===user.username&&element.type===user.type){
        checker=true;
        datauser=element;
    }
});
if(checker){
   console.log("user found")
   if(datauser.password===user.password){
    return true;
   }else{return false;}
}
}
function addSeat(seat,hallid){

}
module.exports = {
    initDefault: function() {
     initDefaultData()
     initDefaultUsers()

     
    },
    addSeat: function(hallID,type,row,seatID){
       addSeat(new Seat(row,seatID,type),hallID);
    },
    getCinema:function(){
       return readFileByName("Cinema");
    },
    getUsers: function(){
        return readFileByName("Users");
    },
    containsUser: function(username,password,type){
        return containsUserimpl(new User(username,password,type));
    },
    adduser: function(username,password,type){
        let user=new User(username,password,type)
       
        if(containsUserimpl(user)==undefined){
            console.log("user added");
            addUser(user);
            return;
        }
        console.log("user already in the system")
        
         
    },
    addPresentation: function(movie,){
        
    }

    
 }