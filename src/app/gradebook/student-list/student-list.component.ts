import { Component, Input, EventEmitter, Output, ChangeDetectionStrategy, SimpleChanges } from '@angular/core';
import { Student } from '../models/gradebook.models';

@Component({
  selector: 'gb-students-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [`

			td {
				height: 40px;
				border: 1px solid #ddd;
				text-overflow: ellipsis;
				white-space: nowrap;
				vertical-align: middle;
			}
			tr td:first-child {
				width: 170px;
			}
			tr td:first-child div {
				cursor: pointer;
				display: inline-block;
				padding-left:5px;
			}
			tr td:last-child   {
				width: 60px;
				text-align: center;
			}
  `],
  template: `
  <table >
  <tbody>
    <tr *ngFor="let student of students; let i = index, trackBy: trackBy">
      <td>
			<div (click)="studentSelected.emit(student)"> {{i+1}}.
				<ng-container *ngIf="showLastNameFirst">
					{{ student.lastName }}, {{student.firstName}}
				</ng-container>
				<ng-container *ngIf="!showLastNameFirst">
					{{ student.firstName }} {{student.lastName}}
				</ng-container>
			</div>
      </td>
      <td>
          {{student.termGrade?.percent | percent:'1.1-2'}}
	  </td>

    </tr>
  </tbody>
</table>
  `
})
export class StudentsListComponent {

  @Input() students: Student[];
  @Input() showLastNameFirst: boolean;
  @Output() studentSelected = new EventEmitter<Student>();

  trackBy = (index, student: Student) => student.userId;

  ngOnChanges(changes: SimpleChanges): void {

  }


}
