const { response } = require("express");
let token="gasp no token here";
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
        fetch("http://localhost:3000/login",{
            method: 'POST', 
            headers: {'Content-Type': 'application/json'},
            body:JSON.stringify({
                username: username,
                password: password,
                type: type
            })
        }).then((data)=>{return data.json()}).then((data)=>{
            token=data;
            console.log("token saved " +token.username+token)
    
            resolve(data)
        }).catch((err)=>{
            reject(err);
        })
       }) 
    },
    //BIG NONO: dont add presentations in the hall set here. this would destroy the coherence of the ids of all presentations and movies. 
    // seats are semi okay, as they are mapped severside (technically could do the same with pres and movies, would be significantly less efficieant tho)
    //hence not only the hall id is returned, but the entire hall object. this way you also have all fresh ids of all seats
    setHall:function(hall){
       return get("Manager/setHall/"+JSON.stringify(hall))
    },
    updateHall:function(hall){
        return get("Manager/updateHall"+JSON.stringify(hall))
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
    updateMovie: function(movie){
        return get("Manager/updateMovie/"+JSON.stringify(movie))
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
    },
    addReview: function(review,stars,movieID){
        return get("Customer/addReview/"+review+"/"+stars+"/"+movieID);
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

