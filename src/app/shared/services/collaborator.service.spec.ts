import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { CollaboratorService } from './collaborator.service';

describe('CollaboratorService', () => {
  let service: CollaboratorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      
    });
    service = TestBed.inject(CollaboratorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
