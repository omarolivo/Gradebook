import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GradebookRoutingModule } from './gradebook-routing.module';
import { GradebookComponent } from './gradebook.component';
import { StudentComponent } from './student/student.component';
import { StudentsComponent } from './students/students.component';
import { AssignmentComponent } from './assignment/assignment.component';
import { AssignmentsComponent } from './assignments/assignments.component';


@NgModule({
  declarations: [
    GradebookComponent,
    StudentComponent,
    StudentsComponent,
    AssignmentComponent,
    AssignmentsComponent
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
