import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import * as jwt_decode from 'jwt-decode'; 

export const loginAuthGuard: CanActivateFn = (route, state) => {
  const token = localStorage.getItem("token")
  const router = inject(Router)

  if (token) {
      try {
      const decodedToken: any = jwt_decode.jwtDecode(token); // Decode the token to access payload
      const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
      console.log("expiration date of token: " +decodedToken.exp)
      console.log("id of user token: " +decodedToken.id)
      console.log("admin status of token: " +decodedToken.isAdmin)
      if (decodedToken.exp && decodedToken.exp >= currentTime) {
        console.log('valid token')

        return true; // Token is valid

      } else {
        // Token expired
        alert("Your session has expired, please sign in again")

        localStorage.removeItem('token'); // Clear expired token
        router.navigateByUrl('/users/login');
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


  
