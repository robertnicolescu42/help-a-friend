import { Component, OnInit } from '@angular/core';
import { UserListComponent } from '../user-list/user-list.component';
import { DataSourceService } from '../../core/services/data-source.service';
import { User } from '../../core/types/user';

@Component({
  selector: 'app-dashboard',
  imports: [UserListComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  users: User[] = [];
  constructor(private dataSourceService: DataSourceService) {}

  ngOnInit() {
    this.dataSourceService.fetchUsers(1).subscribe((users) => {
      console.log(
        '🚀 ~ DashboardComponent ~ this.dataSourceService.fetchUsers ~ users:',
        users
      );
      this.users = users;

      this.dataSourceService
        .fetchUserRepos(1, users[0].login)
        .subscribe((repos) => {
          console.log('🚀 ~ DashboardComponent ~ .subscribe ~ repos:', repos);
        });
    });
  }
}
