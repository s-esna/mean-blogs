import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const loginAuthGuard: CanActivateFn = (route, state) => {
  // const localUser = localStorage.getItem("user")
  // const router = inject(Router)
  // if (localUser) {
    return true;

  // } else {
  //   router.navigateByUrl("/login")
  //   return false
  // }
};
