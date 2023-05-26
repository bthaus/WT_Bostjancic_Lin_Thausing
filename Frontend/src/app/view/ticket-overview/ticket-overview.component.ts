import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataApiService } from 'src/app/api/data-api.service';
import { Globals } from 'src/assets/Globals';
import { Ticket, Tickets } from 'src/assets/json-objects/IUsers';

@Component({
  selector: 'app-ticket-overview',
  templateUrl: './ticket-overview.component.html',
  styleUrls: ['./ticket-overview.component.scss']
})
export class TicketOverviewComponent implements OnInit {
  tickets: Tickets | undefined;

  constructor(private router: Router, private service: DataApiService) { }

  ngOnInit(): void {
    if (!Globals.isAuth()) this.router.navigateByUrl('/login?route=ticket-overview');
    else {
      this.service.getPurchasedTicketsByUsername(Globals.Username).subscribe({
        next: (tickets: Tickets | undefined) => {
          this.tickets = tickets;
        },
        error: err => console.error(err)
      });
    }
  }
}
