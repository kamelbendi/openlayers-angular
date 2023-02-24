import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = "hyperview-app";
  constructor(private titleService: Title, private router: Router) {
    //this.title = 'hyperview-app';
  }
  ngOnInit() {
    //this.title = 'hyperview-app';
    /* this.titleService.setTitle("hyperview-app"); */
  }
}
