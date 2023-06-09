import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestblockComponent } from './testblock.component';

describe('TestblockComponent', () => {
  let component: TestblockComponent;
  let fixture: ComponentFixture<TestblockComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestblockComponent]
    });
    fixture = TestBed.createComponent(TestblockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
