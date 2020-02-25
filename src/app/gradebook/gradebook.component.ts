import { Component } from '@angular/core';
import { GradebookService } from './gradebook.service';
import { Gradebook, Assignment, AssignmentGrade, Student, Category } from './models/gradebook.models';
 
@Component({
  selector: 'gb-gradebook',
  styleUrls: ['./gradebook.component.css'],
  templateUrl: './gradebook.component.html',
  providers: [GradebookService]
})
export class GradebookComponent {
  data: Gradebook;

  private rootElement;
  setCSSvar(property, newValue) {
    this.rootElement.style.setProperty(property, newValue);
  }

  sortGrades(grades: AssignmentGrade[], assignments: Assignment[], students: Student[]): AssignmentGrade[] {
    const newGrades = [];
    for(const student of students) {
      for(const assignment of assignments) {
        newGrades.push(grades.find(g => g.userId === student.userId && g.assignmentId === assignment.id))
      }
    }
    return newGrades;
  }

  sortAssignments(assignments: Assignment[], categories: Category[]) {
    const newAssignments = [];
    for (const assignment of assignments) {
      newAssignments.push({
        ...assignment,
        category: {...categories.find(c => c.id === assignment.categoryId)}
      });
    }
    return newAssignments;
  }

  ngOnInit() {
    this.rootElement = document.querySelector(':root');

    this._gb.data.subscribe((gradebookData: Gradebook) => {
      if (gradebookData) {
        this.data = {
          ...gradebookData,
          assignments: this.sortAssignments(gradebookData.assignments, gradebookData.categories),
          grades: this.sortGrades(gradebookData.grades, gradebookData.assignments, gradebookData.students)
        };
        this.setCSSvar('--grades-columns', this.data.assignments.length);
        this.setCSSvar('--grades-rows', this.data.students.length);
      } else {
        this.data = gradebookData;
      }
    });
  }

  constructor(private _gb: GradebookService) { }
}
