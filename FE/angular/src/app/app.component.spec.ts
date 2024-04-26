import { RouterTestingModule } from '@angular/router/testing';
import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';
import { AppComponent } from './app.component';
import { Store } from '@ngrx/store';

describe('AppComponent', () => {
  let spectator: Spectator<AppComponent>;
  let component: AppComponent;
  const createComponent = createComponentFactory({
    component: AppComponent,
    imports: [RouterTestingModule],
    providers: [{
      provide: Store,
      useValue: {
        pipe: () => {},
        dispatch: () => {},
        select: () => {},
      },
    }],
    shallow: true
  });

  beforeEach(() => {
    spectator = createComponent();
    component = spectator.component;
  });

  test('should create the app', () => {
    expect(component).toBeTruthy();
  });

  test('should set pageTitle', () => {
    expect(component.pageTitle).toBeTruthy();
  });
});
