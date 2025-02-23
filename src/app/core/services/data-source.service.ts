import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from '../types/user';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Repo } from '../types/repo';

@Injectable({
  providedIn: 'root',
})
export class DataSourceService {
  apiUrl: string = 'https://api.github.com';
  numberOfItemsPerPage: number = 10;

  constructor(private http: HttpClient) {}

  fetchUsers(since: number): Observable<User[]> {
    const params = new HttpParams()
      .set('per_page', this.numberOfItemsPerPage)
      .set('since', since);

    return this.http.get<User[]>(`${this.apiUrl}/users`, { params }).pipe(
      catchError((error) => {
        return of([]);
      })
    );
  }

  fetchUserRepos(page: number, username: string): Observable<Repo[]> {
    const params = new HttpParams()
      .set('per_page', this.numberOfItemsPerPage)
      .set('page', page);

    return this.http
      .get<Repo[]>(`${this.apiUrl}/users/${username}/repos`, {
        params,
      })
      .pipe(
        catchError((error) => {
          if (error.status === 404) {
            return of([]);
          } else if (error.status === 403) {
            throw new Error('Rate limit exceeded');
          }
          throw error;
        })
      );
  }
}
