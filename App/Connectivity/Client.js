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
    }

 }