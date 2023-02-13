import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ROUTER_LINKS } from 'src/app/app-routing.module';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  ROUTER_LINKS = ROUTER_LINKS;
  constructor(private readonly router: Router) {}
}
