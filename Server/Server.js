let express = require('express');
const app = express();
const JsonHandler=require('./JsonHandler');
let fs = require('fs');
let cors = require('cors');
app.use(cors()); // allow all origins -> Access-Control-Allow-Origin: *
app.use(express.static('public')); // host public folder
JsonHandler.initDefault();



app.get('/helloWorld',function(req,res){
    res.type('json');
    
   res.json({argument:'hello world',
type:'testmessage'

});
app.get('/test',function(req,res){
   res.json();
})
})


function Image(width,height,bitdepth,rawsize,pixels){
    this.width=width;
    this.height=height;
    this.bitdepth=bitdepth;
    this.rawsize=rawsize;
    this.pixels=pixels;
    this.print=()=>{
        let checker=0;
        for(let key in this){
            checker++;
            if(checker<6)   console.log(key+' '+this[key]);
       
          }
    }
    }



let port = 3000;
app.listen(port);
console.log("Server running at: http://localhost:"+port);