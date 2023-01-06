//the server has to be run from the main directory WT_Bostjancic_Lin_Thausing

let express = require('express');
const app = express();
app.use(express.json())
const JsonHandler=require('./JsonHandler');
let fs = require('fs');
let cors = require('cors');
const { addSeat, removeSeat, adduser, removeUser, getHall, removeHall, getMovies } = require('./JsonHandler');
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
    console.log("login request from "+req.params.username+" with pw "+req.params.password)
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
//todo: ensure correct hallID
app.post('/setHall/:username/:password',function(req,res){
    console.log("postrequest sethall")
    req.body.
    console.log(hall)
})

app.get('/addHall/:username/:password',function(req,res){

})

app.get('/addSeat/:username/:password/:hallID/:type/:row/:number',function(req,res){
    checkLogin(req.params.username,req.params.password,"Manager",res)
    console.log("seat add request from "+req.params.username)
   try {
    let response=addSeat(req.params.hallID,req.params.type,req.params.row,req.params.number)
    console.log("response: "+response)
    res.json(response);
} catch (error) {
    console.log(error.message)
    res.status(404).json(error.message)
   }

})
app.get('/removeSeat/:username/:password/:seatID/:hallID',function(req,res){
    checkLogin(req.params.username,req.params.password,"Manager",res)
    console.log("seat remove request from "+req.params.username)
 
    try {
        let response=removeSeat(req.params.hallID,req.params.seatID);
        res.json(response);
    } catch (error) {
        res.status(404).json(error.message);
    }
})
app.get('/addUser/:username/:password/:type',function(req,res){
    console.log("user add request from "+req.params.username)
 
    try {
        let response=adduser(req.params.username,req.params.password,req.params.type);
        console.log("response: "+response)
        res.json(JSON.stringify(response));
    } catch (error) {
        console.log(error.message)
        res.status(404).json(error.message);
    }
})
app.get('/removeUser/:username/:password/:type/:userID',function(req,res){
    checkLogin(req.params.username,req.params.password,"Manager",res)
    console.log("user remove request from "+req.params.username)
 
    try {
         let response=removeUser(req.params.userID);
         res.json(response);
     } catch (error) {
         res.status(404).json(error.message);
     }
 })

 app.get('/getHall/:hallID',function(req,res){
    console.log("get hall request  ")
 
    try {
         let response=getHall(req.params.hallID);
         res.json(response);
     } catch (error) {
         res.status(404).json(error.message);
     }
 })
 app.get('/removeHall/:username/:password/:hallID',function(req,res){
    checkLogin(req.params.username,req.params.password,"Manager",res)
    console.log("remove hall request from "+req.params.username)
 
    try {
        let response=removeHall(req.params.hallID);
        res.json(response);
    } catch (error) {
        res.status(404).json(error.message);
    }
})
app.get('/getMovies',function(req,res){
    console.log("get Movies request  ")
 
    try {
        let response=getMovies();
        res.json(response);
    } catch (error) {
        res.status(404).json(error.message);
    }
})
app.get('/getMovieByID/:movieID',function(req,res){
    console.log("get MoviebyID request  ")
 
    try {
        let response=getMovies(req.params.movieID);
        res.json(response);
    } catch (error) {
        res.status(404).json(error.message);
    }
})
app.get('/removeMovie/:movieID',function(req,res){
    console.log("remove Movie request  ")
 
    try {
        let response=getMovies(req.params.movieID);
        res.json(response);
    } catch (error) {
        res.status(404).json(error.message);
    }
})

 
 

function checkLogin(username,password,type,res){
    try {
        return JsonHandler.login(username,password,type);
    } catch (error) {
        console.log(error.message)
        res.status(404).json(error.message);
    }
}


app.get('')



let port = 3000;
app.listen(port);
console.log("Server running at: http://localhost:"+port);