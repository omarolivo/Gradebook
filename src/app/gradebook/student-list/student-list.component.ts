import { Component, Input, EventEmitter, Output, ChangeDetectionStrategy, SimpleChanges } from '@angular/core';
import { Student } from '../models/gradebook.models';
import { GradebookStoreService } from '../gradebook-store.service';

@Component({
    selector: 'gb-students-list',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styles: [`
        .student-list {
            display: grid;
            grid-auto-flow: row;
            padding: 2px;
        }`],
    template: `<gb-student
                    *ngFor="let student of _store.students$ | async; let i = index, trackBy: trackBy"
                    [student]="student"
                    [showLastNameFirst]="showLastNameFirst"
                    (selected)="studentSelectedFn($event)"></gb-student>`
})
export class StudentsListComponent {
    @Input() showLastNameFirst: boolean;
    @Output() studentSelected = new EventEmitter<Student>();
    
    constructor(public _store: GradebookStoreService) {}
    
	studentSelectedFn(student) {
		this.studentSelected.emit(student);
	}

    trackBy = (index, student: Student) => student.userId;

    ngOnChanges(changes: SimpleChanges): void {

    }
}
