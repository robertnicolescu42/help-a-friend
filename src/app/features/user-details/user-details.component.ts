import { Component, OnInit } from '@angular/core';
import { DataSourceService } from '../../core/services/data-source.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-details',
  imports: [RouterModule, CommonModule],
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.scss',
})
export class UserDetailsComponent implements OnInit {
  username: string = '';
  repos: any[] = [];

  constructor(
    private dataSourceService: DataSourceService,
    private route: ActivatedRoute
  ) {
    this.username = this.route.snapshot.paramMap.get('login')!;
  }

  ngOnInit(): void {
    this.dataSourceService
      .fetchUserRepos(1, this.username)
      .subscribe((repos) => {
        console.log('🚀 ~ DashboardComponent ~ .subscribe ~ repos:', repos);
        this.repos = repos;
      });
  }
}
