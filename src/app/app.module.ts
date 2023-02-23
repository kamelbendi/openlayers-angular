import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeModule } from './modules/home/home.module';
import { MapModule } from './modules/map/map.module';
import { ContactModule } from './modules/contact/contact.module';
//import { LayoutModule } from './modules/layout/layout.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PopupModule } from './shared/popup/popup.module';
import { HeaderComponent } from './modules/layout/components/header/header.component';
import { FooterComponent } from './modules/layout/components/footer/footer.component';

@NgModule({
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  declarations: [AppComponent, HeaderComponent, FooterComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PopupModule,
    HomeModule,
    MapModule,
    ContactModule,

    BrowserAnimationsModule,
  ],
  bootstrap: [AppComponent],

})
export class AppModule {}
