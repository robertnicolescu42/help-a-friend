import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from '../types/user';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Repo } from '../types/repo';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class DataSourceService {
  apiUrl: string = 'https://api.github.com';
  numberOfItemsPerPage: number = 10;

  constructor(private http: HttpClient, private toastr: ToastrService) {}

  fetchUsers(since: number): Observable<User[]> {
    const params = new HttpParams()
      .set('per_page', this.numberOfItemsPerPage)
      .set('since', since);

    return this.http.get<User[]>(`${this.apiUrl}/users`, { params }).pipe(
      catchError((error) => {
        this.toastr.error(error.error.message, 'Error');
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
            this.toastr.error('User not found', 'Error');
            return of([]);
          } else if (error.status === 403) {
            this.toastr.error(error.error.message, 'Error');
            throw new Error('Rate limit exceeded');
          }
          throw error;
        })
      );
  }
}
