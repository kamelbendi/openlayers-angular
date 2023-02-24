import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { RouterModule } from '@angular/router';
import { PopupComponent } from 'src/app/shared/popup/popup/popup.component';

import { HomeComponent } from './home.component';
import { InformationComponent } from './information/information.component';
import { ProductComponent } from './product/product.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeComponent, ProductComponent, InformationComponent, PopupComponent ],
      imports: [MatDialogModule, RouterModule],
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
