import {Component, Input,   ChangeDetectionStrategy, ViewEncapsulation, OnInit, OnChanges, SimpleChanges} from '@angular/core';
import { Assignment } from '../models/gradebook.models';

@Component({
	selector: 'gb-assignment-list',
	encapsulation: ViewEncapsulation.Emulated,
	styles: [`
  .assignment-list {
    display: grid;
    grid-template-rows: 1fr;
    grid-auto-flow: column;
    grid-auto-columns: 70px;
    grid-gap: 2px;
  }
  .assignment {
    display: grid;
    grid-template-rows: 1fr min-content;
    border: 1px solid #ddd;
    text-align: left;
    border-bottom: 4px solid;
  }
  .max-score-badge {
    width: 45px;
    font-size: 12px;
    font-weight: 700;
    color: #fff;
    text-align: center;
    background-color: #1d80b8;
    border-radius: 3px;
    line-height: 10px;
    margin-bottom: 4px;
    padding: 4px 6px 4px 6px;
    margin: 0 auto 3px auto;
  }
  .vertical-text {
    text-align: center;
    width: 60px;
    margin-bottom: 10px;
    cursor: pointer;
    white-space: nowrap;
    transform: rotate(-90deg);
    margin-top: 75px;
  }`],
	template: `
  <div class="assignment-list">
    <div class="assignment" 
        [style.borderBottomColor]="assignment.category?.color"
        *ngFor="let assignment of assignments; let j = index, trackBy: trackAssignmentBy">
      <div>
        <div class="vertical-text" [attr.title]="assignment.name" >
          {{assignment.name}}
          <br />
          {{assignment.category?.name}}
          <br />{{assignment.points}}Pts
          <small  *ngIf="assignment.isExtraCredit"> (E.C)</small>
        </div>
      </div>
      <div class="max-score-badge" title="Maximum possible score">
        {{assignment.maxScore}}
      </div>
    </div>
  </div>`
})
export class AssignmentsListComponent  implements OnInit, OnChanges {
  @Input()  assignments: Assignment[];

  constructor() {
    console.log(this.assignments);
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.assignments);

  }

  ngOnInit(): void {
      console.log(this.assignments);
  }

  trackAssignmentBy = (index, assignment: Assignment) => assignment.id;
}
