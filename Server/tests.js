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