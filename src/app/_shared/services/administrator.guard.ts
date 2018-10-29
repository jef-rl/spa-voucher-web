import { RedirectService } from './redirect.service';
import { UserService } from './user.service';
import { Injectable } from '@angular/core';
import {
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanActivateChild,
  NavigationExtras,
  CanLoad,
  Route
} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AdministratorGuard
  implements CanActivate, CanActivateChild, CanLoad {
  constructor(
    private userService: UserService,
    private router: Router,
    private redirectService: RedirectService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const url: string = state.url;

    return this.checkLogin(url);
  }

  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    return this.canActivate(route, state);
  }

  canLoad(route: Route): boolean {
    const url = `/${route.path}`;

    return this.checkLogin(url);
  }

  checkLogin(url: string): boolean {
    if (this.userService.isAdministrator()) {
      return true;
    }
    this.redirectService.redirect = url;
    this.router.navigate(['/account']);
    return false;
  }
}
