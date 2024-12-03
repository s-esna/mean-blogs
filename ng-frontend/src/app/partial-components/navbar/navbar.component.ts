import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  router = inject(Router)
  isAdmin = this.checkAdminStatus()
  isLoggedIn = this.checkLoggedStatus()


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
}
