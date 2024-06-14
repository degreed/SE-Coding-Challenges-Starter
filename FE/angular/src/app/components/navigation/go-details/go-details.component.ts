import { Component, Input } from '@angular/core';
import { NavigationService } from '../navigation.service';

@Component({
  selector: 'app-go-details',
  templateUrl: './go-details.component.html'
})
export class GoDetailsComponent {
  @Input() public imdbId: string;
  @Input() public movieName: string;

  constructor(private navigationService: NavigationService) {}

  public navigateTo(id: string) {
    this.navigationService.goTo('/movie', id);
  }
}
