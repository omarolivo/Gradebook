import { Component, Input, OnChanges } from '@angular/core';
import { AssignmentGrade } from '../models/gradebook.models';

@Component({
  selector: 'gb-assignment-grades',
  templateUrl: './assignment-grades.component.html',
  styleUrls: ['./assignment-grades.component.css']
})
export class AssignmentGradesComponent implements OnChanges {
  @Input() grades: AssignmentGrade[];
  @Input() rowLength: number;

  ngOnChanges(): void {
    document.querySelector('div').style.setProperty('--colVar', this.rowLength?.toString() || '0');
  }

  constructor() { }
}
