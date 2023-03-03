import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './modules/core/app.component';
import { AppRoutingModule, ROUTER_LINKS } from './app-routing.module';
import { HomeModule } from './modules/home/home.module';
import { MapModule } from './modules/map/map.module';
import { ContactModule } from './modules/contact/contact.module';
//import { LayoutModule } from './modules/layout/layout.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PopupModule } from './shared/popup/popup.module';
import { HttpClientModule } from '@angular/common/http';
import { LayoutModule } from './modules/layout/layout.module';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { MAP_STORE } from './reducers';
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { mapReducer } from './modules/map/reducers/map.reducers';

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
    MatDialogModule,
    HttpClientModule,
    MatButtonModule,
    StoreModule.forRoot({ game : mapReducer}),
    StoreDevtoolsModule.instrument({}),
  ],
  providers: [],

  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
