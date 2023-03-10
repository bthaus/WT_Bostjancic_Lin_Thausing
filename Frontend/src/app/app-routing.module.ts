import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProgramComponent } from './program/program.component';
import { PurchasesComponent } from './purchases/purchases.component';
import { SoonComponent } from './soon/soon.component';
import { HomeComponent } from "./home/home.component";
import { LoginComponent } from './login/login.component';
import { MovieComponent } from './movie/movie.component';

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: 'program', component: ProgramComponent },
  { path: 'purchases', component: PurchasesComponent },
  { path: 'soon', component: SoonComponent },
  { path: 'login', component: LoginComponent },
  { path: 'movie', component: MovieComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
