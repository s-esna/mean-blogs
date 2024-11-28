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
        console.log('You have admin privileges')

        return true; 

      } else {
        // You are not an admin
        
        router.navigateByUrl('/404');
        return false;
      }
    } catch (err) {
      console.log('invalid token')

      console.error('Invalid token:', err);
      router.navigateByUrl('/users/login');
      return false;
    }
  } else {
    console.log('no token')
    // No token present
    router.navigateByUrl('/users/login');
    return false;
  }
};



