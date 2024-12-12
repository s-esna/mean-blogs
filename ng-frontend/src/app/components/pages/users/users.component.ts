import { Component, inject, OnInit, signal } from '@angular/core';
import { IUser } from '../../../model/interface/interfaces';
import { UserService } from '../../../service/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent implements OnInit {
  userService = inject(UserService)
  toastr = inject(ToastrService)
  

  users : IUser[] = []
  currentPage = 1
  totalPages = 1
  
  buttonText: string = 'Click me for mass emails';
  isCopying: boolean = false;


  ngOnInit(): void {
    this.loadPage()
  }

  loadPage(page: number = 1) {
    this.userService.getAllUsers(page)
    .subscribe(({users, totalPages}) => {
      this.users = users
      this.currentPage = page
      this.totalPages = totalPages
    })
  }

  copyEmails() {
    this.isCopying = true;
    this.buttonText = 'Fetching emails...';

    // Make API call to fetch all emails
    this.userService.getAllEmails().subscribe(
      (response : {emails:string[]}) => {
        const emailString = response.emails.join('; '); // Joining emails with semicolons for easy copy
        this.copyToClipboard(emailString);

        // Update UI and show success message
        this.buttonText = 'All emails copied to clipboard';
        this.toastr.success('Emails copied to clipboard');
        this.isCopying = false;
      }
    ,
      (error) => {
        // Handle error (e.g., API failure)
        this.buttonText = 'Error occurred. Try again';
        this.isCopying = false;
        this.toastr.error('Failed to fetch emails');
      }
    );
  }

  copyToClipboard(text: string) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
  }

}
