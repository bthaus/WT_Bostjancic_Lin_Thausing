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
//input=brauchts nicht
//output: cinema klasse als json string
app.get('/getCinema',function(req,res){
    console.log("cinema requested")
    res.json(JsonHandler.getCinema());
})

//input: username, passwort und type als string
//output: JSON User/error 404 sorry cant find that
app.get('/login/:username/:password/:type',function(req,res){
    console.log("login request")
    try {
        let result=JsonHandler.login(req.params.username,req.params.password,req.params.type);
    } catch (error) {
        console.log(error.message)
        res.status(404);
        res.json(error.message);
        return;
    }
    res.send(JSON.stringify("login successfull"));
})

app.get('')



let port = 3000;
app.listen(port);
console.log("Server running at: http://localhost:"+port);