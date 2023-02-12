//the server has to be run from the main directory WT_Bostjancic_Lin_Thausing

let express = require('express');
const app = express();
app.use(express.json())
const JsonHandler=require('./JsonHandler');
let fs = require('fs');
let cors = require('cors');
const { addSeat, removeSeat, adduser, removeUser, getHall, removeHall, getMovies, removeMovie, getMovieByID, addMovie } = require('./JsonHandler');
app.use(cors()); // allow all origins -> Access-Control-Allow-Origin: *
app.use(express.static('public')); // host public folder
JsonHandler.initDefault();
const jwt=require("jsonwebtoken")
const dotenv= require("dotenv")
dotenv.config();
process.env.TOKEN_SECRET;
const expiryTime='1800s'
//not sure about that
TOKEN_SECRET=require('crypto').randomBytes(64).toString('hex');

function generateAccessToken(username, role){
    return jwt.sign({username:username, role:role},TOKEN_SECRET,{expiresIn : '1h'});
}


app.use('/Customer',(req,res,next)=>{
    
    jwt.verify(req.headers.token,TOKEN_SECRET,(err, re)=>{
      if(err!=null){
        console.log(err.message)
        res.status(401).json("Invalid token")
      }else{
        let tk=jwt.decode(req.headers.token,TOKEN_SECRET);
        console.log(tk)
        console.log(req.path+" from "+tk.username+" as "+tk.role)
        if(tk.role!=="Customer"){
            console.log("wrong type login")
            res.status(401).json("Invalid type")
            return;
        }
        next() }
        
    })
   
    });

app.use('/Manager',(req,res,next)=>{
   
    jwt.verify(req.headers.token,TOKEN_SECRET,(err, re)=>{
      if(err!=null){
        console.log(err.message)
        res.status(401).json("Invalid token")
      }else{ 
        let tk=jwt.decode(req.headers.token,TOKEN_SECRET);
        console.log(tk)
        console.log(req.path+" from "+tk.username+" as "+tk.role)
        if(tk.role!=="Manager"){
            console.log("wrong type login")
            res.status(401).json("Invalid type")
            return;
        }
        next() }
        
    })
   
    });

app.get('/getCinema',function(req,res){
    console.log("cinema requested")
    res.json(JsonHandler.getCinema());
})

//input: username, passwort und type als string
//output: JSON User/error 404 sorry cant find that
app.get('/login/:username/:password/:type',function(req,res){
    console.log("Logging in")

    const token=generateAccessToken(req.params.username,req.params.type);
    token.role=req.params.type;
    console.log("login request from "+req.params.username+" with pw "+req.params.password)
    try {
        let result=JsonHandler.login(req.params.username,req.params.password,req.params.type);
    } catch (error) {
        console.log(error.message)
        res.status(404);
        res.json(error.message);
        return;
    }
    res.json(token);
})
//todo: ensure correct hallID
app.post('/Manager/setHall/',function(req,res){
    console.log("postrequest sethall")
    req.body.
    console.log(hall)
})


app.get('/Manager/addSeat/:hallID/:type/:row/:number',function(req,res){
   try {
    let response=addSeat(req.params.hallID,req.params.type,req.params.row,req.params.number)
    console.log("response: "+response)
    res.json(response);
} catch (error) {
    console.log(error.message)
    res.status(404).json(error.message)
   }

})
app.get('/Manager/removeSeat/:seatID/:hallID',function(req,res){
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
app.get('/Customer/removeUser/:type/:userID',function(req,res){

    try {
         let response=removeUser(req.params.userID);
         res.json(response);
     } catch (error) {
         res.status(404).json(error.message);
     }
 })

 app.get('/getHall/:hallID',function(req,res){
    try {
         let response=getHall(req.params.hallID);
         res.json(response);
     } catch (error) {
         res.status(404).json(error.message);
     }
 })
 app.get('/Manager/removeHall/:hallID',function(req,res){
 
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
    
    try {
        let response=getMovieByID(req.params.movieID);
        res.json(response);
    } catch (error) {
        res.status(404).json(error.message);
    }
})
app.get('/Manager/removeMovie/:movieID',function(req,res){
    
    try {
        let response=removeMovie(req.params.movieID);
        res.json(response);
    } catch (error) {
        res.status(404).json(error.message);
    }
})
app.get('/Manager/addMovie/:name/:duration/:minimumAge/:description',function(req,res){
  
    try {
        let response=addMovie(req.params.name,req.params.duration,req.params.minimumAge,req.params.description);
        res.json(response);
    } catch (error) {
        res.status(404).json(error.message);
    }
})
app.get('/Manager/addPresentation/:movieID/:date/:hallID',function(req,res){
   
    try {
        let response=JsonHandler.addPresentation(req.params.movieID,req.params.date,req.params.hallID)
        res.json(response);
    } catch (error) {
        res.status(404).json(error.message);
    }
})
app.get('/Manager/removePresentation/:presentationID',function(req,res){
   
    try {
        let response=JsonHandler.removePresentation(req.params.presentationID)
        res.json(response);
    } catch (error) {
        res.status(404).json(error.message);
    }
})
app.get('/Customer/BookTicket/:presentationID/:seatID',function(req,res){
  
    try { 
        let userID=JsonHandler.getUserID(req.params.username,"Customer")
        console.log("User found: "+ userID)
        let response=JsonHandler.boockTicket(userID,req.params.presentationID,req.params.seatID)
        res.json(response);
    } catch (error) {
        res.status(404).json(error.message);
    }
})
app.get('/Customer/removeTicket/:TicketID',function(req,res){
    
    try { 
        let userID=JsonHandler.getUserID(req.params.username,"Customer")
        let response=JsonHandler.removeTicket(req.params.TicketID,userID);
        console.log("here. "+response)
        res.json(response);
    } catch (error) {
        console.log(error.message)
        res.status(404).json(error.message);
    }
})

 
 


app.get('')



let port = 3000;
app.listen(port);
console.log("Server running at: http://localhost:"+port);