import { Component } from '@angular/core';
import { GradebookService } from './gradebook.service';
import { Gradebook } from './models/gradebook.models';
 
@Component({
  selector: 'gb-gradebook',
  templateUrl: './gradebook.component.html',
  providers: [GradebookService]
})
export class GradebookComponent {
  data: Gradebook;

  constructor(private _gb: GradebookService) {
    _gb.data.subscribe(gradebookData => this.data = gradebookData);
  }
}
