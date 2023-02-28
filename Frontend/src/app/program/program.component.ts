import { Component } from '@angular/core';

@Component({
  selector: 'app-program',
  templateUrl: './program.component.html',
  styleUrls: ['./program.component.css']
})
export class ProgramComponent {
  movies: Movie[] = [{
    movie: {
        ID: 0,
        reviews: [
            "Die Hard is a classic action film that combines high-stakes tension, expertly choreographed action scenes, and a healthy dose of humor, making it a must-see for any fan of the genre."
        ],
        name: "die hard",
        description: "dying hard",
        duration: 120,
        minimumAge: 18
    },
    start: "1776-07-04T11:24:39.000Z",
    ID: 0,
    tickets: []
},
{
  movie: {
      ID: 0,
      reviews: [
          "Die Hard is a classic action film that combines high-stakes tension, expertly choreographed action scenes, and a healthy dose of humor, making it a must-see for any fan of the genre."
      ],
      name: "die hard",
      description: "dying hard",
      duration: 120,
      minimumAge: 18
  },
  start: "1776-07-04T11:24:39.000Z",
  ID: 0,
  tickets: []
}, 
{
  movie: {
      ID: 0,
      reviews: [
          "Die Hard is a classic action film that combines high-stakes tension, expertly choreographed action scenes, and a healthy dose of humor, making it a must-see for any fan of the genre."
      ],
      name: "die hard",
      description: "dying hard",
      duration: 120,
      minimumAge: 18
  },
  start: "1776-07-04T11:24:39.000Z",
  ID: 0,
  tickets: []
}, 
{
  movie: {
      ID: 0,
      reviews: [
          "Die Hard is a classic action film that combines high-stakes tension, expertly choreographed action scenes, and a healthy dose of humor, making it a must-see for any fan of the genre."
      ],
      name: "die hard",
      description: "dying hard",
      duration: 120,
      minimumAge: 18
  },
  start: "1776-07-04T11:24:39.000Z",
  ID: 0,
  tickets: []
}, 
{
  movie: {
      ID: 0,
      reviews: [
          "Die Hard is a classic action film that combines high-stakes tension, expertly choreographed action scenes, and a healthy dose of humor, making it a must-see for any fan of the genre."
      ],
      name: "die hard",
      description: "dying hard",
      duration: 120,
      minimumAge: 18
  },
  start: "1776-07-04T11:24:39.000Z",
  ID: 0,
  tickets: []
}, 
{
  movie: {
      ID: 0,
      reviews: [
          "Die Hard is a classic action film that combines high-stakes tension, expertly choreographed action scenes, and a healthy dose of humor, making it a must-see for any fan of the genre."
      ],
      name: "die hard",
      description: "dying hard",
      duration: 120,
      minimumAge: 18
  },
  start: "1776-07-04T11:24:39.000Z",
  ID: 0,
  tickets: []
}, {
  movie: {
      ID: 0,
      reviews: [
          "Die Hard is a classic action film that combines high-stakes tension, expertly choreographed action scenes, and a healthy dose of humor, making it a must-see for any fan of the genre."
      ],
      name: "die hard",
      description: "dying hard",
      duration: 120,
      minimumAge: 18
  },
  start: "1776-07-04T11:24:39.000Z",
  ID: 0,
  tickets: []
}]
}

interface Movie {
  movie: {
      ID: number,
      reviews: string[],
      name: string,
      description: string,
      duration: number,
      minimumAge: number
  },
  start: string,
  ID: number,
  tickets: string[]
}
