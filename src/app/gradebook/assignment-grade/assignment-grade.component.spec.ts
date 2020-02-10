import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignmentGradeComponent } from './assignment-grade.component';

describe('AssignmentGradeComponent', () => {
  let component: AssignmentGradeComponent;
  let fixture: ComponentFixture<AssignmentGradeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignmentGradeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignmentGradeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
