import { Component, Input, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.css'],
})
export class InformationComponent {
  @Input() information: { title: string; description: string };
  //products = products;
  constructor() {
    this.information = { title: '', description: '' };
  }

  ngOnInit(): void {}
}
