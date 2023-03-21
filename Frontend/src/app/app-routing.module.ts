import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { PresentationManagerComponent } from './presentation-manager/presentation-manager.component';
import { TheatreManagingComponent } from './theatre-managing/theatre-managing.component';
import { ViewMoviesComponent } from './view-movies/view-movies.component';
const routes: Routes = [
    { path: 'theatre', component: TheatreManagingComponent },
    { path: 'movie', component: ViewMoviesComponent },
    { path: 'presentation', component: PresentationManagerComponent },
    { path: 'login', component: LoginComponent }


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
