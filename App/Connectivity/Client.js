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
        return new Promise((resolve,reject)=>{
            fetch('http://localhost:3000/getCinema').then((response)=>{
                return response.json();
               }).then((data)=>{
                console.log("json received")
               resolve(data);
               }).catch((err)=>{
                console.log("some error happened")
                reject(err);
               })
        })
       
    },
    //returns string
    login:function(username,password,type){
        return new Promise((resolve,reject)=>{
            fetch('http://localhost:3000/login/'+username+'/'+password+'/'+type).then((response)=>{
                
                return response.json();
               }).then((data)=>{
                resolve(data)
               }).catch((err)=>{
                console.log("some error happened")
                reject(err);
               })
        })
    },
    addHall:function(hall){
        return new Promise((resolve,reject)=>{
            fetch('http://localhost:3000/setHall/'+username+'/'+password+'/'+type,{
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
    }

 }


