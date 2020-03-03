import { Component, OnInit } from '@angular/core';
import { GradebookService } from './gradebook.service';
import { Gradebook, Assignment, AssignmentGrade, Student, Category, ScoreCode } from './models/gradebook.models';
import { GraderService } from './grader.service';
import { GradebookStoreService } from './gradebook-store.service';
 
@Component({
  selector: 'gb-gradebook',
  styleUrls: ['./gradebook.component.css'],
  templateUrl: './gradebook.component.html',
  providers: [GradebookService]
})
export class GradebookComponent implements OnInit {
  data: Gradebook;

  constructor(
    private _gb: GradebookService,
    private _gradebookStoreService: GradebookStoreService,
    private _grader: GraderService) {}

  setCSSvar(property, newValue) {
    document.documentElement.style.setProperty(property, newValue);
  }
  
  setGridSize(columns: number, rows: number) {
    this.setCSSvar('--grades-columns', columns);
    this.setCSSvar('--grades-rows', rows);
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
      const category = {...categories.find(c => c.id === assignment.categoryId)};
      newAssignments.push({...assignment, category: category});
    }
    return newAssignments;
  }

  calculateStudents(
    students: Student[], 
    categories: Category[],
    assignments: Assignment[],
    grades: AssignmentGrade[],
    scoreCodes: ScoreCode[]
  ) {
    const gradedStudents: Student[] = [];
    const allGradedAssignments = this._grader.computeGradesPoints(grades, assignments, scoreCodes);

    for (const student of students) {
      const gradedAssignments = allGradedAssignments.filter(ga => ga.userId === student.userId);
      const gradedCategories = this._grader.computeCategoriesPoints(categories, gradedAssignments);
      const termGrade = this._grader.computeOverallAverage(gradedCategories, true);
      gradedStudents.push({...student, termGrade: termGrade});
    }
    return gradedStudents;
  }

  ngOnInit() {

    
    this._gradebookStoreService.loadGradebook();

    //move GradebookService to gradebook store service
    this._gb.data.subscribe((gradebookData: Gradebook) => {
      if (gradebookData) {
        const students = this.calculateStudents(
          gradebookData.students,
          gradebookData.categories,
          gradebookData.assignments,
          gradebookData.grades,
          gradebookData.scoreCodes
        );
        const assignments = this.sortAssignments(gradebookData.assignments, gradebookData.categories);
        const grades = this.sortGrades(gradebookData.grades, gradebookData.assignments, gradebookData.students);
        
        this.data = {...gradebookData, students: students, assignments: assignments, grades: grades};

        this.setGridSize(this.data.assignments.length, this.data.students.length);
      } else {
        this.data = gradebookData;
      }
    });
  }
}
