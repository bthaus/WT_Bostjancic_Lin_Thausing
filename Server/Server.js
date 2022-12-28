let express = require('express');
const app = express();
let fs = require('fs');
let cors = require('cors');
app.use(cors()); // allow all origins -> Access-Control-Allow-Origin: *
app.use(express.static('public')); // host public folder


app.get('/helloWorld',function(req,res){
    res.type('json');
    let jsonobject=JSON.parse('{"argument":"hello world"}');
    res.status(200).send(jsonobject);
})




let port = 3000;
app.listen(port);
console.log("Server running at: http://localhost:"+port);