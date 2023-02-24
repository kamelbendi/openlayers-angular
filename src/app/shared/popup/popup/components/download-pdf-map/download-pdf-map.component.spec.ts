/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { DownloadPdfMapComponent } from './download-pdf-map.component';
import {
  MatDialog,
  MatDialogModule,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { PdfService } from 'src/app/shared/services/pdf.service';
import { FormsModule } from '@angular/forms';
import { MatFormField } from '@angular/material/form-field';
import { MatSelect, MatSelectModule } from '@angular/material/select';

describe('DownloadPdfMapComponent', () => {
  let component: DownloadPdfMapComponent;
  let fixture: ComponentFixture<DownloadPdfMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DownloadPdfMapComponent, MatFormField, MatSelect],
      providers: [
        PdfService,
        {
          provide: MatDialogRef,
          useValue: {},
        },
        {
          provide: MAT_DIALOG_DATA,
          useValue: [],
        },
      ],
      imports: [MatDialogModule, HttpClientTestingModule, MatSelectModule],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(async () => {
    fixture = TestBed.createComponent(DownloadPdfMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
