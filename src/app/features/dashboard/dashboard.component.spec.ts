import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardComponent } from './dashboard.component';
import { RouterModule } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { User } from '../../core/types/user';
import { of } from 'rxjs';
import { ToastrModule } from 'ngx-toastr';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardComponent, RouterModule, ToastrModule.forRoot()],
      providers: [provideHttpClient()],
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with an empty users array', () => {
    expect(component.users.length).toBe(0);
  });
});
