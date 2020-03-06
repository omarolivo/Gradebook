import { Component, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { GradebookStoreService } from './gradebook-store.service';
import { GradebookEventsService } from './gradebook-events.service';
import { AssignmentEditDialogComponent } from './assignment-edit-dialog/assignment-edit-dialog.component';
import { Assignment } from './models/gradebook.models';
 
@Component({
    selector: 'gb-gradebook',
    styleUrls: ['./gradebook.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './gradebook.component.html'
})
export class GradebookComponent {
    @ViewChild(AssignmentEditDialogComponent, { static: true }) assignmentEditingDialog: AssignmentEditDialogComponent;

    constructor(private _store: GradebookStoreService, private _events: GradebookEventsService) {
        _store.loadGradebook();
        _events.editingAssignment$.subscribe((assignment) => {
            if (assignment) {
                for (const property in _store.assignmentFormGroup.controls) {
                    _store.assignmentFormGroup.get(property).setValue(assignment[property]);
                }
                this.assignmentEditingDialog.open(assignment);
            }
        });
    }

    assignmentDelete(assignment: Assignment) {
        this._store.deleteAssignment(assignment);
    }
}
