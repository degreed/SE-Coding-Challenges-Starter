import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DecadesComponent } from './navigation/decades/decades.component';
import { GoBackComponent } from './navigation/go-back/go-back.component';
import { GoDetailsComponent } from './navigation/go-details/go-details.component';
import { GoImdbComponent } from './navigation/go-imdb/go-imdb.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NavigationService } from './navigation/navigation.service';

const components = [DecadesComponent, GoBackComponent, GoDetailsComponent, GoImdbComponent, SidebarComponent];

@NgModule({
  declarations: [...components],
  exports: [...components],
  imports: [BrowserModule],
  providers: [NavigationService]
})
export class NavigationModule {}
