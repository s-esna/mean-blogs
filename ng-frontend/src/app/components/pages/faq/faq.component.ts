import { Component } from '@angular/core';
import { InfoDisplayComponent } from "../../shared/info-display/info-display.component";

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [InfoDisplayComponent],
  templateUrl: './faq.component.html',
  styleUrl: './faq.component.css'
})
export class FaqComponent {
  faqTitle = 'Frequently Asked Questions'
  faqContent = 'Here you will find you answers'
}
