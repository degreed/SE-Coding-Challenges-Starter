import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { initializeStore } from './store/movies.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  constructor(
    private store: Store
  ) {
    this.store.dispatch(initializeStore());
  }

  public pageTitle = 'Movies';
}
