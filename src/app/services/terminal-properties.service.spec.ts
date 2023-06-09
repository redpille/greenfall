import { TestBed } from '@angular/core/testing';

import { TerminalPropertiesService } from './terminal-properties.service';

describe('TerminalPropertiesService', () => {
  let service: TerminalPropertiesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TerminalPropertiesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
