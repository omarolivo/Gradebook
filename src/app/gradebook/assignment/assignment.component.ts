import { Component, Input, } from '@angular/core';
import { Assignment } from '../models/gradebook.models';

@Component({
  selector: 'gb-assignment',
  templateUrl: './assignment.component.html',
  styleUrls: ['./assignment.component.css']
})
export class AssignmentComponent {
  @Input() assignment: Assignment;

  constructor() { }
}
