const { response } = require("express");
let token=null;
module.exports = {
    hello: function() {
       console.log("worked");
    },
    helloWorld: function() {
        fetch('http://localhost:3000/helloWorld').then((response)=>{
          
  
        return response.json();
    }).then((response)=>{
           
            console.log( response);
            console.log(response.argument)
            console.log(response.type)

        })
    },
    functionJsonTeest: function(){
        
        fetch('http://localhost:3000/test').then((response)=>{
          
            
            return response.json();
        }).then((response)=>{
            console.log("yeßr")
                console.log( response);
             
    
            })
    },
    getCinema: function(){
    return get("getCinema")
       
    },
    //returns string
    login:function(username,password,type){
       return new Promise((resolve,reject)=>{
        get('login/'+username+'/'+password+'/'+type).then((data)=>{
            token=data;
            console.log("token saved " +token.username+token)
    
            resolve(data)
        }).catch((err)=>{
            reject(err);
        })
       }) 
    },
    setHall:function(hall,username,password){
        return new Promise((resolve,reject)=>{
            fetch('http://localhost:3000/setHall/'+username+'/'+password,{
                method: 'POST',
                body: JSON.stringify(hall)
            }).then((response)=>{
                
                return response.json();
               }).then((data)=>{
                resolve(data)
               }).catch((err)=>{
                console.log("some error happened")
                reject(err);
               })
        })
    },
    addSeat: function(hallID,type,row,number){
        return get('Manager/addSeat/'+hallID+"/"+type+"/"+row+"/"+number)
    },
    removeSeat: function(seatID,hallID){
        return get("Manager/removeSeat/"+seatID+"/"+hallID)
    },
    addUser: function(username,password,type){
        return get("addUser/"+username+"/"+password+"/"+type);
    },
    removeUser: function(type,userID){
        return get("Customer/removeUser/"+type+"/"+userID)
    },
    getHall: function(hallID){
        return get("getHall/"+hallID);
    },
    removeHall: function(hallid){
        return get("Manager/removeHall/"+hallid)
    },
    getMovies:function(){
        return get("getMovies");
    },
    getMovieByID: function(movieID){
        return get("getMovieByID/"+movieID);
    },
    removeMovie: function(movieID){
        return get("Manager/removeMovie/"+movieID)
    },
    addMovie: function(name,duration,minimumAge,description){
        return get("Manager/addMovie/"+name+"/"+duration+"/"+minimumAge+"/"+description)
    },
    addPresentation: function(movieID,date,hallID){
        return get("Manager/addPresentation/"+movieID+'/'+date+'/'+hallID)
    },
    removePresentation: function(presentationID){
        return get("Manager/removePresentation/"+presentationID);
    },
    bookTicket: function(presentationID,seatID){
        return get("Customer/BookTicket/"+presentationID+'/'+seatID)
    },
    removeTicket: function(TicketID){
        return get("Customer/removeTicket/"+TicketID)
    
    }



   

 }
 function get(args){
    console.log("fetch request with arguments: "+args)
    return new Promise((resolve,reject)=>{
        fetch('http://localhost:3000/'+args,{
            headers:{
                token:token
            }}).then((response)=>{
         return response.json();
           }).then((data)=>{
            console.log("json received")
           resolve(data);
           }).catch((err)=>{
            console.log("some error happened with "+args)
            reject(err);
           })
    })
}

