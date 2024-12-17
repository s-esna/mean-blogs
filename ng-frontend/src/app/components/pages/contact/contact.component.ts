import { Component, inject } from '@angular/core';
import { InfoDisplayComponent } from "../../shared/info-display/info-display.component";
import { ContactService } from '../../../service/contact.service';

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

  contactService = inject(ContactService)

  onFormSubmit(userMessage: string) {
    alert('Your message: ' + userMessage); // Handle the form submission (e.g., send to server)
    this.contactService.sendEmail(userMessage).subscribe({
      next: (response) => {
        console.log('Email sent successfully:', response);
        alert('Your message was sent successfully!');
      },
      error: (error) => {
        console.error('Error e email:', error);
        alert('Failed to send the message. Please try again later.');
      }
    })
  }
}
