import { Injectable } from "@angular/core";
import { FormGroup, FormBuilder, FormArray, Validators } from "@angular/forms";
import { BehaviorSubject } from "rxjs";
import { Assignment, Student, Category, ScoreCode, AssignmentGrade, Gradebook } from "./models/gradebook.models";
import { GradebookService } from './gradebook.service';
import { GraderService } from './grader.service';

@Injectable({ providedIn: "root" })
export class GradebookStoreService {

	constructor(private _gb: GradebookService, private _grader: GraderService, private _fb: FormBuilder) { }

	private _gradebookForm = new BehaviorSubject(
		this._fb.group({
			assignment: this._fb.group({
				id: null,
				sectionId: null,
				termId: null,
				name: ["", [Validators.required, Validators.minLength(3)]],
				dueDate: ["", Validators.required],
				dateCreated: "",
				dateModified: "",
				categoryId: ["", Validators.required],
				maxScore: [
					100,
					Validators.compose([Validators.required, Validators.min(0)])
				],
				points: [
					10,
					Validators.compose([Validators.required, Validators.min(0)])
				],
				isExtraCredit: false
			})
		})
	);

	gradebookForm$ = this._gradebookForm.asObservable();
	
	public loadGradebook( ) {
		this._gb.getGradbook().subscribe((gb: Gradebook) => {
            this.updateStore(gb.students, gb.categories, gb.assignments, gb.grades, gb.scoreCodes);
        });
	}
	
	private updateStore(students: Student[], categories: Category[], assignments: Assignment[], gradeEntries: AssignmentGrade[], scoreCodes: ScoreCode[]){
        
        // assign category to all assignments
        assignments.forEach(assignment => {
            assignment.category = categories.find(a => a.id === assignment.categoryId );			 
        }); 
        
        this.assignments = assignments;
        this.students = this.calculateStudents(students, categories, assignments, gradeEntries, scoreCodes);
        this.categories = categories;
        this.scoreCodes = scoreCodes;
        this.gradeEntries = this.createGradeEntries(students, assignments, gradeEntries);
    }
    
    private calculateStudents(students: Student[], categories: Category[], assignments: Assignment[], gradeEntries: AssignmentGrade[], scoreCodes: ScoreCode[]) {
        const gradedStudents: Student[] = [];
        const allGradedAssignments = this._grader.computeGradesPoints(gradeEntries, assignments, scoreCodes);
  
        for (const student of students) {
            const gradedAssignments = allGradedAssignments.filter(ga => ga.userId === student.userId);
            const gradedCategories = this._grader.computeCategoriesPoints(categories, gradedAssignments);
            const termGrade = this._grader.computeOverallAverage(gradedCategories, true);
            gradedStudents.push({...student, termGrade: termGrade});
        }
        return gradedStudents;
    }  
	
	private createGradeEntries(students: Student[], assignments: Assignment[], grades:  AssignmentGrade[]) {
        const newAssignmentGrades = [...grades];
        students.forEach(student => {
            assignments.forEach(assignment => {
                let grade = this.getGradeEntry(student.userId, assignment.id);
                		
                // if no grade record exist, create a new grade entry 
                if(!grade) {
                    grade =  <AssignmentGrade>{ assignmentId: assignment.id, userId: student.userId, grade: ""};
                    newAssignmentGrades.push(grade);
                }                
            });
        });	 
        return newAssignmentGrades;
    }
	
	public getGradeEntry(userId: number, assignmentId: number): AssignmentGrade {       
        return this.gradeEntries.find(a => a.userId == userId && a.assignmentId == assignmentId);
    }


	private getGradebookFormGroup(formGroupName: string): FormGroup {
        return <FormGroup>this._gradebookForm.getValue().controls[formGroupName];
	}
	
	private readonly _students = new BehaviorSubject<Student[]>([]);
	public readonly students$ = this._students.asObservable() ;

    get students(): Student[] {
        return this._students.getValue();
    }
    set students(val: Student[]) {
        this._students.next(val);
    }
     
	private readonly _assignments = new BehaviorSubject<Assignment[]>([]);
	public readonly assignments$ = this._assignments.asObservable();

	get assignments(): Assignment[] {
		return this._assignments.getValue();
	}
	set assignments(val: Assignment[]) {
		this._assignments.next(val);
	}

	private readonly _categories = new BehaviorSubject<Category[]>([]);
    readonly categories$ = this._categories.asObservable();
 
    get categories(): Category[] {
        return this._categories.getValue();
    }
    set categories(val: Category[]) {
        this._categories.next(val);
    }

    private readonly _scoreCodes = new BehaviorSubject<ScoreCode[]>([]);
    readonly scoreCodes$ = this._scoreCodes.asObservable();
 
    get scoreCodes(): ScoreCode[] {
        return this._scoreCodes.getValue();
    }
    set scoreCodes(val: ScoreCode[]) {
        this._scoreCodes.next(val);
    }

    private readonly _gradeEntries = new BehaviorSubject<AssignmentGrade[]>([]);
    readonly gradeEntries$ = this._gradeEntries.asObservable();
 
    get gradeEntries() {
        return this._gradeEntries.getValue();
    }
    set gradeEntries(val: AssignmentGrade[]) {
        this._gradeEntries.next(val);
    }

	get assignmentFormGroup(): FormGroup {
        return this.getGradebookFormGroup("assignment");
    }
}
