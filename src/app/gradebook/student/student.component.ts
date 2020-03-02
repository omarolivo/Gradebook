import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Student } from '../models/gradebook.models';

@Component({
  selector: 'gb-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent {
  @Input() student: Student;
  @Input() showLastNameFirst: boolean;
  @Output() selected = new EventEmitter<Student>();

  selectedFn() {
    this.selected.emit(this.student);
  }

  constructor() { }
}
