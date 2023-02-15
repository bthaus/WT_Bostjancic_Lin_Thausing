const { timeStamp } = require('console');
let fs = require('fs');
const { getCinema } = require('../App/Connectivity/Client');



module.exports = {

    UserList: class UserList {
        //fields:   userlist= array of Users(class)
        constructor(userlist) {
            this.userlist = userlist;
        }
    },
    Hall: class Hall {
        //fields: schedule=array of Presentations(class)
        //         rows= int of numseats
        //          seattype= string of seattypes, not exhaustive
        //          features= string of a freature, like 3d etc
        //          seats= array of Seat(class)
        constructor(numSeats, seatType, features) {
            this.ID = hallID++;
            this.numSeats = numSeats;
            const seats = new Array(numSeats);
            const moviess = new Array(0)
            this.presentations = moviess
            let rows = numSeats / 10;
            let counter = 0;
            this.features = features;
            for (let i = 0; i < rows; i++) {
                for (let j = 0; j < 10; j++) {
                    if (counter <= numSeats) seats[counter++] = new module.exports.Seat(i, j, seatType);

                }
            }
            this.seats = seats;

        }

    },
    Seat: class Seat {
        //fields: row=int
        //          number= int of "collumn"
        //          type= string of seattype
        constructor(row, number, type) {
            this.ID = seatID++;
            this.row = row;
            this.number = number;
            this.type = type;
        }
    },
    Cinema: class Cinema {
        //fields: halls= array of Hall (class)

        constructor(numHalls, numSeats, seatType) {
            const halls = new Array(numHalls)
            this.halls = halls;
            for (let i = 0; i < numHalls; i++) {

                halls[i] = new module.exports.Hall(numSeats, seatType, '3d');
            }

        }
        addHall(hall) {
            this.halls.push(hall);
        }
    },
    User: class User {
        //fields: username= string
        //          password= string
        //          type= string, restricted to manager and customer, as specified above

        constructor(username, password, type) {
            this.ID = userID++;
            this.username = username;
            this.password = password;
            this.type = type;
            this.tickets = new Array(0);
        }
    },
    Movie: class Movie {
        //fields: obvious
        //          reviews= array of Strings
        constructor(name, description, duration, minimumAge) {
            this.ID = movieID++;
            const reviews = new Array(0);
            const presentations=new Array(0);
            this.presentations=presentations;
            this.reviews = reviews;
            this.name = name;
            this.description = description;
            this.duration = duration;
            this.minimumAge = minimumAge;
        }

    },
    Ticket: class Ticket {
        //fields: obvious
        //time, hall and movie are determined by Presentationobject it is held by (should still be stored and accessible)
        constructor(user, seat) {
            this.ID = ticketID++;
            this.user = user;
            this.seat = seat;
        }
    },
    //todo: fix array problem with date (date is saved as extra entry into the schedule array upon initialisation, despite being in the presentation class)
    Presentation: class Presentation {
        //movie= Movie, date=Date  caution: getting a date out of a json via JSON.parse doesnt return a Date
        // class, but a string. this string can be used in the constructor of new Date(JSON.parse(JSONdatestring))

        constructor(movie, date) {

            this.movie = movie;
            this.start = date;
            this.ID = presentationID++;
            const tickets = [];
            this.tickets = tickets;

        }
        //throws error
        createTicket(user, seat) {
            let checker = false;

            tickets.forEach(element => {
                if (element != undefined && element.seat.row == seat.row && element.seat.number == seat.number) {
                    throw new Error("seat already booked");
                }
            });

            let ticket = new module.exports.Ticket(user, seat);
            ticket.movie = this.movie;
            ticket.date = this.date;
            this.tickets.push(ticket);
            return ticket;
        }

    },

    initDefault: function () {
        initDefaultData()
        initDefaultUsers()
    },
    addSeat: function (hallID, type, row, seatID) {
        return addSeat(new module.exports.Seat(row, seatID, type), hallID);
    },
    removeSeat: function (hallID, seatID,) {
        return removeSeat(hallID, seatID);
    },
    getCinema: function () {
        return readFileByName("Cinema");
    },
    setCinema: function (cinemastring) {
        return setCinemaImpl(cinemastring);
    },
    getUsers: function () {
        return readFileByName("Users");
    },
    containsUser: function (username, password, type) {
        return containsUserimpl(username, password, type);
    },
    adduser: function (username, password, type) {
        return addUser(new module.exports.User(username, password, type))

    },
    removeUser: function (userID) {
        return removeUser(userID);
    },
    login: function (username, password, type) {
        let ret = containsUserimpl(username, password, type);
        if (ret == undefined) throw new Error("no such user found")
        if (ret == false) throw new Error("password incorrect")
        if (ret == true) {
            return true;
        }
        throw new Error("unexpected Error");
    },
    getHall: function (hallID) {
        return getHall(hallID);
    },
    //todo: talk about parameters
    addHall: function (hall) {
            return addHall(hall)
    },
    updateHall: function(hall){
        return updateHall(hall);
    },
    removeHall: function (hallID) {
        return removeHall(hallID);
    },
    getMovies: function () {
        return getMovies();
    },
    getMovieByID: function (movieID) {
        return getMovieByID(movieID);
    },
    removeMovie: function (movieID) {
        return removeMovie(movieID);
    },
    addMovie: function (name, duration, minimumAge, description) {
        return addMovie(new module.exports.Movie(name, description, duration, minimumAge));
    },
    updateMovie:function(movie){
        return updateMovie(movie);
    },
    addPresentation: function (movieID, date, hallID) {
        return addPresentation(movieID, date, hallID)
    },
    removePresentation: function (presentationID) {
        return removePresentation(presentationID)
    },
    getPresentation: function (presentationID) {
        return getPresentation(presentationID);
    },
    boockTicket: function (userID,presentationID,seatID){
        return bookTicket(userID,presentationID,seatID)
    },
    removeTicket: function(ticketID,userID){
        return removeTicket(ticketID,userID);
    },
    getUserID: function(username,type){
        return getUserID(username,type)
    },
    addReview: function(review,Sterne, movieID){
        return addReview(review,Sterne,movieID)
    }



}

