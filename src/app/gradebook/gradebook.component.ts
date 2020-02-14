import { Component } from '@angular/core';
import { GradebookService } from './gradebook.service';
import { Gradebook } from './models/gradebook.models';
 
@Component({
  selector: 'gb-gradebook',
  styleUrls: ['./gradebook.component.css'],
  templateUrl: './gradebook.component.html',
  providers: [GradebookService]
})
export class GradebookComponent {
  data: Gradebook;

  constructor(private _gb: GradebookService) {
    _gb.data.subscribe(gradebookData => {
      this.data = gradebookData;
      document.querySelector(':root').style.setProperty('--grades-columns', this.data.assignments?.length);
      document.querySelector(':root').style.setProperty('--grades-rows', this.data.students?.length);
    });
  }
}
