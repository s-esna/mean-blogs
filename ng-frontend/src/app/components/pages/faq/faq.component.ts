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
  song = '<iframe src="https://open.spotify.com/embed/track/2H9dio3RZRAzUQwkVvoYJt?utm_source=generator" width="100%" height="152" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>'
}
