import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from './home-component';
import {DashboardComponent} from './dashboard-component/dashboard-component';
import {UsuarioComponent} from './usuario-component/usuario-component';

const routes: Routes = [
  {path: '', component: HomeComponent, children:
  [
    {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
    {path: 'dashboard', component: DashboardComponent},
    {path: 'usuario', component: UsuarioComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
