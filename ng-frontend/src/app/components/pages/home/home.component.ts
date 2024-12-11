import { Component } from '@angular/core';
import { InfoDisplayComponent } from "../../shared/info-display/info-display.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [InfoDisplayComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  homeTitle = 'HOME SWEET HOME';
  homeContent = 'Explore our website, read our blogs';
}
