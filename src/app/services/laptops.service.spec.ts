import { TestBed } from '@angular/core/testing';

import { LaptopsService } from './laptops.service';

describe('LaptopsService', () => {
  let service: LaptopsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LaptopsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
