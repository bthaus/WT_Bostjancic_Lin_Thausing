let express = require('express');
const app = express();
const JsonHandler=require('./JsonHandler');
let fs = require('fs');
let cors = require('cors');
app.use(cors()); // allow all origins -> Access-Control-Allow-Origin: *
app.use(express.static('public')); // host public folder
JsonHandler.initDefault();


app.get('/getCinemaHall/:ID',function(req,res){
let ID=req.params.ID;

})
app.get('/getCinema',function(req,res){
    console.log("cinema requested")
res.json(JsonHandler.getCinema());
})



let port = 3000;
app.listen(port);
console.log("Server running at: http://localhost:"+port);