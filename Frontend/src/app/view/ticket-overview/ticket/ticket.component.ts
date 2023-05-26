import { Component, Input } from '@angular/core';
import { tick } from '@angular/core/testing';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DataApiService } from 'src/app/api/data-api.service';
import { Seat, Seats, Ticket } from 'src/assets/json-objects/IUsers';
import { TicketQrCodeDialogComponent } from './ticket-qr-code-dialog/ticket-qr-code-dialog.component';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.scss']
})
export class TicketComponent {
  @Input()
  ticket: Ticket | undefined;

  constructor(public dialog: MatDialog, private service: DataApiService) { }

  showQRCode(ticket: Ticket) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;

    dialogConfig.data = ticket;

    const dialogRef = this.dialog.open(TicketQrCodeDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      data => console.log("Dialog output:", data)
    );
  }
  getSeatsASstring(seats: Seats): string {
    let str: string = "";
    let i: number = 0;
    seats.forEach(seat => {
      if (i === 0) {
        str += seat.row + "-" + seat.column;
        i++;
      } else
        str += ", " + seat.row + "-" + seat.column
    });
    return str;
  }

  checkIfCancable(deadline: string): boolean {
    let due: Date = new Date(deadline);
    let current: Date = new Date();
    console.log(due + " " + current);
    console.log((due > current));

    return (due > current);
  }

  cancelTicket(ticket: Ticket) {
    this.service.postCancelTicket(ticket);
  }
}
