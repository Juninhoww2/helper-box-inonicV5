import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';
import { LoginPage } from '../login/login.page';

@Injectable({
    providedIn: 'root',
})
export class AuthGuard implements CanActivate {

    constructor(
        private authService: AuthenticationService,
        private router: Router) {

    }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> |
        Promise<boolean | UrlTree> |
        boolean | UrlTree {

        if (this.authService.isLogged) {
            return true;
        }

        console.log('Access Denied !');
        this.router.navigateByUrl('/');
        return false;
    }
}
