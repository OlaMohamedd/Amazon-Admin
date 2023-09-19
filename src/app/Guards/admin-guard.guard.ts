import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LoginAuthService } from '../Services/login-auth.service';

export const adminGuardGuard: CanActivateFn = (route, state) => {
  const adminService = inject(LoginAuthService)
  const router = inject(Router)
  if(adminService.isAdminLoggedIn()){
    return true
  }else{
    alert('please login first')
    router.navigate(['/login'])
    return false
  }
};
