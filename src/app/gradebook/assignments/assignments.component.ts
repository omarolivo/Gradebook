import { Component, Input } from '@angular/core';
import { Assignment } from '../models/gradebook.models';

@Component({
  selector: 'gb-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.css']
})
export class AssignmentsComponent {
  @Input() assignments: Assignment[];

  constructor() { }
}
