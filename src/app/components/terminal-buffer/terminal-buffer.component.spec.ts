import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TerminalBufferComponent } from './terminal-buffer.component';

describe('TerminalBufferComponent', () => {
  let component: TerminalBufferComponent;
  let fixture: ComponentFixture<TerminalBufferComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TerminalBufferComponent]
    });
    fixture = TestBed.createComponent(TerminalBufferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
