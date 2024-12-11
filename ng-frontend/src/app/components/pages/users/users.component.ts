import { Component, inject, OnInit, signal } from '@angular/core';
import { IUser } from '../../../model/interface/interfaces';
import { UserService } from '../../../service/user.service';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent implements OnInit {
  userService = inject(UserService)
  users : IUser[] = []
  currentPage = 1
  totalPages = 1
  isEmailDisplay : boolean = false

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

  // onClick() {
  //   this.isEmailDisplay = !this.isEmailDisplay
  // }

}
