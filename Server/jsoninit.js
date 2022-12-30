let fs = require('fs');
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

let ima=new Cinema(3,7,'normal');
let hall=new Hall(10,"luxury","atmos");
hall.addSeat(new Seat(1,2,"replacable"))
ima.addHall(hall)   
let jsontest=JSON.stringify(ima);
let cinema=JSON.parse(jsontest);
console.log(cinema.halls[0].features)


fs.writeFile('WT_Bostjancic_Lin_Thausing/Server/Cinema.json', jsontest, (err) => {
    if (err)
      console.log(err);
    else {
      console.log("File written successfully\n");
     }
  });
