import { Component } from '@angular/core';
import { GradebookStoreService } from '../gradebook-store.service';

@Component({
    selector: 'gb-assignment-grades',
    templateUrl: './assignment-grades.component.html',
    styleUrls: ['./assignment-grades.component.css']
})
export class AssignmentGradesComponent {
    constructor(public _store: GradebookStoreService) {}
}
