import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RedirectService {
  redirect;
  constructor(private router: Router) {}
  Redirect() {
    if (this.redirect) {
      // console.debug(this.redirect);
      this.router.navigate([this.redirect]);
    }
  }
}
