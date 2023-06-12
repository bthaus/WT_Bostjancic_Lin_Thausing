import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from '../services/api.service';
import { DialogSellTicketsComponent } from '../dialog-sell-tickets/dialog-sell-tickets.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-management-sell-tickets',
  templateUrl: './management-sell-tickets.component.html',
  styleUrls: ['./management-sell-tickets.component.css']
})
export class ManagementSellTicketsComponent {
  [x: string]: any;
  displayedColumns: string[] = ['ticketID', 'movieName', 'date', 'hallID', 'seatRow', 'seatNumber', 'seatType', 'edit'];
  dataSource!: MatTableDataSource<any>;

  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private dialog: MatDialog,
    private api: ApiService,
    private snackBar: MatSnackBar,
    ){
      /*
      this.dataSource.filterPredicate = (data: Element, filter: string) => {
        return 0;
        */
      }
   // }
   // dataSource = new MatTableDataSource<Element>(ELEMENT_DATA);
/*
    applyFilter(filterValue) {
      this.dataSource.filter = filterValue.trim().toLowerCase();
      }
      */
    
  ngOnInit(): void {
    this.getAllTickets();
    console.log(this.getAllTickets);
    //console.log(this.dataSource.data);
  }

  getAllTickets(){
    this.api.getAllCinemaHalls()
    .subscribe({
      next:(res)=>{
        var obj = JSON.parse(res);
        var tickets = new Array();

        if(obj.halls != undefined){
          for(let i = 0; i < obj.halls.length; i++){
            if(obj.halls[i].presentations != undefined){
              for(let j = 0; j < obj.halls[i].presentations.length; j++){
                if(obj.halls[i].presentations[j].tickets != undefined){
                  for(let g = 0; g < obj.halls[i].presentations[j].tickets.length; g++){
                    tickets.push({"ID":obj.halls[i].presentations[j].ID, "date": this.getDate(obj.halls[i].presentations[j].start),  "ticketID": obj.halls[i].presentations[j].tickets[g].ID,
                    "movieName": obj.halls[i].presentations[j].tickets[g].movie.name, "hallID": obj.halls[i].presentations[j].tickets[g].hallID, "seatRow": obj.halls[i].presentations[j].tickets[g].seat.row,
                    "seatNumber": obj.halls[i].presentations[j].tickets[g].seat.number, "seatType": obj.halls[i].presentations[j].tickets[g].seat.type});
                  }
                }
              }
            }
          }
        }

        this.dataSource = new MatTableDataSource(tickets);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error:(err)=>{
        this.snackBar.open("Error while fetching the tickets");
      }
    })
  }

  getDate(dateString:string){
    return new Date(dateString).toLocaleString();
  }

  openDialog(){
    this.dialog.open(DialogSellTicketsComponent, {
      width:'26%'
    }).afterClosed().subscribe(result => {
      this.getAllTickets();
    });
  }

  deleteTicket(ticketID:number, date:string){
    let currentDate = new Date();
    let compareDate = new Date(date);

    //subtracting one hour from the screening date (compareDate)
    compareDate = new Date(compareDate.getTime() - 60*60000);

    //if movie does not start in under an hour an error message will be shown
    if(currentDate <= compareDate){
      this.api.deleteTicketManager(ticketID)
      .subscribe({
        next:(res)=>{
          this.getAllTickets();
        },
        error:(err:any)=>{
          this.snackBar.open("Error while deleting ticket");        }
      })
    }else{
      this.snackBar.open("Tickets can only be returned/deleted if the screening is at least one hour in the future");
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
