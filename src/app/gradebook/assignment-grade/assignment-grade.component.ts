import { Component, Input } from '@angular/core';
import { AssignmentGrade } from '../models/gradebook.models';

@Component({
  selector: 'gb-assignment-grade',
  templateUrl: './assignment-grade.component.html',
  styleUrls: ['./assignment-grade.component.css']
})
export class AssignmentGradeComponent {
  @Input() grade: AssignmentGrade;

  constructor() { }
}
