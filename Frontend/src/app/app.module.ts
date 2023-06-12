import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent, ManagerActivate, } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatInputModule} from '@angular/material/input'; 
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field'; 
import {MatIconModule} from '@angular/material/icon'; 
import {matDialogAnimations, MatDialogModule} from '@angular/material/dialog'; 
import {MatToolbarModule} from '@angular/material/toolbar';
import { LoginComponent } from './view/login/login.component';
import { HomeComponent } from './home/home.component';
import { ProgramComponent } from './program/program.component';
import { SoonComponent } from './soon/soon.component';
import { PurchasesComponent } from './purchases/purchases.component';
import {MatCardModule} from '@angular/material/card';
import { MovieComponent } from './movie/movie.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthService } from './auth.service';
import { HttpClientModule } from '@angular/common/http';
import { AuthInterceptorInterceptor } from './auth-interceptor.interceptor';
import { ViewMoviesComponent } from './view-movies/view-movies.component';
import { DialogComponent } from './dialog/dialog.component';
import { TheatreManagingComponent } from './theatre-managing/theatre-managing.component';
import { PresentationManagerComponent } from './presentation-manager/presentation-manager.component';
import { DialogHallsComponent } from './dialog-halls/dialog-halls.component';
import { DilogPresentationsComponent } from './dilog-presentations/dilog-presentations.component';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { EditMovieDialogComponent } from './edit-movie-dialog/edit-movie-dialog.component';
import { DialogManagerCommentsComponent } from './dialog-manager-comments/dialog-manager-comments.component';
import { SeatTheatremanagerDialogComponent } from './seat-theatremanager-dialog/seat-theatremanager-dialog.component';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { ManagementSellTicketsComponent } from './management-sell-tickets/management-sell-tickets.component';
import { DialogSellTicketsComponent } from './dialog-sell-tickets/dialog-sell-tickets.component';

import { MAT_SNACK_BAR_DEFAULT_OPTIONS, MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';


//new
/*
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

*/
@NgModule({
  declarations: [
    AppComponent, 
    HomeComponent,
    ProgramComponent,
    SoonComponent,
    PurchasesComponent,
    LoginComponent,
    MovieComponent,
    AppComponent,
    ViewMoviesComponent,
    DialogComponent,
    TheatreManagingComponent,
    PresentationManagerComponent,
    DialogHallsComponent,
    DilogPresentationsComponent,
    LoginComponent,
    EditMovieDialogComponent,
    DialogManagerCommentsComponent, 
    SeatTheatremanagerDialogComponent, 
    ManagementSellTicketsComponent, 
    DialogSellTicketsComponent,
    
    //Andy
    

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule, 
    MatInputModule, 
    FormsModule, 
    ReactiveFormsModule, 
    MatButtonModule, 
    MatFormFieldModule, 
    MatIconModule, 
    MatDialogModule, 
    MatToolbarModule, 
    MatCheckboxModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatSelectModule,
    MatNativeDateModule,
    MatDatepickerModule,
    FormsModule,
    ReactiveFormsModule,
    MatGridListModule,      
   MatSnackBarModule,
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
   MatCardModule
   

  ],
  providers: [    
    {provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {duration: 2500}},
     {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorInterceptor, multi:true},
     ManagerActivate,
    AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
