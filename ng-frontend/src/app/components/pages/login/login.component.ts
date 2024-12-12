import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../../service/user.service';
import { CommonModule } from '@angular/common';
import {  ToastrService } from 'ngx-toastr';

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
  toastr = inject(ToastrService)

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
        this.toastr.success(response.message, "SUCCESS" ,{
          timeOut: 3000, // Close after 3 seconds
          positionClass: 'toast-top-right', // Position on the screen
          closeButton: true // Show a close button
        })
        this.router.navigateByUrl('/')
      },
      error: err => {
        this.toastr.error(err.error.message || "Too many attempts, try again later", "OOPS" ,{
          timeOut: 3000, // Close after 3 seconds
          positionClass: 'toast-top-right', // Position on the screen
          closeButton: true // Show a close button
        })
      }
    })
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword
  }

}
