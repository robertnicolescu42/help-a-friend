import { Component, OnInit } from '@angular/core';
import { DataSourceService } from '../../core/services/data-source.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Repo } from '../../core/types/repo';
import { LoadingComponent } from '../../core/shared/loading/loading.component';
import { BehaviorSubject, tap } from 'rxjs';

@Component({
  selector: 'app-user-details',
  imports: [RouterModule, CommonModule, LoadingComponent],
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.scss',
})
export class UserDetailsComponent implements OnInit {
  username: string = '';
  repos: Repo[] = [];
  loading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

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

  fetchRepos(): void {
    this.dataSourceService
      .fetchUserRepos(1, this.username)
      .pipe(tap(() => this.loading$.next(true)))
      .subscribe((repos) => {
        console.log('🚀 ~ DashboardComponent ~ .subscribe ~ repos:', repos);
        this.repos = repos;
        this.loading$.next(false);
      });
  }

  goBack() {
    this.router.navigate(['/dashboard']);
  }
}
