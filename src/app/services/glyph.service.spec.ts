import { TestBed } from '@angular/core/testing';

import { GlyphService } from './glyph.service';

describe('GlyphService', () => {
  let service: GlyphService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GlyphService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
