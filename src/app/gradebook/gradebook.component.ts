import { Component } from '@angular/core';
import { GradebookService } from './gradebook.service';
import { GradebookStoreService } from './gradebook-store.service';
 
@Component({
  selector: 'gb-gradebook',
  styleUrls: ['./gradebook.component.css'],
  templateUrl: './gradebook.component.html',
  providers: [GradebookService]
})
export class GradebookComponent {
  constructor(private _store: GradebookStoreService) {
    _store.loadGradebook();
  }
}
