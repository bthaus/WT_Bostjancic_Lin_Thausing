import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from "./home/home.component";
import { CommonModule } from '@angular/common';
import { TheatreManagingComponent } from './theatre-managing/theatre-managing.component';
import { PresentationManagerComponent } from './presentation-manager/presentation-manager.component';
import { ManagementSellTicketsComponent } from './management-sell-tickets/management-sell-tickets.component';
import { ManagerActivate } from './app.component';

import { LoginComponent } from './view/login/login.component';
import { ViewMoviesComponent } from './view-movies/view-movies.component';
import { ProgramComponent } from './view/program/program.component';
import { BookingsComponent } from './view/booking/bookings/bookings.component';
import { TicketComponent } from './view/ticket-overview/ticket/ticket.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  //Customer Routes
  { path: 'program', component: ProgramComponent },
  { path: 'booking', component: BookingsComponent },
    { path: 'ticket', component: TicketComponent},



  //Used rn for login route

  { path: 'login', component: LoginComponent },

  //ManagementMovie
    { path: 'theatre', component: TheatreManagingComponent, canActivate: [ManagerActivate]},
    { path: 'movieManagement', component: ViewMoviesComponent, canActivate: [ManagerActivate]},
    { path: 'presentation', component: PresentationManagerComponent, canActivate: [ManagerActivate]},
    { path: 'sellTickets', component: ManagementSellTicketsComponent, canActivate: [ManagerActivate]}

];

@NgModule({
    declarations: [],
    imports: [
      CommonModule,
      RouterModule.forRoot(routes)
    ],
    exports: [RouterModule]
  })

export class AppRoutingModule { }
