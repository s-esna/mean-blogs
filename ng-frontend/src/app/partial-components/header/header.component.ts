import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  router = inject(Router)
  onLogoff() {
    localStorage.removeItem("user")
    // redirecting to "/login" is done directly on the HTML using RouterLink
  }
}
