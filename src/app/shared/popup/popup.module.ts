import {
  CUSTOM_ELEMENTS_SCHEMA,
  NgModule,
  NO_ERRORS_SCHEMA,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatDialog,
  MatDialogModule,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { PdfService } from '../services/pdf.service';
import { PopupComponent } from './popup/popup.component';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from 'src/app/in-memory-data.service';
import { AddCollaboratorComponent } from './popup/components/add-collaborator/add-collaborator.component';
import { CollaboratorsListComponent } from './popup/components/collaborators-list/collaborators-list.component';
import { DownloadPdfMapComponent } from './popup/components/download-pdf-map/download-pdf-map.component';
import { MatListModule } from '@angular/material/list';

@NgModule({
  declarations: [
    PopupComponent,
    AddCollaboratorComponent,
    CollaboratorsListComponent,
    DownloadPdfMapComponent,
  ],
  entryComponents: [ MatDialog ],
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatSelectModule,
    MatFormFieldModule,
    FormsModule,
    MatListModule,
    BrowserModule,
    HttpClientModule,

    // The HttpClientInMemoryWebApiModule module intercepts HTTP requests
    // and returns simulated server responses.
    // Remove it when a real server is ready to receive requests.
    HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, {
      dataEncapsulation: false,
    }),
  ],
  exports: [
    PopupComponent,
    MatDialogModule,
    MatButtonModule,
    MatSelectModule,
    MatFormFieldModule,
  ],
  providers: [
    PdfService,
    
    { 
    provide: MatDialogRef,
    useValue: []
     }, 
    { 
    provide: MAT_DIALOG_DATA, 
    useValue: [] 
    }
    ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
})
export class PopupModule {}
