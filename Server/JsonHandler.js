let fs = require('fs');

const users=[];
let manager="Manager";
let customer="Customer";

class UserList{
    constructor(userlist){
        this.userlist=userlist;
    }
}
class Hall{
    constructor(numSeats,seatType,features){
        const seats=new Array(numSeats);
        let rows=numSeats/10;
        let counter=0;
        this.features=features;
        for(let i=0;i<rows;i++){
            for(let j=0;j<10;j++){
                if(counter<=numSeats)  seats[counter++]=new Seat(i,j,seatType);
              
            }
        }
        this.seats=seats;

    }
    addSeat(seat){
        this.seats.push(seat)
    }
}
class Seat{
    constructor(row,number,type){
        this.row=row;
        this.number=number;
        this.type=type;
    }
}
class Cinema{

    constructor(numHalls,numSeats,seatType){
        const halls=new Array(numHalls)
        this.halls=halls;
        for(let i=0;i<numHalls;i++){

            halls[i]=new Hall(numSeats,seatType,'3d');
        }
       
    }
    addHall(hall){
        this.halls.push(hall);
    }
}
class User{
    constructor(username, password,type){
        this.username=username;
        this.password=password;
        this.type=type;
    }
}

 function writeFile(data,filename){
//WT_Bostjancic_Lin_Thausing/Server/
        fs.writeFileSync('./Server/'+filename+'.json', data, (err) => {
            if (err){
                return err;
            } 
            else  {
                console.log("successfully written")
                return data;  
            } 
          });
          
}
function initDefaultUsers(){
users.push(new User("Bodo","BodoPasswort",manager));
users.push(new User("Panda","PandaPW",manager));
users.push(new User("Martin","martinpw",customer));
let userlist=JSON.stringify(new UserList(users));
writeFile(userlist,"Users")
 

}
function addUser(user){

}
function initDefaultData(){

let ima=new Cinema(3,7,'normal');
let hall=new Hall(10,"luxury","atmos");
hall.addSeat(new Seat(1,0,"replacable"))
ima.addHall(hall)   
let data=JSON.stringify(ima);
writeFile(data,"Cinema")

}
function readFileByName(name){
    console.log("reading "+ name)
      return fs.readFileSync('./Server/'+name+'.json', 'utf8', (err, data) => {
            if (err) return err;
            console.log("successfully read")
          });
   
}

function containsUserimpl(user){
    let checker=false;
    let datauser;
    let data=readFileByName("Users")
    let list=JSON.parse(data);
    console.log(list.userlist)
    list.userlist.forEach(element => {
    if(element.username===user.username&&element.type===user.type){
        checker=true;
        datauser=element;
    }
});
if(checker){
   console.log("user found")
   if(datauser.password===user.password){
    return true;
   }else{return false;}
}
}
function addSeat(seat,hallid){

}
module.exports = {
    initDefault: function() {
     initDefaultData()
     initDefaultUsers()

     
    },
    addSeat: function(hallID,type,row,seatID){
       addSeat(new Seat(row,seatID,type),hallID);
    },
    getCinema:function(){
       return readFileByName("Cinema");
    },
    getUsers: function(){
        return readFileByName("Users");
    },
    containsUser: function(username,password,type){
        return containsUserimpl(new User(username,password,type));
    },
    adduser: function(username,password,type){
        let user=new User(username,password,type)
       
        if(containsUserimpl(user)==undefined){
            console.log("user added");
            addUser(user);
            return;
        }
        console.log("user already in the system")
        
         
    }

    
 }