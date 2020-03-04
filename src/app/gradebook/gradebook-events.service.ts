import { Injectable } from '@angular/core';
import { Assignment, AssignmentGrade } from './models/gradebook.models';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class GradebookEventsService {
    private editingAssignment = new BehaviorSubject<Assignment>(null);
    public readonly editingAssignment$ = this.editingAssignment.asObservable();
    private editingGrade = new BehaviorSubject<AssignmentGrade>(null);
    public readonly editingGrade$ = this.editingGrade.asObservable();

    constructor() { }

    newEditingAssignment(assignment: Assignment) {
        this.editingAssignment.next(assignment);
    }
    newEditingGrade(grade: AssignmentGrade) {
        this.editingGrade.next(grade);
    }
}
