/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/compiler';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DownloadPdfMapComponent } from './download-pdf-map.component';
import {
  MatDialogModule,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { PopupComponent } from '../../popup.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { PdfService } from 'src/app/shared/services/pdf/pdf.service';

describe('DownloadPdfMapComponent', () => {
  let component: DownloadPdfMapComponent;
  let fixture: ComponentFixture<DownloadPdfMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DownloadPdfMapComponent, PopupComponent],
      providers: [
        PdfService,
        {
          provide: MatDialogRef,
          useValue: [],
        },
        {
          provide: MAT_DIALOG_DATA,
          useValue: [],
        },
      ],
      imports: [
        MatDialogModule,
        MatSelectModule,
        FormsModule,
        BrowserAnimationsModule,
        MatFormFieldModule,
      ],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DownloadPdfMapComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
});
