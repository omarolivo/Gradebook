import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GradebookRoutingModule } from './gradebook-routing.module';
import { GradebookComponent } from './gradebook.component';
import { StudentComponent } from './student/student.component';
import { AssignmentComponent } from './assignment/assignment.component';
import { AssignmentGradeComponent } from './assignment-grade/assignment-grade.component';
import { AssignmentGradesComponent } from './assignment-grades/assignment-grades.component';
import { AssignmentsListComponent } from './assignment-list/assignment-list.component';
import { StudentsListComponent } from './student-list/student-list.component';


@NgModule({
  declarations: [
    GradebookComponent,
    StudentComponent,
    AssignmentComponent,
    AssignmentGradeComponent,
    AssignmentGradesComponent,

    StudentsListComponent,
    AssignmentsListComponent,
  ],
  imports: [
    CommonModule,
    GradebookRoutingModule
  ],
  exports: [
    GradebookComponent
  ]
})
export class GradebookModule { }
