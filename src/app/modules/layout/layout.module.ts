import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { AppRoutingModule } from 'src/app/app-routing.module';

@NgModule({
  declarations: [HeaderComponent, FooterComponent],
  imports: [AppRoutingModule, CommonModule, MatIconModule],
  exports: [HeaderComponent, FooterComponent],
})
export class LayoutModule {}
