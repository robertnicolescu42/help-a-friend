import { Component, OnInit } from '@angular/core';
import { DataSourceService } from '../../core/services/data-source.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Repo } from '../../core/types/repo';
import { LoadingComponent } from '../../core/shared/loading/loading.component';
import { BehaviorSubject, tap } from 'rxjs';
import { InfiniteScrollDirective } from 'ngx-infinite-scroll';

@Component({
  selector: 'app-user-details',
  imports: [
    RouterModule,
    CommonModule,
    LoadingComponent,
    InfiniteScrollDirective,
  ],
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.scss',
})
export class UserDetailsComponent implements OnInit {
  username: string = '';
  repos: Repo[] = [];
  loading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  currentPage: number = 1;
  scrollDistance: number = 1;
  scrollUpDistance: number = 2;
  scrollThrottle: number = 300;

  constructor(
    private dataSourceService: DataSourceService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.username = this.route.snapshot.paramMap.get('login')!;
  }

  ngOnInit(): void {
    this.fetchRepos();
  }

  fetchRepos(page: number = 1): void {
    this.dataSourceService
      .fetchUserRepos(page, this.username)
      .pipe(
        tap(() => {
          if (page === 1) {
            this.loading$.next(true);
          }
        })
      )
      .subscribe((repos) => {
        if (page === 1) {
          this.repos = repos;
        } else {
          this.repos = [...this.repos, ...repos];
        }
        this.loading$.next(false);
      });
  }

  loadMoreRepos(): void {
    this.currentPage++;
    this.fetchRepos(this.currentPage);
  }

  goBack() {
    this.router.navigate(['/dashboard']);
  }
}
