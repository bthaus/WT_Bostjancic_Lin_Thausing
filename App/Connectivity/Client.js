const { response } = require("express");

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
       return get('login/'+username+'/'+password+'/'+type)
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
    addSeat: function(username,password,hallID,type,row,number){
        return get('addSeat/'+username+'/'+password+"/"+hallID+"/"+type+"/"+row+"/"+number)
    },
    removeSeat: function(username,password,seatID,hallID){
        return get("removeSeat/"+username+"/"+password+"/"+seatID+"/"+hallID)
    },
    addUser: function(username,password,type){
        return get("addUser/"+username+"/"+password+"/"+type);
    },
    removeUser: function(username,password,type,userID){
        return get("removeUser/"+username+"/"+password+"/"+type+"/"+userID)
    },
    getHall: function(hallID){
        return get("getHall/"+hallID);
    },
    removeHall: function(username,password,hallid){
        return get("removeHall/"+username+"/"+password+"/"+hallid)
    },
    getMovies:function(){
        return get("getMovies");
    },
    getMovieByID: function(movieID){
        return get("getMovieByID/"+movieID);
    },
    removeMovie: function(movieID,username,password){
        return get("removeMovie/"+username+"/"+password+"/"+movieID)
    },
    addMovie: function(username,password,name,duration,minimumAge,description){
        return get("addMovie/"+username+"/"+password+"/"+name+"/"+duration+"/"+minimumAge+"/"+description)
    }


   

 }
 function get(args){
    console.log("fetch request with arguments: "+args)
    return new Promise((resolve,reject)=>{
        fetch('http://localhost:3000/'+args).then((response)=>{
            return response.json();
           }).then((data)=>{
            console.log("json received")
           resolve(data);
           }).catch((err)=>{
            console.log("some error happened")
            reject(err);
           })
    })
}

