import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ViewMoviesComponent } from './view-movies/view-movies.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import { DialogComponent } from './dialog/dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { TheatreManagingComponent } from './theatre-managing/theatre-managing.component';
import { PresentationManagerComponent } from './presentation-manager/presentation-manager.component';
import { DialogHallsComponent } from './dialog-halls/dialog-halls.component';
import { DilogPresentationsComponent } from './dilog-presentations/dilog-presentations.component';
import { LoginComponent } from './login/login.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { AuthService } from './auth-service.service';
import { AuthInterceptorInterceptor } from './auth-interceptor.interceptor';



@NgModule({
  declarations: [
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
    AuthService]
  ,
  bootstrap: [AppComponent]
})
export class AppModule { }
