import { Component, Input, } from '@angular/core';
import { Assignment } from '../models/gradebook.models';
import { GradebookEventsService } from '../gradebook-events.service';

@Component({
    selector: 'gb-assignment',
    templateUrl: './assignment.component.html',
    styleUrls: ['./assignment.component.css']
})
export class AssignmentComponent {
    @Input() assignment: Assignment;

    constructor(private _events: GradebookEventsService) { }

    openEditDialog() {
        this._events.newEditingAssignment(this.assignment);
    }
}
