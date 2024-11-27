import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  
  router = inject(Router)
  userService = inject(UserService)

  ngOnInit(): void {}

  loginForm: FormGroup = new FormGroup({
    emailOrUsername: new FormControl(""),
    password: new FormControl("")
  })

  onLogin() {
    const loginObj = this.loginForm.value
    
    this.userService.loginUser(loginObj).subscribe({
      next: (response:any) => {
        alert(response.message)
        this.router.navigateByUrl('/')
      },
      error: err => {
        alert(err.error.message || "something went wrong")
      }
    })
  }

}
