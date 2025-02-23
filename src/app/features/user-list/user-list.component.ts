import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { User } from '../../core/types/user';
import { UserTypeBadgeComponent } from '../../core/shared/user-type-badge/user-type-badge.component';

@Component({
  selector: 'app-user-list',
  imports: [CommonModule, RouterModule, UserTypeBadgeComponent],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss',
})
export class UserListComponent {
  @Input()
  page: number = 1;

  @Input()
  users: User[] = [];
}
