import { Routes } from '@angular/router';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { UserDetailsComponent } from './features/user-details/user-details.component';

// the app should have the following pages: dashboard (as a home page), then a page for when the user clicks on a profile, that will display a list of repositories the user has access to on github
export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    component: DashboardComponent,
    path: 'dashboard',
    children: [
      {
        path: 'profile/:username',
        component: UserDetailsComponent,
      },
    ],
  },
];
