import { Component, Input } from '@angular/core';
import { AssignmentGrade } from '../models/gradebook.models';

@Component({
  selector: 'gb-assignment-grades',
  templateUrl: './assignment-grades.component.html',
  styleUrls: ['./assignment-grades.component.css']
})
export class AssignmentGradesComponent {
  @Input() grades: AssignmentGrade[];
  @Input() rowLength: number;

  constructor() { }
}
