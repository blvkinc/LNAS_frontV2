import {Component, Inject} from '@angular/core';
import {CommonModule, DOCUMENT} from '@angular/common';
import {Router, RouterLink, RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterOutlet],
  templateUrl: './home-page.component.html',
})
export class HomePageComponent {
  constructor(@Inject(DOCUMENT) private document: Document, private router: Router) { }

  user = JSON.parse(localStorage.getItem('auth') || '{}');

  sidebarToggle() {
    this.document.body.classList.toggle('toggle-sidebar');
  }

  onSignOut() {
    localStorage.removeItem('auth');
    this.router.navigate(['/']);
  }
}
