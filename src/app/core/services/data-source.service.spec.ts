import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { DataSourceService } from './data-source.service';
import { User } from '../types/user';
import { Repo } from '../types/repo';

describe('DataSourceService', () => {
  let service: DataSourceService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DataSourceService],
    });
    service = TestBed.inject(DataSourceService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    // this makes sure that no requests were left unhandled
    httpMock.verify();
  });

  it('should fetch a list of users', () => {
    const dummyUsers: User[] = [
      { id: 1, login: 'user1' },
      { id: 2, login: 'user2' },
      { id: 3, login: 'user3' },
      { id: 4, login: 'user4' },
      { id: 5, login: 'user5' },
      { id: 6, login: 'user6' },
      { id: 7, login: 'user7' },
      { id: 8, login: 'user8' },
      { id: 9, login: 'user9' },
      { id: 10, login: 'user10' },
    ];

    service.fetchUsers(0).subscribe((users) => {
      expect(users.length).toBe(service.numberOfItemsPerPage);
      expect(users).toEqual(dummyUsers);
    });

    const req = httpMock.expectOne(
      `${service.apiUrl}/users?per_page=${service.numberOfItemsPerPage}&since=0`
    );
    expect(req.request.method).toBe('GET');
    req.flush(dummyUsers);
  });

  it('should handle error when fetching users', () => {
    service.fetchUsers(0).subscribe((users) => {
      expect(users.length).toBe(0);
    });

    const req = httpMock.expectOne(
      `${service.apiUrl}/users?per_page=${service.numberOfItemsPerPage}&since=0`
    );
    expect(req.request.method).toBe('GET');
    req.flush('Error', { status: 500, statusText: 'Server Error' });
  });

  it('should fetch a list of the user repos', () => {
    const dummyRepos: Repo[] = [
      { id: 1, name: 'repo1' },
      { id: 2, name: 'repo2' },
    ];

    service.fetchUserRepos(1, 'user1').subscribe((repos) => {
      expect(repos.length).toBe(2);
      expect(repos).toEqual(dummyRepos);
    });

    const req = httpMock.expectOne(
      `${service.apiUrl}/users/user1/repos?per_page=${service.numberOfItemsPerPage}&page=1`
    );
    expect(req.request.method).toBe('GET');
    req.flush(dummyRepos);
  });

  it('should handle 404 error when fetching user repos', () => {
    service.fetchUserRepos(1, 'nonexistentuser').subscribe((repos) => {
      expect(repos.length).toBe(0);
    });

    const req = httpMock.expectOne(
      `${service.apiUrl}/users/nonexistentuser/repos?per_page=${service.numberOfItemsPerPage}&page=1`
    );
    expect(req.request.method).toBe('GET');
    req.flush('Not Found', { status: 404, statusText: 'Not Found' });
  });
});
