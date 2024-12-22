import { Component, inject } from '@angular/core';
import { InfoDisplayComponent } from "../../shared/info-display/info-display.component";
import { ContactService } from '../../../service/contact.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [InfoDisplayComponent],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {
  toastr = inject(ToastrService)
  contactTitle = 'Contact Us';
  contactContent = `If you have any questions, please feel free to reach out to us. We will reply to the email you've registered with`;
  song = '<iframe style="border-radius:12px" src="https://open.spotify.com/embed/track/17VP4tofJ3evJbtY8Tk1Qi?utm_source=generator" width="100%" height="152" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>'
  contactService = inject(ContactService)

  onFormSubmit(userMessage: string) {
    this.contactService.sendEmail(userMessage).subscribe({
      next: (response) => {
        this.toastr.success(`You will receive a reply soon to the email you've registered with.`, "Message sent successfully!")
      },
      error: (error) => {
        console.error('Error e email:', error);
        this.toastr.error(`Failed to send message. Please try again later.`, "Error:")
      }
    })
  }
}
