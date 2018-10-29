import { UserAccount } from './_shared/models/user-account.model';
import {
  BreakpointObserver,
  Breakpoints,
  BreakpointState
} from '@angular/cdk/layout';
import { Component } from '@angular/core';
import {
  trigger,
  transition,
  style,
  animate,
  query
} from '@angular/animations';
import { UserService } from './_shared/services/user.service';
import { tap } from 'rxjs/operators';
import { RedirectService } from './_shared/services/redirect.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'spa-voucher-web';
  stdLinks = [
    {
      path: '/shop',
      label: 'Buy Voucher',
      xslabel: 'Shop'
    },
    {
      path: '/search',
      label: 'Search Spa\'s',
      xslabel: 'Search'
    },
    {
      path: '/news',
      label: 'Latest News',
      xslabel: 'News'
    },
    {
      path: '/account',
      label: 'My Account',
      xsicon: 'account_circle'
    }
  ];
  adminLinks = [
    {
      path: '/dashboard',
      label: 'Dashboard',
      xsicon: 'settings'
    }
  ];
  navLinks;

  activeLink = null;
  acctime;
  screenSize;
  constructor(
    private breakpointObserver: BreakpointObserver,
    private userService: UserService,
    private redirectService: RedirectService
  ) {
    const watchSizes = [
      Breakpoints.XSmall,
      Breakpoints.Small,
      Breakpoints.Medium,
      Breakpoints.Large,
      Breakpoints.XLarge
    ];
    breakpointObserver.observe(watchSizes).subscribe(result => {
      if (result.breakpoints[Breakpoints.XSmall]) {
        this.screenSize = 'xs';
      }
      if (result.breakpoints[Breakpoints.Small]) {
        this.screenSize = 'sm';
      }
      if (result.breakpoints[Breakpoints.Medium]) {
        this.screenSize = 'md';
      }
      if (result.breakpoints[Breakpoints.Large]) {
        this.screenSize = 'lg';
      }
      if (result.breakpoints[Breakpoints.XLarge]) {
        this.screenSize = 'xl';
      }
    });
    this.navLinks = this.stdLinks;
    const watchUser = userService
      .getUser()
      .pipe(
        tap((user: UserAccount) => {
          if (user && user.isAdmin) {
            this.navLinks = [...this.stdLinks, ...this.adminLinks];
          } else {
            this.navLinks = this.stdLinks;
          }
        })
      )
      .subscribe();
  }
}
