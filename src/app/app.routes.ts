import { Routes } from '@angular/router';
import {authGuard} from '../core/security/auth-guard';

export const routes: Routes = [
  {path: '', loadChildren: () => import('../modules/root/root-module').then(m => m.RootModule)},
  {path: 'home', canActivate: [authGuard], loadChildren: () => import('../modules/home/home-module').then(m => m.HomeModule)}
];
