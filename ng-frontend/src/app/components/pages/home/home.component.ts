import { Component } from '@angular/core';
import { InfoDisplayComponent } from "../../shared/info-display/info-display.component";
import { NavbarComponent } from "../../../partial-components/navbar/navbar.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [InfoDisplayComponent, NavbarComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  homeTitle = 'HOME SWEET HOME';
  homeContent = 'Explore our website, read our blogs';
}
