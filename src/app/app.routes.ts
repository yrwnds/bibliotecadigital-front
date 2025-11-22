import { Routes } from '@angular/router';
import {authGuard} from '../core/security/auth-guard';
import {adminGuard} from '../core/security/admin-guard';

export const routes: Routes = [
  {path: '', loadChildren: () => import('../modules/root/root-module').then(m => m.RootModule)},
  {path: 'home', canActivate: [authGuard], loadChildren: () => import('../modules/home/home-module').then(m => m.HomeModule)},
  {path: 'dashboard', canActivate: [authGuard], loadChildren: () => import('../modules/home/home-module').then(m => m.HomeModule)},
  {path: 'usuario', canActivate: [adminGuard], loadChildren: () => import('../modules/home/home-module').then(m => m.HomeModule)},
  {path: 'emprestimos', canActivate: [adminGuard], loadChildren: () => import('../modules/home/home-module').then(m => m.HomeModule)},
  {path: 'livros', canActivate: [adminGuard], loadChildren: () => import('../modules/home/home-module').then(m => m.HomeModule)}
];