const users = [];
let manager = "Manager";
let customer = "Customer";
let d3 = "3D";
let d4 = "4D";
let dolby = "Dolby Atmos";
let lux = "Deluxe"
let norm = "Normal";
let rem = "Removable";
let maxseats = 50;

//todo: improve if neccessary with closure
let ticketID = 0;
let hallID = 0;
let seatID = 0;
let userID = 0;
let movieID = 0;
let presentationID = 0;





function writeFile(data, filename) {
    //WT_Bostjancic_Lin_Thausing/Server/
    fs.writeFileSync('./JSONfiles/' + filename + '.json', data, (err) => { // deleted path
        if (err) {
            return err;
        }
        else {
            console.log("successfully written")
            return data;
        }
    });

}
function initDefaultUsers() {
    users.push(new module.exports.User("Bodo", "BodoPasswort", manager));
    users.push(new module.exports.User("Panda", "PandaPW", manager));
    users.push(new module.exports.User('melly', "mellyPW", customer));
    users.push(new module.exports.User("Martin", "martinpw", customer));
    let userlist = JSON.stringify(new module.exports.UserList(users));
    writeFile(userlist, "Users")

}
function initDefaultData() {

    let ima = new module.exports.Cinema(3, 7, 'normal');
    let hall = new module.exports.Hall(10, "luxury", "atmos");
   // hall.addSeat(new module.exports.Seat(1, 0, "replacable"))
    hall.seats.push(new module.exports.Seat(1,0,"replacable"))
    ima.addHall(hall)

    const allschedules = new Array(0);
    const movies=new Array(0);
    ima.halls.forEach(element => {
        let mov=new module.exports.Movie("die hard", "dying hard", 120, 18)
        
        let pres = new module.exports.Presentation(mov, new Date("July 4 1776 12:30"))
        element.presentations.push(pres);
        mov.presentations.push(new Date("July 4 1776 12:30"))
        //todo: add pres to mov for def data
        movies.push(mov)
        allschedules.push(pres);
    });
    let data = JSON.stringify(ima);
    writeFile(data, "Cinema")
    writeFile(JSON.stringify(movies), "Movies")

}
function readFileByName(name) {
    console.log("reading " + name)
    return fs.readFileSync('./JSONfiles/' + name + '.json', 'utf8', (err, data) => { //deleted path
        if (err) return err;
        console.log("successfully read")
    });

}
function getUserID(username,type){
    let users=JSON.parse(readFileByName("Users"))
    let user;
    console.log(users)
    users.userlist.forEach(useri => {
        if(useri.username===username&&useri.type===type){
            user=useri;}
    });
    console.log(user)
    if(user==undefined)throw new Error("no user found with given Username")

    return user.ID;
}
//returns: undefined: no user found
//returns true: user found, password correct
//returns false: user found, password incorrect
function containsUserimpl(username, password, type) {
    let checker = false;
    let datauser;
    let data = readFileByName("Users")
    let list = JSON.parse(data);
    list.userlist.forEach(element => {
        if (element.username === username && element.type === type) {
            checker = true;
            datauser = element;
        }
    });
    if (checker) {
        console.log("user found")
        if (datauser.password === password) {
            return true;
        } else { return false; }
    }
}
//todo

