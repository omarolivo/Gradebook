import { Component, ViewChild, Output, EventEmitter } from '@angular/core';
import { Assignment } from '../models/gradebook.models';
import { GradebookStoreService } from '../gradebook-store.service';

@Component({
    selector: 'gb-assignment-edit-dialog',
    templateUrl: './assignment-edit-dialog.component.html',
    styleUrls: ['./assignment-edit-dialog.component.css']
})
export class AssignmentEditDialogComponent {
    @ViewChild('editdialog') dialog;
    @Output() onSave = new EventEmitter<Assignment>();
    @Output() onDelete = new EventEmitter<Assignment>();
    private currentAssignment: Assignment;

    constructor(public _store: GradebookStoreService) { }

    open(assignment: Assignment) {
        this.currentAssignment = assignment;
        this.dialog.show();
    }
    
    close() {
        this.dialog.hide();
        this.currentAssignment = null;
    }

    save() {
        this.onSave.emit(this.currentAssignment);
        this.close();
    }

    delete() {
        this.onDelete.emit(this.currentAssignment);
        this.close();
    }
}
