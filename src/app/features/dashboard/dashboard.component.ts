import { Component } from '@angular/core';
import { UserListComponent } from '../user-list/user-list.component';

@Component({
  selector: 'app-dashboard',
  imports: [UserListComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

}
