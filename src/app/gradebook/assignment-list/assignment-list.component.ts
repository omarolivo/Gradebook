import { Component, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { Assignment } from '../models/gradebook.models';
import { GradebookStoreService } from '../gradebook-store.service';

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
  template: `<gb-assignment *ngFor="let assignment of _store.assignments$ | async; let j = index, trackBy: trackAssignmentBy"
                            [assignment]="assignment"></gb-assignment>`
})
export class AssignmentsListComponent {
    constructor(public _store: GradebookStoreService) {}

    ngOnInit(): void {}

    trackAssignmentBy = (index, assignment: Assignment) => assignment.id;
}
