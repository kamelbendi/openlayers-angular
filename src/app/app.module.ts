import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeModule } from './modules/home/home.module';
import { MapModule } from './modules/map/map.module';
import { ContactModule } from './modules/contact/contact.module';
import { LayoutModule } from './modules/layout/layout.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PopupModule } from './shared/popup/popup.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PopupModule,
    HomeModule,
    MapModule,
    ContactModule,
    LayoutModule,
    BrowserAnimationsModule,
    //AngularOpenlayersModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
