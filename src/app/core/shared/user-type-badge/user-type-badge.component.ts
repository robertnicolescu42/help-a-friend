import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-user-type-badge',
  imports: [CommonModule],
  templateUrl: './user-type-badge.component.html',
  styleUrl: './user-type-badge.component.scss',
})
export class UserTypeBadgeComponent {
  @Input() type: string | undefined;

  getBadgeClass() {
    switch (this.type) {
      case 'User':
        return 'bg-primary';
      case 'Organization':
        return 'bg-secondary';
      case 'Enterprise':
        return 'bg-success';
      default:
        return 'bg-secondary';
    }
  }
}
