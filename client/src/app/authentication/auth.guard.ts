import { CanActivateChild, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  canActivate(route: ActivatedRouteSnapshot) {
    let userDetails = JSON.parse(localStorage.getItem('loginResponse'));
    let roles = route.data.roles;
    let currentRole;
    for (let index in roles) {
      if (userDetails && userDetails.role === roles[index]) {
        currentRole = roles[index];
      }
    }
    if (userDetails && userDetails.role === currentRole) {
      return true;
    } else {
      return false;
    }
  }

}
