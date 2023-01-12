import { TestBed } from '@angular/core/testing';

import { ExamApiService } from './exam-api.service';

describe('ExamApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ExamApiService = TestBed.get(ExamApiService);
    expect(service).toBeTruthy();
  });
});
