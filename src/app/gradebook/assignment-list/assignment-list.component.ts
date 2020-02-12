

import {Component, Input,   ChangeDetectionStrategy, ViewEncapsulation, OnInit, OnChanges, SimpleChanges} from '@angular/core';
import { Assignment } from '../models/gradebook.models';

@Component({
	selector: 'gb-assignment-list',
	encapsulation: ViewEncapsulation.Emulated,

	styles: [`
      table {
        table-layout: fixed;
          width: 0px;
      }
        td.assignment {
          width: 70px;
          height: 166px;
          border: 1px solid #ddd;

          overflow: hidden;
          vertical-align: bottom;
          font-weight: normal;
          text-align: left;

          border-bottom: 4px solid;
      }
        .max-score-badge {
          display: inline-block;
          width: 45px;
          font-size: 12px;
          font-weight: 700;
          line-height: 1;
          color: #fff;
          text-align: center;
          white-space: nowrap;
          vertical-align: middle;
          background-color: #1d80b8;
          border-radius: 3px ;
          padding: 4px 6px 4px;
          line-height: 10px;
          margin-bottom: 4px;
          margin-left:4px;
      }

      .vertical-text {
        text-align: center;
        vertical-align: middle;
        width: 60px;
        margin: 0;
        padding: 0;
        padding-right: 3px;
        padding-top: 10px;
        margin-bottom: 10px;
      cursor: pointer;
        white-space: nowrap;
        margin-left: 0px;
        transform: rotate(-90deg);
      }
      .assignment {
          position:relative;

      }

	`],
	template: `
    <table>
      <tbody>
        <tr>
        <td class="assignment"  *ngFor="let assignment of assignments; let j = index, trackBy: trackAssignmentBy"
            [style.borderBottomColor]="assignment.category?.color"   >
            <div class="vertical-text" >
              <div [attr.title]="assignment.name" >
                {{assignment.name}}
                <br />
                {{assignment.category?.name}}
                <br />{{assignment.points}}Pts
                <small  *ngIf="assignment.isExtraCredit"> (E.C)</small>
              </div>
            </div>
            <div class="max-score-badge" title="Maximum possible score">
              {{assignment.maxScore}}
            </div>

          </td>
        </tr>
      </tbody>
    </table>
	`
})
export class AssignmentsListComponent  implements OnInit, OnChanges {


    @Input()  assignments: Assignment[];

    constructor() {
      console.log(this.assignments);
    }

    ngOnChanges(changes: SimpleChanges): void {
      console.log(this.assignments);

    }

    ngOnInit(): void {
        console.log(this.assignments);
    }


		trackAssignmentBy = (index, assignment: Assignment) => assignment.id;
}
