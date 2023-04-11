import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProgramComponent } from './program/program.component';
import { PurchasesComponent } from './purchases/purchases.component';
import { SoonComponent } from './soon/soon.component';
import { HomeComponent } from "./home/home.component";
import { LoginComponent } from './login/login.component';
import { MovieComponent } from './movie/movie.component';
import { CommonModule } from '@angular/common';
import { TheatreManagingComponent } from './theatre-managing/theatre-managing.component';
import { ViewMoviesComponent } from './view-movies/view-movies.component';
import { PresentationManagerComponent } from './presentation-manager/presentation-manager.component';
import { ManagementSellTicketsComponent } from './management-sell-tickets/management-sell-tickets.component';

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: 'program', component: ProgramComponent },
  { path: 'purchases', component: PurchasesComponent },
  { path: 'soon', component: SoonComponent },
  { path: 'login', component: LoginComponent },
  { path: 'movie', component: MovieComponent },
  //ManagementMovie
    { path: 'theatre', component: TheatreManagingComponent },
    { path: 'movieManagement', component: ViewMoviesComponent },
    { path: 'presentation', component: PresentationManagerComponent },
    { path: 'sellTickets', component: ManagementSellTicketsComponent }

  
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
