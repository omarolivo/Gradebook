import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignmentGradesComponent } from './assignment-grades.component';

describe('AssignmentGradesComponent', () => {
  let component: AssignmentGradesComponent;
  let fixture: ComponentFixture<AssignmentGradesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignmentGradesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignmentGradesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
