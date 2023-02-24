import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MapComponent } from './modules/map/map/map.component';
import { ContactComponent } from './modules/contact/component/contact/contact.component';
import { HomeComponent } from './modules/home/components/home/home.component';

export const ROUTER_LINKS = {
  home: 'home-page',
  map: 'map-page',
  contact: 'contact-page',
};
const routes: Routes = [
  { path: ROUTER_LINKS.home, component: HomeComponent, title: 'Home' },
  { path: ROUTER_LINKS.map, component: MapComponent, title: 'Map' },
  { path: ROUTER_LINKS.contact, component: ContactComponent, title: 'Contact' },
  { path: '', redirectTo: 'home-page', pathMatch: 'full' },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
