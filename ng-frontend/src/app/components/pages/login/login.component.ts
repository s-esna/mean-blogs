import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../../service/user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  
  router = inject(Router)
  userService = inject(UserService)

  showPassword : boolean = false

  ngOnInit(): void {}

  loginForm: FormGroup = new FormGroup({
    emailOrUsername: new FormControl(""),
    password: new FormControl("")
  })

  onLogin() {
    const loginObj = this.loginForm.value
    
    this.userService.loginUser(loginObj).subscribe({
      next: (response:any) => {
        localStorage.setItem('token', response.token)
        alert(response.message)
        this.router.navigateByUrl('/')
      },
      error: err => {
        alert(err.error.message || "something went wrong")
      }
    })
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword
  }

}
