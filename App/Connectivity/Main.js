
const JsonHandler = require('../../Server/JsonHandler');
const Client=require('./Client');

//sample implementation for getting a cinema
Client.getCinema().then((data)=>{
   let obj=JSON.parse(data)
    console.log(obj)
    console.log(obj.halls[0].seats[0].type)
}).catch((err)=>{
 console.log(err)
}) 
console.log("logging in")

Client.login("Bodo","BodoPasswort","Manager").then((response)=>{
    console.log("logged in, printing repsonse:")
    console.log(response);
})
Client.login("Bodo","asd","Manager").then((response)=>{
    console.log("logged in, printing repsonse:")
    console.log(response);
})


let test=new JsonHandler.Hall(123);
console.log("here"+test)

