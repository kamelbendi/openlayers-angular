import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ROUTER_LINKS } from 'src/app/app-routing.module';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { PopupComponent } from 'src/app/shared/popup/popup/popup.component';
import { products } from 'src/app/modules/home/components/mock/products';
import { information } from 'src/app/modules/home/components/mock/information';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  constructor(private readonly router: Router, public dialog: MatDialog) {}

  products: any = products;
  information = information;

  ngOnInit() {
    this.welcomePopUp();
  }

  welcomePopUp() {
    const dialogRef = this.dialog.open(PopupComponent, {
      width: '200px',
      height: '100px',
      data: { type: 'welcome' },
    });
  }
  
  goToMap(): void {
    this.router.navigate([ROUTER_LINKS.map]);
  }

}
