import { Component, ViewChild } from '@angular/core';
import { GradebookStoreService } from '../gradebook-store.service';

@Component({
    selector: 'gb-assignment-grades',
    templateUrl: './assignment-grades.component.html',
    styleUrls: ['./assignment-grades.component.css']
})
export class AssignmentGradesComponent {
    constructor(public _store: GradebookStoreService) {
        const node = document.documentElement;
        this._store.assignments$.subscribe(assignments => {
            node.style.setProperty('--grades-columns', assignments.length.toString());
        });
        this._store.students$.subscribe(students => {
            node.style.setProperty('--grades-rows', students.length.toString());
        });
    }
}
