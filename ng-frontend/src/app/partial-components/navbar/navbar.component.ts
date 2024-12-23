import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { UserService } from '../../service/user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  userService = inject(UserService)
  router = inject(Router)
  isAdmin = this.checkAdminStatus()
  isLoggedIn = this.checkLoggedStatus()
  username : string = ""
  isMenuOpen = false;

  

  ngOnInit(): void {
    this.isMenuOpen = false
    this.isLoggedIn = this.checkLoggedStatus();
    this.isAdmin = this.checkAdminStatus();
    if (this.isLoggedIn) {
      this.getUsernameByUserId(); // Fetch the username if logged in
    }
  }

  onLogoff() {
    localStorage.removeItem("token")
  }

  checkLoggedStatus() {
    const token = localStorage.getItem("token")
    if (token) {
      try{
        const decodedToken: any = jwtDecode(token); 
        return decodedToken.id
      } catch (error) {
        console.error('could not decode token', error)
        return false
      }
    }
    return false
  }

  checkAdminStatus() {
    const token = localStorage.getItem("token")
    
    if (token) {
      try{
        const decodedToken: any = jwtDecode(token); 
        return decodedToken.isAdmin
      } catch (error) {
        console.error('could not decode token', error)
        return false
      }
    }
    return false
  }

  getUsernameByUserId() {
    const token = localStorage.getItem("token")
    if (token) {
      try{
        const decodedToken: any = jwtDecode(token);
        this.userService.getUsernameByUserId(decodedToken.id).subscribe({
          next: (response: { username: string }) => {
            this.username = response.username; // Set the username
          },
          error: (err) => {
            console.error('Error fetching username:', err);
          },
        });
      } catch (error) {
        console.error('could not decode token', error)
      }
    }
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
}
