import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './ui/navbar/navbar.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { FilmCardComponent } from './ui/film-card/film-card.component';
import { ProgramComponent } from './view/program/program.component';
import { MatCardModule } from '@angular/material/card';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './view/home/home.component';
import { BookingsComponent } from './view/booking/bookings/bookings.component';
import { MatIconModule } from '@angular/material/icon';
import { LoginComponent } from './view/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from "@angular/material/form-field";
import { ErrorComponent } from './view/error/error.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { SeatReservationComponent } from './ui/seat-reservation/seat-reservation.component';
import { MatSelectModule } from '@angular/material/select';
import { MovieTableComponent } from './ui/movie-table/movie-table.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MovieDatePickerComponent } from './ui/movie-date-picker/movie-date-picker.component';
import { TicketOverviewComponent } from './view/ticket-overview/ticket-overview.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ReviewDialogComponent } from './ui/film-card/review-dialog/review-dialog.component';
import { ReviewEditorDialogComponent } from './ui/film-card/review-editor-dialog/review-editor-dialog.component';
import { StarRatingModule } from 'angular-star-rating';
import { QRCodeModule } from 'angularx-qrcode';
import { TicketComponent } from './view/ticket-overview/ticket/ticket.component';
import { TicketQrCodeDialogComponent } from './view/ticket-overview/ticket/ticket-qr-code-dialog/ticket-qr-code-dialog.component';
import { MatDividerModule } from '@angular/material/divider';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FilmCardComponent,
    ProgramComponent,
    HomeComponent,
    BookingsComponent,
    LoginComponent,
    ErrorComponent,
    SeatReservationComponent,
    MovieTableComponent,
    MovieDatePickerComponent,
    TicketOverviewComponent,
    ReviewDialogComponent,
    ReviewEditorDialogComponent,
    TicketComponent,
    TicketQrCodeDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatToolbarModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCardModule,
    HttpClientModule,
    MatIconModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatSelectModule,
    MatTableModule,
    MatPaginatorModule,
    MatDialogModule,
    StarRatingModule.forRoot(),
    QRCodeModule,
    MatDividerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