//manager
function addHall(hall){
console.log("adding hall")
hall.ID=hallID++;
hall.seats.forEach((seat)=>{
    seat.ID=seatID++;
})

console.log(hall)
setHall(hall)
console.log("hall set")
return hall;

}
function updateHall(hall){
    setHall(hall);
    return "successfull"
}
function addSeat(seat, hallid) {
    console.log("adding seat to hall " + hallid)
    let hall = getHall(hallid);
    console.log(hall.ID)
    if (hall == undefined) {
        throw new Error("No such hall found");
    }
    hall.seats.forEach(element => {
        if (element.row == seat.row && element.number == seat.number) {
            throw new Error("There is already a seat in this spot");
        }
    });
    hall.seats.push(seat);
    setHall(hall);
    return seat.ID;
}
//manager
function removeSeat(hallID, seatID) {
    let hall = getHall(hallID);
    console.log(hall.seats)
    let index = -1;
    let counter = 0;
    hall.seats.forEach(element => {
        if (element.ID == seatID) {
            index = counter;
        }
        counter++;
    });
    if (index != -1) {
        hall.seats.splice(index, 1)
        setHall(hall);
        console.log("seat removed")
        return "seat removed"
    } else {
        throw new Error("seat not found");
    }

}
function getSeat(seatID) {
    let cinema = JSON.parse(readFileByName("Cinema"))
    let seat;
    cinema.halls.forEach(element => {
        element.seats.forEach(element => {
            if (element.ID == seatID) seat = element;
        });
    });
    if (seat == undefined) throw new Error("No seat with given ID found")

    return seat;
}
//manager
function setCinemaImpl(cinemastring) {
    writeFile(cinemastring, "Cinema")
    console.log("Cinema Updated")
    return "cinema updated"
}

//all
function addUser(user) {
    console.log("adding user" + user.username)
    let users = JSON.parse(readFileByName("Users"));
    if (users == undefined) throw new Error("some error reading users")
    let checker = false;
    users.userlist.forEach(element => {
        if (element.username === user.username && element.type === user.type) {
            checker = true;
        }
    });
    if (checker) throw new Error("username and type combination already used");
    users.userlist.push(user);
    writeFile(JSON.stringify(users), "Users");
    console.log("users updated")
    return user.ID
}
//all
function removeUser(userID) {


    let userlist = JSON.parse(readFileByName("Users"));

    let index = -1;
    let counter = 0;
    userlist.userlist.forEach(user => {
        if (user.ID == userID) {
            index = counter;
        }
        counter++;
    });
    if (index == -1) throw new Error("no user with given ID found")
    userlist.userlist.splice(index, 1);
    writeFile(JSON.stringify(userlist), "Users");
    console.log("user deleted")
    return "user deleted";
}
function getUser(userID) {
    let userlist = JSON.parse(readFileByName("Users"));

    let founduser;;
    userlist.userlist.forEach(user => {
        if (user.ID == userID) {
            founduser = user;
        }
    });
    if (founduser == undefined) throw new Error("no user with given ID found")
    return founduser;

}
//manager
function setHall(hall) {
    let cinema = JSON.parse(readFileByName("Cinema"));
    let index = -1;
    let counter = 0;
    cinema.halls.forEach(element => {
        if (element.ID == hall.ID) {
            index = counter;
        }
        counter++;
    });
    if (index != -1) {
        console.log("found a hall with given ID. Overwriting...")
        cinema.halls[index] = hall;
    } else {
        cinema.halls.push(hall);
    }
    writeFile(JSON.stringify(cinema), "Cinema");
    console.log("hall set.")
    return hall.ID;
}


