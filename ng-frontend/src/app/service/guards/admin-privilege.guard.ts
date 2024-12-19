import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

export const adminPrivilegeGuard: CanActivateFn = (route, state) => {
  const token = localStorage.getItem("token")
  const router = inject(Router)

  if (token) {
      try {
      const decodedToken: any = jwtDecode(token); // Decode the token to access payload

      if (decodedToken.isAdmin) {
        return true; 
      } else {
        // You are not an admin
        
        router.navigateByUrl('/404');
        return false;
      }
    } catch (err) {
      console.error('Invalid token:', err);
      router.navigateByUrl('/users/login');
      return false;
    }
  } else {
    // No token present
    router.navigateByUrl('/users/login');
    return false;
  }
};



