import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/compiler';
import {
  MatDialog,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { CollaboratorService } from 'src/app/shared/services/collaborator.service';

import { CollaboratorsListComponent } from './collaborators-list.component';
import { FormsModule } from '@angular/forms';

describe('CollaboratorsListComponent', () => {
  let component: CollaboratorsListComponent;
  let fixture: ComponentFixture<CollaboratorsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CollaboratorsListComponent],
      providers: [
        MatDialog,
        CollaboratorService,
        {
          provide: MatDialogRef,
          useValue: {},
        },
      ],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [MatDialogModule, HttpClientTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(CollaboratorsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
