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

  private rootElement;
  setCSSvar(property, newValue) {
    this.rootElement.style.setProperty(property, newValue);
  }

  ngOnInit() {
    this.rootElement = document.querySelector(':root');

    this._gb.data.subscribe(gradebookData => {
      this.data = gradebookData;
      this.setCSSvar('--grades-columns', this.data.assignments?.length);
      this.setCSSvar('--grades-rows', this.data.students?.length);
    });
  }

  constructor(private _gb: GradebookService) { }
}
