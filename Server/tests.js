const JsonHandler=require('./JsonHandler');

JsonHandler.initDefault();


let checker=JsonHandler.containsUser("Bodo","BodoPasswort","Manager")
console.log(checker)
JsonHandler.adduser("asd","asd","Manager")