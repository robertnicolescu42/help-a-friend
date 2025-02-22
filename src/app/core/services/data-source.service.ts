import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../types/user';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class DataSourceService {
  apiUrl: string = 'https://api.github.com';
  numberOfItemsPerPage: number = 10;

  constructor(private http: HttpClient) {}

  fetchUsers(page: number): Observable<User[]> {
    const params = new HttpParams()
      .set('per_page', this.numberOfItemsPerPage)
      .set('page', page);

    return this.http.get<any>(`${this.apiUrl}/users`, { params });
  }

  fetchUserRepos(page: number, username: string): Observable<any> {
    const params = new HttpParams()
      .set('per_page', this.numberOfItemsPerPage)
      .set('page', page);
    return this.http.get(`${this.apiUrl}/users/${username}/repos`, { params });
  }
}
