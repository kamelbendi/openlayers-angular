import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
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

  it('should get co', () =>  {
    /* var result = service.getCollaborator(11)
    expect(result).toEqual(11) */
  });
});
