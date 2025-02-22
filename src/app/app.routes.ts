import { Routes } from '@angular/router';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { UserDetailsComponent } from './features/user-details/user-details.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    component: DashboardComponent,
    path: 'dashboard',
  },
  { path: 'user/:login', component: UserDetailsComponent },
  { path: '**', redirectTo: 'dashboard' },
];
