import { Component, Input } from '@angular/core';
import { Student } from '../models/gradebook.models';

@Component({
  selector: 'gb-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent {
  @Input() student: Student;

  constructor() { }
}
