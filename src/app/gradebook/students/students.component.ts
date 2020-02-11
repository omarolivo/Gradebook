import { Component, Input } from '@angular/core';
import { Student } from '../models/gradebook.models';

@Component({
  selector: 'gb-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent {
  @Input() students: Student[];
  
  constructor() { }
}
