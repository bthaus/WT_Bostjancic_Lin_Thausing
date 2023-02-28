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






@NgModule({
  declarations: [
    AppComponent, 
    HomeComponent,
    ProgramComponent,
    SoonComponent,
    PurchasesComponent,
    LoginComponent,
    MovieComponent,
    
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
    

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
