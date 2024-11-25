import { TestBed } from '@angular/core/testing';

import { HoldBlogService } from './hold-blog.service';

describe('HoldBlogService', () => {
  let service: HoldBlogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HoldBlogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
