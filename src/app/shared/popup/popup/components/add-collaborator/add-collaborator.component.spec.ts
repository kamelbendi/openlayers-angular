import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  MatDialog,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { InMemoryDataService } from 'src/app/in-memory-data.service';
import { CollaboratorService } from 'src/app/shared/services/collaborator.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { AddCollaboratorComponent } from './add-collaborator.component';
import { FormsModule } from '@angular/forms';

describe('AddCollaboratorComponent', () => {
  let component: AddCollaboratorComponent;
  let fixture: ComponentFixture<AddCollaboratorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddCollaboratorComponent],
      providers: [
        InMemoryDataService,
        CollaboratorService,
        MatDialog,
        {
          provide: MatDialogRef,
          useValue: {},
        },
        InMemoryDataService,
      ],
      imports: [MatDialogModule, HttpClientTestingModule, FormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(AddCollaboratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
