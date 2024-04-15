import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { BaseLink, Link } from '../../sidebar/sidebar.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-decades',
  templateUrl: './decades.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DecadesComponent implements OnInit, OnDestroy {
  @Input() public currDecade: number | undefined | null;
  @Input() public decades: number[];
  @Output() public updateDecade = new EventEmitter<number | undefined>();

  public currentUrl = '';
  public links: BaseLink[];
  private subscription: Subscription = new Subscription();

  constructor(private router: Router) {}

  public ngOnInit(): void {
    this.links = [
      {
        isActive: !this.currDecade,
        label: 'All'
      },
      ...this.decades.map((decade) => ({
        isActive: this.currDecade === decade,
        label: `${decade}'s`
      }))
    ];
    this.subscription.add(
      this.router.events
        .pipe(filter((event) => !!(event instanceof NavigationEnd)))
        .subscribe((event) => (this.currentUrl = (event as NavigationEnd).url))
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public passDecade({ index, label }: Link) {
    this.links = this.links.map((link) => ({ ...link, isActive: false }));
    this.links[index].isActive = true;
    const decade = label === 'All' ? undefined : parseInt(label.replace("'s", ''));
    this.updateDecade.emit(decade);
  }
}
