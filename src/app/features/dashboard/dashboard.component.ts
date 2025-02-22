import { Component, OnInit } from '@angular/core';
import { UserListComponent } from '../user-list/user-list.component';
import { DataSourceService } from '../../core/services/data-source.service';
import { User } from '../../core/types/user';
import { CommonModule } from '@angular/common';
import { BehaviorSubject, tap } from 'rxjs';
import { LoadingComponent } from '../../core/shared/loading/loading.component';
import { InfiniteScrollDirective } from 'ngx-infinite-scroll';

@Component({
  imports: [
    UserListComponent,
    CommonModule,
    LoadingComponent,
    InfiniteScrollDirective,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  users: User[] = [];
  loading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  currentPage: number = 1;
  scrollDistance: number = 2;
  scrollUpDistance: number = 1;
  scrollThrottle: number = 300;

  constructor(private dataSourceService: DataSourceService) {}

  ngOnInit() {
    this.loadUsers(this.currentPage);
  }

  loadUsers(page: number) {
    this.dataSourceService
      .fetchUsers(page)
      .pipe(tap(() => this.loading$.next(true)))
      .subscribe((users) => {
        this.users = this.users.concat(users);
        this.loading$.next(false);
      });
  }

  loadMoreUsers() {
    if (!this.loading$.value) {
      // from the docs: since: A user ID. Only return users with an ID greater than this ID.
      // the logic is that we take the last user's id and use it as the since parameter
      this.currentPage = this.users[this.users.length - 1].id;
      this.loadUsers(this.currentPage);
    }
  }
}
