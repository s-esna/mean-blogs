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

  //BELOW IS VERY TRIPPY
  // song = '<iframe src="<iframe style="border-radius:12px" src="https://open.spotify.com/embed/track/4QhurIYmq2UPZih1mjHUmh?utm_source=generator" width="100%" height="352" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>'

  song = '<iframe style="border-radius:12px" src="https://open.spotify.com/embed/track/4QhurIYmq2UPZih1mjHUmh?utm_source=generator" width="100%" height="152" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>'
}
