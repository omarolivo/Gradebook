import { Injectable } from '@angular/core';
import {
  AssignmentGrade, 
  Assignment, 
  ScoreCode, 
  GradedAssignment, 
  Category, 
  GradedCategory, 
  StudentTermGradeSummary } from './models/gradebook.models';
import { UtilsService } from '../utils.service';

@Injectable({ providedIn: "root" })
export class GraderService {
  constructor(private utils: UtilsService) {}

  /**
   * Compute the total possible and earned points for each grade entry.
   * @param {[]} gradeEntries - Ungraded grade entries
   */
  computeGradesPoints(gradeEntries: AssignmentGrade[],  assignments: Assignment[], scoreCodes: ScoreCode[] ): GradedAssignment[] {
    let gradedEntries = Array<GradedAssignment>();

    gradeEntries.forEach(gradeEntry => {
      const grade = gradeEntry.grade;
      const resultGrade = {
        assignmentId: gradeEntry.assignmentId,
        userId: gradeEntry.userId,
        categoryId: null,
        numericScore: null,
        percent: null,
        earnedPoints: null,
        possiblePoints: null,
        isExempt: false
      } as GradedAssignment;

      const assignment = assignments.find(assignment => assignment.id === gradeEntry.assignmentId);

      if (!assignment) return;

      //set the category to which this grade belongs to
      resultGrade.categoryId = assignment.categoryId;
 
      if (this.utils.isNumeric(grade)) {
        resultGrade.numericScore = parseFloat(grade);
      } else if (grade != undefined || grade != null) {
        const scoreCode = scoreCodes.find(sc => sc.code === grade);
    
        // NOTE: if teacher deleted the score code, DONT grade assignment
        if (scoreCode) {
        
        resultGrade.isExempt = scoreCode.exempt;
        if (!scoreCode.exempt) {
          resultGrade.numericScore = assignment.maxScore * scoreCode.percent * 0.01;
        }
      } else {
        resultGrade.isExempt = true;
      }
      } else {
        // DON'T grade assignment with no grades
        resultGrade.isExempt = true;
      }

    resultGrade.percent = resultGrade.numericScore / assignment.maxScore;
    resultGrade.earnedPoints = assignment.points * resultGrade.percent;

    //don't include  assignment in the total number of points
    if (!assignment.isExtraCredit) {
      resultGrade.possiblePoints = assignment.points;
    }
      gradedEntries.push(resultGrade);
    });

    return gradedEntries;
  }

  /**
   * Compute the total possible and earned points on each category.
   * @param {[]} gradedEntries - graded grades.
   */
  computeCategoriesPoints( categories: Category[], gradedEntries: GradedAssignment[] ) : GradedCategory[] {
    const gradedCategories = Array<GradedCategory>();

    // calculate the total possible points and earned points for each category
    categories.forEach(category => {
      const gradedCategory = <GradedCategory>{
        id: category.id,
        name: category.name,
        weight: category.weight,
        earnedPoints: 0,
        possiblePoints: 0,
        earnedWeight: 0,
        totalAssignments: 0,
        percent: null
      };

      gradedEntries
        .filter(g => g.isExempt === false && g.categoryId === category.id)
        .forEach(g => {
          gradedCategory.totalAssignments += 1;
          gradedCategory.earnedPoints += g.earnedPoints;
          gradedCategory.possiblePoints += g.possiblePoints;
        });

      if (gradedCategory.possiblePoints > 0) {
        let percentDecimal = gradedCategory.earnedPoints / gradedCategory.possiblePoints;
        gradedCategory.percent = percentDecimal;
        gradedCategory.earnedWeight = gradedCategory.weight * percentDecimal;
      }

      gradedCategories.push(gradedCategory);
    });

    return gradedCategories;
  }

  /**
   * Compute the total possible and earned points and weights
   * @param {[]} gradedCategories - graded categories.
   */
  computeOverallAverage(gradedCategories: GradedCategory[], isWeighted: boolean ) : StudentTermGradeSummary {
    const overallGrade: StudentTermGradeSummary = {
      earnedWeight: 0,
      maxWeight: 0,
      earnedPoints: 0,
      possiblePoints: 0,
      percent: 0,
      percentage: 0,
      isWeighted: isWeighted,
      letterGrade: ""
    };

    //exclude categories with no weights and no possible points
    const weightedCategories = gradedCategories.filter(c => c.weight > 0 && c.possiblePoints > 0);
    
    weightedCategories.forEach(category => {
      // sum the weights accumulated in all categories
      overallGrade.earnedWeight += category.earnedWeight;
      overallGrade.maxWeight += category.weight;

      // sum the points accumulated in all categories
      overallGrade.earnedPoints += category.earnedPoints;
      overallGrade.possiblePoints += category.possiblePoints;
    });

    if (overallGrade.possiblePoints > 0) {
      if (isWeighted) {
        overallGrade.percent = overallGrade.earnedWeight / overallGrade.maxWeight;
      } else {
        overallGrade.percent = overallGrade.earnedPoints / overallGrade.possiblePoints;
      }

      overallGrade.percentage = overallGrade.percent * 100;
    }

    return overallGrade;
  }
}