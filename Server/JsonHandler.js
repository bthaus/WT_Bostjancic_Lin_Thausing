const { timeStamp } = require('console');
let fs = require('fs');

const users=[];
let manager="Manager";
let customer="Customer";
let d3="3D";
let d4="4D";
let dolby="Dolby Atmos";
let lux="Deluxe"
let norm="Normal";
let rem="Removable";
let maxseats=50;

//todo: improve if neccessary with closure
let ticketID=0;
let hallID=0;
let seatID=0;
let userID=0;
let movieID=0;


class UserList{
    //fields:   userlist= array of Users(class)
    constructor(userlist){
        this.userlist=userlist;
    }
}
class Hall{
    //fields: schedule=array of Presentations(class)
    //         rows= int of numseats
    //          seattype= string of seattypes, not exhaustive
    //          features= string of a freature, like 3d etc
    //          seats= array of Seat(class)
    constructor(numSeats,seatType,features){
        this.ID=hallID++;
        this.numSeats=numSeats;
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
    //todo remove, replace seat and proper implementation
    addSeat(seat){
        this.seats.push(seat)
    }
  
    addPresentations(presentations){
        this.schedule=presentations;
    }
    addPresentation(Presentation){
        this.schedule.push(Presentation);
    }
}
class Seat{
    //fields: row=int
    //          number= int of "collumn"
    //          type= string of seattype
    constructor(row,number,type){
        this.ID=seatID;
        this.row=row;
        this.number=number;
        this.type=type;
    }
}
class Cinema{
    //fields: halls= array of Hall (class)
              
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
    //fields: username= string
    //          password= string
    //          type= string, restricted to manager and customer, as specified above
    
    constructor(username, password,type){
        this.ID=userID;
        this.username=username;
        this.password=password;
        this.type=type;
    }
}
class Movie{
    //fields: obvious
    //          reviews= array of Strings
    constructor(name, description, duration, minimumAge){
        this.ID=movieID;
        const reviews=new Array(1);
        reviews.push("Die Hard is a classic action film that combines high-stakes tension, expertly choreographed action scenes, and a healthy dose of humor, making it a must-see for any fan of the genre.")
        this.reviews=reviews;
        this.name=name;
        this.description=description;
        this.duration=duration;
        this.minimumAge=minimumAge;
    }
   
}
class Ticket{
    //fields: obvious
    //time, hall and movie are determined by Presentationobject it is held by (should still be stored and accessible)
    constructor(user, seat){
        this.ID=ticketID++;
        this.user=user;
        this.seat=seat;
    }
}
class Presentation{
    //movie= Movie, date=Date  caution: getting a date out of a json via JSON.parse doesnt return a Date
    // class, but a string. this string can be used in the constructor of new Date(JSON.parse(JSONdatestring))
    
    constructor(movie,date){
        this.movie=movie;
        this.start=date;
        
        const tickets=[maxseats];
        this.tickets=tickets;

    }
    //throws error
    createTicket(user, seat){
        let checker=false;

        tickets.forEach(element => {
            if(element!=undefined&&element.seat.row==seat.row&&element.seat.number==seat.number){
                throw new Error("seat already booked");
            }
        });
        
        let ticket=new Ticket(user,seat);
        ticket.movie=this.movie;
        ticket.date=this.date;
        this.tickets.push(ticket);
        return ticket;
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
//returns: undefined: no user found
//returns true: user found, password correct
//returns false: user found, password incorrect
function containsUserimpl(username,password,type){
    let checker=false;
    let datauser;
    let data=readFileByName("Users")
    let list=JSON.parse(data);
    console.log(list.userlist)
    list.userlist.forEach(element => {
    if(element.username===username&&element.type===type){
        checker=true;
        datauser=element;
    }
});
if(checker){
   console.log("user found")
   if(datauser.password===password){
    return true;
   }else{return false;}
}
}
//todo

//manager
function addSeat(seat,hallid){
//check if seat is already in the hall
}
//manager
function removeSeat(seat,hallid){
//check if seat exists
}
//manager
function setCinemaImpl(cinemastring){

}

//all
function addUser(user){
//check if user exists
}
//all
function removeUser(userID){
    //check if user exists
}
//manager
function setHall(hall){

}
//manager
function removeHall(hallID){

}
//throws error
//customer
function bookTicket(user, movie, date, hall){

}
//customer
function removeTicket(ticketID, date){
    //check date
}

//customer
function addReview(review, movie){
    
}


module.exports = {

    Hall:class Hall{
        constructor(test){
            
        }
    },

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
    setCinema:function(cinemastring){
        return setCinemaImpl(cinemastring);
    },
    getUsers: function(){
        return readFileByName("Users");
    },
    containsUser: function(username,password,type){
        return containsUserimpl(username,password,type);
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
        
    },
    login: function(username, password, type){
        let ret=containsUserimpl(username,password,type);
        if(ret==undefined) throw new Error("no such user found")
        if(ret==false) throw new Error("password incorrect")
        if(ret==true){
            return true;
        }
        throw new Error("unexpected Error");
    }


    
 }