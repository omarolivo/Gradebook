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
		grid-gap: 2px;
	}
	.student {
		display: grid;
		grid-template-columns: 170px 60px;
		grid-template-rows: 40px;
		grid-gap: 2px;
	}
	.student-name, .student-percent {
		overflow: hidden;
		border: 1px solid #ddd;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	.student-name {
		cursor: pointer;
		padding: 10px;
	}
	.student-percent {
		text-align: center;
	}`],
  template: `
  <div class="student-list">
    <div class="student"
				 *ngFor="let student of students; let i = index, trackBy: trackBy">
			<div class="student-name" (click)="studentSelected.emit(student)"> {{i+1}}.
				<ng-container *ngIf="showLastNameFirst">
					{{ student.lastName }}, {{student.firstName}}
				</ng-container>
				<ng-container *ngIf="!showLastNameFirst">
					{{ student.firstName }} {{student.lastName}}
				</ng-container>
			</div>
      <span class="student-percent">
				{{student.termGrade?.percent | percent:'1.1-2'}}
			</span>
    </div>
  </div>`
})
export class StudentsListComponent {
  @Input() students: Student[];
  @Input() showLastNameFirst: boolean;
  @Output() studentSelected = new EventEmitter<Student>();

  trackBy = (index, student: Student) => student.userId;

  ngOnChanges(changes: SimpleChanges): void {

  }
}
