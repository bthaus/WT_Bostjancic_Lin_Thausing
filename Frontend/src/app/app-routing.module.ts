import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookingsComponent } from './view/booking/bookings/bookings.component';
import { ErrorComponent } from './view/error/error.component';
import { HomeComponent } from './view/home/home.component';
import { LoginComponent } from './view/login/login.component';
import { ProgramComponent } from './view/program/program.component';
import { TicketOverviewComponent } from './view/ticket-overview/ticket-overview.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'program', component: ProgramComponent },
  { path: 'bookings', component: BookingsComponent },
  { path: 'ticket-overview', component: TicketOverviewComponent },
  { path: '**', pathMatch: 'full', component: ErrorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
