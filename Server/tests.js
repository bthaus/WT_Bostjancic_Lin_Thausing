const JsonHandler=require('./JsonHandler');

JsonHandler.initDefault();

let date=new Date("July 4 1776 12:30");
console.log(date)
date=JSON.stringify(date)
console.log(date)
date=new Date(JSON.parse(date))
console.log(date)
let checker=JsonHandler.containsUser("Bodo","BodoPasswort","Manager")
console.log(JsonHandler.getCinema())
console.log(checker)
JsonHandler.adduser("asd","asd","Manager")

console.log(JsonHandler.login("Bodo","BodoPasswort","Manager"))
try {
    console.log(JsonHandler.login("Bodo","wrong passwort","Manager"))
} catch (error) {
    console.log(error.message)
}


try {
    console.log(JsonHandler.login("asd","wrong passwort","Manager"))
} catch (error) {
    console.log(error.message)
}


try {
   let hall= JsonHandler.getHall(1);
   console.log("hall found!"+hall);
   
   JsonHandler.getHall(-1);
} catch (error) {
    console.log(error.message)
}

try {
    console.log("adding seat")
    
    JsonHandler.addSeat(1,"Normal",3,5);
   
    console.log("error message incoming")
    JsonHandler.addSeat(1,"Normal",3,5)
} catch (error) {
    console.log(error.message)
}

try {
  
    JsonHandler.removeSeat(0,5);
    JsonHandler.removeSeat(0,5);
} catch (error) {
    console.log(error.message)
}
try {
    JsonHandler.adduser("Bodo","BodoPassword","Manager")
} catch (error) {
    console.log(error.message)
}
try {
    JsonHandler.adduser("John","johnpw","Customer")
    JsonHandler.adduser("John","johnpw","Customer")
} catch (error) {
    console.log(error.message)
}
try {
    JsonHandler.removeHall(0);
    JsonHandler.removeHall(0);
} catch (error) {
    console.log(error.message)
}
try {
    JsonHandler.removeUser(0);
    JsonHandler.removeUser(0);
} catch (error) {
    console.log(error.message)
}
try {
   console.log(JsonHandler.getMovies())
    console.log(JsonHandler.getMovieByID(0))
    console.log(JsonHandler.getMovieByID(5))
} catch (error) {
    console.log(error.message)
}
try {
    console.log(JsonHandler.removeMovie(1));
    console.log(JsonHandler.removeMovie(1))
} catch (error) {
    console.log(error.message)
}
try {
    console.log(JsonHandler.addMovie("kreis",120,12,"ist rund"))
    console.log(JsonHandler.addMovie("kreis",120,12,"ist rund"))

} catch (error) {
    console.log(error.message)
}
try {
    console.log(JsonHandler.removeMovie(3));
    console.log(JsonHandler.removeMovie(3))
  
} catch (error) {
    console.log(error.message)
}
try {
    console.log(JsonHandler.addPresentation(0,new Date("July 4 2022 16:30"),1))
    console.log(JsonHandler.addPresentation(0,new Date("July 4 2022 16:30"),1))
    console.log(JsonHandler.removePresentation(4))
    console.log(JsonHandler.removePresentation(5))
    console.log(JsonHandler.removePresentation(4))
} catch (error) {
    console.log(error.message)
}
console.log(JsonHandler.getPresentation(2))
try {
    JsonHandler.getPresentation(-123)
} catch (error) {
    console.log(error.message)
}

try {
    JsonHandler.boockTicket(1,1,10)
    JsonHandler.boockTicket(1,1,10)
    
} catch (error) {
    console.log(error.message)
    
}
try {
    JsonHandler.removeTicket(0)
    JsonHandler.removeTicket(0)
} catch (error) {
    console.log(error.message)
}


