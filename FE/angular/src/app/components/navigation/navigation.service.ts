import { Injectable, isDevMode } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  constructor(private router: Router) {}

  public goTo(...args: string[]): Promise<void> {
    return this.router.navigate(args).then((event: boolean) => {
      if (!event) {
        if (isDevMode()) {
          console.error('Navigation has failed');
        }
        throw new Error('Something went wrong!');
      }
    });
  }
}
