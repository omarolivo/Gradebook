import {Component, Input,   ChangeDetectionStrategy, ViewEncapsulation, OnInit, OnChanges, SimpleChanges} from '@angular/core';
import { Assignment } from '../models/gradebook.models';

@Component({
	selector: 'gb-assignment-list',
	encapsulation: ViewEncapsulation.Emulated,
	styles: [`
  :host {
    display: grid;
    grid-template-rows: 1fr;
    grid-auto-flow: column;
    grid-auto-columns: 70px;
    margin-left: 2px;
    grid-gap: 2px;
  }`],
  template: `<gb-assignment *ngFor="let assignment of assignments; let j = index, trackBy: trackAssignmentBy"
                            [assignment]="assignment"></gb-assignment>`
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
