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