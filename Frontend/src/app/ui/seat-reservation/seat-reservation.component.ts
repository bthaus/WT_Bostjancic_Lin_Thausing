import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { timer } from 'rxjs';
import { DataApiService } from 'src/app/api/data-api.service';
import { Globals } from 'src/assets/Globals';
import { Seat, Seats } from 'src/assets/json-objects/IHall';

@Component({
  selector: 'app-seat-reservation',
  templateUrl: './seat-reservation.component.html',
  styleUrls: ['./seat-reservation.component.scss']
})
export class SeatReservationComponent implements OnInit {
  Arr = Array; //Array type captured in a variable
  seats: number[][] | undefined;
  selectedSeats: string = "";
  ticketsBought: boolean = false;

  @Input() reservationData: { hallId: number, movieId: number, date: Date, seats: Seats } | undefined;

  constructor(private service: DataApiService, private router: Router) { }

  ngOnInit(): void {
  }

  getRows(): number[] {
    let rowNmbr: number = 1;
    let rows: number[] = new Array<number>;
    let column: number = 0;
    this.reservationData!.seats.forEach((seat: Seat) => {
      if (rowNmbr !== seat.row) {
        rowNmbr = seat.row;
        rows.push(column);
        column = 0;
      }
      column++;
    });
    rows.push(column);

    return Array.from(new Array(rows.length), (x, i) => i + 1);
  }

  getColumn(rowId: number): number[] {
    let rowNmbr: number = 1;
    let rows: number[] = new Array<number>;
    let column: number = 0;
    this.reservationData!.seats.forEach((seat: Seat) => {
      if (seat.row == rowId) column++;
    });

    return Array.from(new Array(column), (x, i) => i + 1);
  }

  testEvent(event: any) {
    let rowNcol: string = event.srcElement.id;
    if (event.target.checked) (this.selectedSeats.length != 0) ? this.selectedSeats += " " + rowNcol : this.selectedSeats += rowNcol
    else
      this.selectedSeats = this.selectedSeats.replace(rowNcol, "").replace("  ", " ");
    /*
    let tmp: { row: number, column: number } = { row: Number.parseInt(rowNcol[0]), column: Number.parseInt(rowNcol[1]) };
    let tmp2: Array<{ row: number, column: number }> = this.selectedSeats.filter(e => e.row != tmp.row && e.column != tmp.column);
    */
    //this.selectedSeats = this.selectedSeats.filter(e => (e.row + "").localeCompare(rowNcol[0]) === 0 && (e.column + "").localeCompare(rowNcol[1]) === 0);
    /*console.log(this.selectedSeats);

    this.selectedSeats.forEach(el => {
      console.log(el);
      console.log(el.row != Number.parseInt(rowNcol[0]) && el.column != Number.parseInt(rowNcol[1]));
    });*/
  }

  buyTickets() {
    let ticketInfo: { hallID: number, movieID: number, seats: string, user: string } = { hallID: this.reservationData!.hallId, movieID: this.reservationData!.movieId, seats: this.selectedSeats, user: Globals.Username };
    this.service.postTickets(ticketInfo);
    this.ticketsBought = true;
    timer(3000).subscribe(() => {
      this.router.navigateByUrl('/ticket-overview');
    });
  }

}
