import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent, } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatInputModule} from '@angular/material/input'; 
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field'; 
import {MatIconModule} from '@angular/material/icon'; 
import {matDialogAnimations, MatDialogModule} from '@angular/material/dialog'; 
import {MatToolbarModule} from '@angular/material/toolbar';
import { LoginComponent } from './login/login.component';
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
    MatCardModule,
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
    MatCheckboxModule
  ],
  providers: [    
     {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorInterceptor, multi:true},

    AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
