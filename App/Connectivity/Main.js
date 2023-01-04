
const Def = require('../../Server/JsonHandler');
const Client=require('./Client');

//sample implementations

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
Client.addUser("Leona","kekse","Manager").then((res)=>{
console.log(res)
        let userID=res;
    Client.login("Leona","kekse","Manager").then((res)=>{
        console.log(res)
        Client.getCinema().then((res)=>{
           
            Client.addSeat("Leona","kekse",0,"Normal",3,5).then((res)=>{
                console.log(res)
                Client.removeSeat("Leona","kekse",res,0).then((res)=>{
                    console.log(res)
                    Client.removeHall("Leona","kekse","0").then((res)=>{
                        console.log(res)
                        Client.removeUser("Leona","kekse","Manager",userID).then((res)=>{
                            console.log(res)
                        })
                    })
                })
                
            })
        })
    })
}).catch((err)=>{
    console.log(err.message)
})








