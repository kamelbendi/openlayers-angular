import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/compiler';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import {
  MatDialog,
  MatDialogModule,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { AddCollaboratorComponent } from './components/add-collaborator/add-collaborator.component';
import { CollaboratorsListComponent } from './components/collaborators-list/collaborators-list.component';
import { DownloadPdfMapComponent } from './components/download-pdf-map/download-pdf-map.component';

import { PopupComponent } from './popup.component';

describe('PopupComponent', () => {
  let component: PopupComponent;
  let fixture: ComponentFixture<PopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        PopupComponent,
        AddCollaboratorComponent,
        CollaboratorsListComponent,
        DownloadPdfMapComponent,
      ],
      providers: [{
        provide: MatDialogRef,
        useValue: {}
      },
      { 
        provide: MAT_DIALOG_DATA, 
        useValue: [] 
        }],
      imports: [MatDialogModule, FormsModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(PopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
