import { TestBed } from '@angular/core/testing';

import { TerminalOrchestratorService } from './terminal-orchestrator.service';

describe('TerminalOrchestratorService', () => {
  let service: TerminalOrchestratorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TerminalOrchestratorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
