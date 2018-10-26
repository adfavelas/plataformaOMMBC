import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GuidedLearningComponent } from './guided-learning.component';

describe('GuidedLearningComponent', () => {
  let component: GuidedLearningComponent;
  let fixture: ComponentFixture<GuidedLearningComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuidedLearningComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuidedLearningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
