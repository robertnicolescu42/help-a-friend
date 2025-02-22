import { Component, OnInit } from '@angular/core';
import { UserListComponent } from '../user-list/user-list.component';
import { DataSourceService } from '../../core/services/data-source.service';
import { User } from '../../core/types/user';
import { CommonModule } from '@angular/common';
import { BehaviorSubject, tap } from 'rxjs';
import { LoadingComponent } from '../../core/shared/loading/loading.component';

@Component({
  selector: 'app-dashboard',
  imports: [
    UserListComponent,
    CommonModule,
    LoadingComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  users: User[] = [];
  loading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

  constructor(private dataSourceService: DataSourceService) {}

  ngOnInit() {
    this.dataSourceService
      .fetchUsers(1)
      .pipe(tap(() => this.loading$.next(true)))
      .subscribe((users) => {
        console.log(
          '🚀 ~ DashboardComponent ~ this.dataSourceService.fetchUsers ~ users:',
          users
        );
        this.users = users;
        this.loading$.next(false);
      });
  }
}
