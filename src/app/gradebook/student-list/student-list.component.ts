import { Component, Input, EventEmitter, Output, ChangeDetectionStrategy, SimpleChanges } from '@angular/core';
import { Student } from '../models/gradebook.models';

@Component({
  selector: 'gb-students-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [`
	.student-list {
		display: grid;
		grid-auto-flow: row;
		padding: 2px;
	}`],
  template: `
  <div class="student-list">
    <gb-student
      *ngFor="let student of students; let i = index, trackBy: trackBy"
      [student]="student"
      [showLastNameFirst]="showLastNameFirst"
      (selected)="studentSelectedFn($event)"></gb-student>
  </div>`
})
export class StudentsListComponent {
  @Input() students: Student[];
  @Input() showLastNameFirst: boolean;
	@Output() studentSelected = new EventEmitter<Student>();
	
	studentSelectedFn(student) {
		this.studentSelected.emit(student);
	}

  trackBy = (index, student: Student) => student.userId;

  ngOnChanges(changes: SimpleChanges): void {

  }
}
