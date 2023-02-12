
const Def = require('../../Server/JsonHandler');
const Client=require('./Client');
Client.addSeat("Bodo","BodoPasswort",0,"normal",0,0).then((data)=>{
    console.log(data)
}).catch((data)=>{
    console.log(data)
})
Client.login("Bodo","BodoPasswort","Manager").then((data)=>{
    console.log(data);
    Client.addSeat("Bodo","BodoPasswort",0,"normal",0,0).then((data)=>{
        console.log(data)
    })
})
/*
Client.login("Bodo","BodoPasswort","Manager").then((Data)=>{
   console.log("sending second req")
    fetch('http://localhost:3000/testToken/',{
        headers:{
            token:Data
        }
    }).then((data)=>{
        console.log(data)
        return data.json()
    }).then((data)=>{
        console.log(data)
    });
})

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
console.log("checking false login")
Client.addSeat("Martin","martinpw",0,0,0,0).then((data)=>{
    console.log(data)
}).catch((err)=>{
    console.log(err)
})

Client.addMovie("Bodo","BodoPasswort","Der Herr der Ringe",180,12,"lotr").then((data)=>{
    console.log("starting movie and ticket tests")
    let movieID=data;
    console.log(movieID)
    Client.removeMovie(movieID,"Bodo","BodoPasswort").then((data)=>{
        console.log(data)
        Client.addMovie("Bodo","BodoPasswort","Der Herr der Ringe",180,12,"lotr").then((data)=>{
            let movieID=data;
            Client.addPresentation("Bodo","BodoPasswort",movieID,"today",1).then((data)=>{
                console.log(data)
                let presentationID=data;
                Client.addSeat("Bodo","BodoPasswort",1,"Normal",1,5).then((data)=>{
                    let seatID=data;
                    console.log(seatID)
                    Client.bookTicket("Martin","martinpw",presentationID,seatID).then((data)=>{
                        console.log(data)
                       console.log(data.code)
                       Client.removeTicket("Martin","martinpw",data.ID).then((data)=>{
                        console.log("here"+data)
                       })
                    })
                })
            
            })
        })
    })
}).catch((err)=>{
    console.log(err)
})










*/