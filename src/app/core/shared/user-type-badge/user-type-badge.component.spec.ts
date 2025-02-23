import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserTypeBadgeComponent } from './user-type-badge.component';

describe('UserTypeBadgeComponent', () => {
  let component: UserTypeBadgeComponent;
  let fixture: ComponentFixture<UserTypeBadgeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserTypeBadgeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserTypeBadgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
