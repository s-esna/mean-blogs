import { Component } from '@angular/core';
import { InfoDisplayComponent } from "../../shared/info-display/info-display.component";

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [InfoDisplayComponent],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {
  contactTitle = 'Contact Us';
  contactContent = 'If you have any questions, please feel free to reach out to us.';

  onFormSubmit(userMessage: string) {
    alert('Your message: ' + userMessage); // Handle the form submission (e.g., send to server)
  }
}
