import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Seat, Ticket } from 'src/assets/json-objects/IUsers';

@Component({
  selector: 'app-ticket-qr-code-dialog',
  templateUrl: './ticket-qr-code-dialog.component.html',
  styleUrls: ['./ticket-qr-code-dialog.component.scss']
})
export class TicketQrCodeDialogComponent {
  ticket: Ticket | undefined;
  ticketString: string | undefined;

  constructor(@Inject(MAT_DIALOG_DATA) data: Ticket) {
    this.ticket = data;
    this.ticketString = this.ticketToString(data);
  }

  ticketToString(ticket: Ticket): string {
    let stringTicket: string = ticket.movieID + ticket.movieName + ticket.hall + ticket.presentation;
    ticket.seats.forEach((seat: Seat) => stringTicket += seat.row + "-" + seat.column + " ");
    return stringTicket;
  }

}
