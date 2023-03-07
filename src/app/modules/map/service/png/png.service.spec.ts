/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PngService } from './png.service';

describe('Service: Png', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PngService]
    });
  });

  it('should ...', inject([PngService], (service: PngService) => {
    expect(service).toBeTruthy();
  }));
});
