import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from '../types/user';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Repo } from '../types/repo';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DataSourceService {
  apiUrl: string = 'https://api.github.com';
  numberOfItemsPerPage: number = 10;

  constructor(private http: HttpClient) {}

  // auth
  private getHeaders(): HttpHeaders {
    return new HttpHeaders().set(
      'Authorization',
      `token ${environment.githubToken}`
    );
  }

  fetchUsers(since: number): Observable<User[]> {
    const params = new HttpParams()
      .set('per_page', this.numberOfItemsPerPage)
      .set('since', since);
    const headers = this.getHeaders();

    return this.http
      .get<User[]>(`${this.apiUrl}/users`, { params, headers })
      .pipe(
        catchError((error) => {
          return of([]);
        })
      );
  }

  fetchUserRepos(page: number, username: string): Observable<Repo[]> {
    const params = new HttpParams()
      .set('per_page', this.numberOfItemsPerPage)
      .set('page', page);
    const headers = this.getHeaders();

    return this.http
      .get<Repo[]>(`${this.apiUrl}/users/${username}/repos`, {
        params,
        headers,
      })
      .pipe(
        catchError((error) => {
          if (error.status === 404) {
            return of([]);
          }
          throw error;
        })
      );
  }
}
