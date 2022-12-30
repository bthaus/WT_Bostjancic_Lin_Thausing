
const Client=require('./Client');
//sample implementation for getting a cinema
Client.getCinema().then((data)=>{
   let obj=JSON.parse(data)
    console.log(obj)
    console.log(obj.halls[0].seats[0].type)
}).catch((err)=>{
 console.log(err)
})

