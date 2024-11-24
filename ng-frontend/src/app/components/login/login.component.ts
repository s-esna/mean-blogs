import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  usernames: string[] = []
  username : string = ""
  password: string = ""
  
  router = inject(Router)

  ngOnInit(): void {
    this.populateUsers()
  }

  loginForm: FormGroup = new FormGroup({
    username: new FormControl(""),
    password: new FormControl("")
  })

  
  
  populateUsers() {
    for (let i = 1000; i <= 5000; i++) {
      this.usernames[i] = i.toString()
    }
  }

  onLogin() {
    const loginObj = this.loginForm.value
    if ( loginObj.username == 'abc@123.com' && loginObj.password == 'a1q1S@W@') {
      this.router.navigateByUrl('home')
      localStorage.setItem("user", loginObj.username)
    } else {
      alert('incorrect username or password')
    }
  }



}
