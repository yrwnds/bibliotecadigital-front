import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from './home-component';
import {DashboardComponent} from './dashboard-component/dashboard-component';
import {UsuarioComponent} from './usuario-component/usuario-component';
import {PerfilComponent} from './perfil-component/perfil-component';
import {EmprestimosComponent} from './emprestimos-component/emprestimos-component';
import {LivrosComponent} from './livros-component/livros-component';

const routes: Routes = [
  {path: '', component: HomeComponent, children:
  [
    {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
    {path: 'dashboard', component: DashboardComponent},
    {path: 'usuario', component: UsuarioComponent},
    {path: 'perfil', component: PerfilComponent},
    {path: 'emprestimos', component: EmprestimosComponent},
    {path: 'livros', component: LivrosComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