function getHall(hallID) {
    let js = readFileByName("Cinema");
    let cinema = JSON.parse(js);
    let halls = cinema.halls;
    let ret;
    halls.forEach(hall => {
        if (hall.ID == hallID) {
            ret = hall;
        }
    });
    console.log("searching for " + hallID + " found" + ret)
    if (ret == undefined) {
        throw new Error("no hall with given ID found")
    }
    return ret;
}
//manager
function removeHall(hallID) {
    let cinema = JSON.parse(readFileByName("Cinema"));
    let index = -1;
    let counter = 0;
    cinema.halls.forEach(hall => {
        console.log("comparing " + hall.ID + " with " + hallID)
        if (hall.ID == hallID) {
            index = counter;
        }
        counter++;
    });
    if (index == -1) {
        throw new Error("no hall with given ID found")
    }
    console.log("splicig at " + index + ",removing")
    cinema.halls.splice(index, 1);

    setCinemaImpl(JSON.stringify(cinema));
    console.log("hall " + hallID + " removed successfully")
    return "hall removed"

}
function addMovie(movie) {
    let movies = JSON.parse(readFileByName("Movies"));
    let checker = false;
    movies.forEach(element => {
        let id;
        let name;
        try {
            id = element.ID;
            name = element.name;
        } catch (error) {

        }
        if (id == movie.ID) {
            throw new Error("Movie with such ID already exists")
        }
        if (name === movie.name) {
            throw new Error("Movie with such name already exists")
        }

    });
    //let pres = new module.exports.Presentation(movie, new Date(Date()))
    movies.push(movie);
    writeFile(JSON.stringify(movies), "Movies");
    console.log(movie.name + " added to library");
    return movie.ID;
}
function updateMovie(movie){
    let movies=JSON.parse(readFileByName("Movies"))
    let checker=undefined;
    let counter=0;
    console.log("updating movie")
    movies.forEach((element)=>{
        if(movie.ID===element.ID){
            checker=counter;
        }
        counter++;
    })
    if(checker==undefined){
        throw new Error("movie not found")
    }
    movies[checker]=movie;


    writeFile(JSON.stringify(movies),"Movies");
    console.log("movie successfully updated")
    return "movie successfully updated"
}
function getMovies() {
    return JSON.parse(readFileByName("Movies"));
}
function getMovieByID(movieID) {
    let movies = JSON.parse(readFileByName("Movies"));

    let movie;

    movies.forEach(element => {

        let temp;
        try {
            temp = element.ID;
        } catch (error) {

        }

        if (temp == movieID) {
            movie = element;
        }


    });
    if (movie == undefined) throw new Error("no such movie found")
    console.log("Movie found: " + movie.name)
    return movie;
}
function removeMovie(movieID) {
    let presentations = JSON.parse(readFileByName("Movies"));
    let movie;
    let index = -1;
    let counter = 0;

    presentations.forEach(pres => {
        let temp;
        try {
            temp = pres.ID;
        } catch (error) {

        }

        if (temp == movieID) {
            movie = pres;
            index = counter;
        }
        counter++;
    });
    if (movie == undefined) throw new Error("no such movie found")
    if (index == -1) throw new Error("no such movie found again?=")
    console.log("Movie removed: " + movie.name)
    presentations.splice(index, 1);
    writeFile(JSON.stringify(presentations), "Movies");
    console.log("movies updated")
    return true;

}
function addPresentation(movieID, date, hallID) {
    let hall = getHall(hallID);
    let movie = getMovieByID(movieID);
    
    
    //todo: add date to movie
    hall.presentations.forEach(element => {
        //todo: fix date stuff
        if (new Date(element.start) === date) {
            throw new Error("Theres already a booked movie at that time")
        }
    });

    let pres = new module.exports.Presentation(movie, date);
    hall.presentations.push(pres)
    setHall(hall);
    console.log("Presentation added to hall " + hallID + " with movie " + movie.name + " at time " + date)
    movie.presentations.push({
        date:date,
        id:pres.ID
    });
    updateMovie(movie)
    return pres.ID;
}
function removePresentation(presentationID) {
    let cinema = JSON.parse(readFileByName("Cinema"));
    let hallindex = -1;
    let presIndex = -1;
    let hallcounter = 0;
    let prescounter = 0;
    let removedate=undefined;
    cinema.halls.forEach(hall => {
        hall.presentations.forEach(pres => {
            if (pres.ID == presentationID) {
                hallindex = hallcounter;
                presIndex = prescounter;
                removedate=pres.date;
            }
            prescounter++;
        });
        hallcounter++;
    });

    if (hallindex == -1 || presIndex == -1) throw new Error("no presentation with given ID found");
    let movie=cinema.halls[hallindex].presentations[presIndex].movie;
    let dateindex=-1;
    let datecounter=0;
    movie.presentations.forEach(element=>{
        if(element.date===removedate){
            dateindex=datecounter;
        }
        datecounter++;
    })
    if(dateindex===-1){
        console.log("------------------------------wat")
    }else{
        movie.presentations.splice(dateindex,1);
        updateMovie(movie)
    }

    cinema.halls[hallindex].presentations.splice(presIndex, 1);
    setCinemaImpl(JSON.stringify(cinema));
    console.log("presentation successfully removed");
    return true


}
function getPresentation(presentationID) {
    let cinema = JSON.parse(readFileByName("Cinema"))
    let halls = cinema.halls;
    let presentation;
    halls.forEach(hall => {
        hall.presentations.forEach(element => {
            if (element.ID == presentationID) {
                presentation = element;
            }
        });
    });
    if (presentation == undefined) throw new Error("no presetation with given ID found");
    console.log("presentation found: " + presentation.movie.name + " on " + presentation.start);
    return presentation;
}
function getHallByPresentationID(presentationID) {
    let halls = JSON.parse(readFileByName("Cinema")).halls;
 
    let foundhall;
    halls.forEach(hall => {
        hall.presentations.forEach(pres => {
            if (pres.ID == presentationID) {
                console.log("hall found!")
                
                 foundhall= hall;
            }
        });
    });
    if (foundhall == undefined) throw new Error("no hall with given rpesentationID found")
    return foundhall;
}
//throws error
//customer
function bookTicket(userID, presentationID, seatID) {
    console.log("Booking ticket")
    let presentation = getPresentation(presentationID);
    let seat = getSeat(seatID);

    presentation.tickets.forEach(ticket => {
        if (ticket.seat.ID == seat.ID) {
            
            throw new Error("seat already taken")
        }
    });
    console.log("free seat requested")
    let user = getUser(userID);
    let hall = getHallByPresentationID(presentationID);
    let ticket = new module.exports.Ticket(user, seat);
    ticket.movie = presentation.movie;
    ticket.date = presentation.date;
    ticket.hallID = hall.ID;
    ticket.code = getQRCode()
    presentation.tickets.push(ticket);
    hall.presentations.forEach(element => {
        if(element.ID==presentationID){
            element.tickets.push(ticket);
        }
    });
    console.log(hall.presentations)
    setHall(hall);
    
    console.log("Ticket booked: ");
    return ticket;
}
function getQRCode() {
    return "this is a sample qr code. 010101010"
}
function getTicketByID(ticketID){
    let cinema=JSON.parse(readFileByName("Cinema"));
    let fhall;
    let fpresentation;
    let fticket;
    cinema.halls.forEach(hall => {
        hall.presentation.forEach(pres => {
            pres.tickets.forEach(ticket => {
                if(ticket.ID==ticketID){
                    fhall=hall;
                    fpresentation=pres;
                    fticket=ticket;
                }
            });
        });
    });
    if(ticket==undefined)throw new Error("no suck ticket found")
    return ticket;

}
//customer
function removeTicket(ticketID, userID) {
    let cinema=JSON.parse(readFileByName("Cinema"));
   
    let fhall;
    let fpresentation;
    let fticket;
    
    cinema.halls.forEach(hall => {
        hall.presentations.forEach(pres => {
            let index=-1;
            let counter=0;
            pres.tickets.forEach(ticket => {
                if(ticket.ID==ticketID){
                    if(ticket.user.ID!=userID) throw new Error("you cant remove tickets you dont own")
                    index=counter;
                    fhall=hall;
                    fpresentation=pres;
                    fticket=ticket;
                }
                counter++;
            });
           if(index!=-1) pres.tickets.splice(index,1)
        });
    });
    if(fticket==undefined)throw new Error("no such ticket found")
    setHall(fhall);
    console.log("ticket removed")
    return "ticket removed"
}

//customer
function addReview(review,Sterne, movieID) {
    if(Sterne<0||Sterne>5){
        throw new Error("Sterne sind nur zw 0 und 5 erlaubt")
    }
let movie=getMovieByID(movieID)
movie.reviews.push({
    review:review,
    stars:Sterne
});
console.log("updating movie")
updateMovie(movie);
console.log("review added")
return "review added"
}
function give(arg) {
    return { "argument": +arg }
}