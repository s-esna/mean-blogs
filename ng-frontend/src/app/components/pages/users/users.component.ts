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
  users$ = signal<IUser[]>([])

  ngOnInit(): void {
    this.loadPage()
  }

  loadPage() {
    console.log("got users")
    this.userService.getAllUsers()
    .subscribe((users: IUser[]) => {
      this.users$.set(users)
    })
  }

}
