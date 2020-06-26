/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CrossedAreaService } from './crossed-area.service';

describe('Service: CrossedArea', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CrossedAreaService]
    });
  });

  it('should ...', inject([CrossedAreaService], (service: CrossedAreaService) => {
    expect(service).toBeTruthy();
  }));
});
