 
export interface Student {
    userId:               number;
    studentId: string;
    firstName:        string;
    lastName:         string;
    termGrade?: StudentTermGradeSummary;
    gradedCategories?: GradedCategory[];
}
export interface Section {
    id:         number;   
    title:      string;    
}

export interface Term {
    id:         number;   
    name:      string;    
}

export interface Gradebook {
 
    id:         number;   
    title:      string;
    settings: GeneralSettings;
    teacherId:  number;   
    categories: Category[];
    grades:     AssignmentGrade[];
    assignments: Assignment[];
    scoreCodes: ScoreCode[];

}

export interface Category {
    name:          string;
    sectionId:     number;
    weight:        number;
    defaultPoints: number;
    defaultScore:  number;
    color:         string;
    dateCreated:    Date | undefined ;
    dateModifed:     Date | undefined ;
    id:            number;
}

export interface AssignmentGrade {
    id:       number;
    assignmentId:   number;
    userId:   number;
    grade:    string;
    feedback: null | string;
}

export interface Assignment {
    id:            number;
    sectionId:     number;
    termId:        number;
    categoryId:    number;
    maxScore:      number;
    points:        number;
    name:          string;
    dateCreated:    undefined | Date;
    dateModified:   undefined| Date;
    dueDate:        undefined| Date;
    isExtraCredit: boolean;
    description:   string;   
    category?: Category| null;
 
}

export interface ScoreCode {
    id:          number;
    shortcut:    string;
    code:        string;
    description: string;
    percent:     number | null;
    exempt:      boolean;
    sectionId:   number;
}

export interface GradedAssignment{
    assignmentId: number;
    userId: number;
    categoryId: number;
    numericScore: number;
    percent:number;
    earnedPoints: number;
    possiblePoints: number;
    isExempt: boolean;
}

export interface GradedCategory {    
    id: number;
    name: string;
    weight: number;
    earnedPoints:number;
    possiblePoints: number;
    earnedWeight: number;
    totalAssignments :number;
    percent: number;                
 
}

export interface StudentTermGradeSummary {
    earnedWeight: number;
    maxWeight: number;
    earnedPoints: number;
    possiblePoints: number;
    percent: number;
    percentage: number;
    isWeighted: boolean;
    letterGrade: string;
}

export interface GeneralSettings {
    showCategorySummary : string;
    showTermsSummary: string;
    studentSortType:  string;
    assignmentSortType: string;
    isWeighted: boolean;
}