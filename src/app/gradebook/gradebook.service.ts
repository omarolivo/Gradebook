import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Gradebook } from './models/gradebook.models';

@Injectable({
  providedIn: 'root'
})
export class GradebookService {
  data = new BehaviorSubject<Gradebook>(null);

  constructor(private _http: HttpClient) {
    const subscription = this._http.get('/assets/data/gradebook.json')
    .subscribe(jsonData => {
      this.data.next(jsonData as Gradebook);
      subscription.unsubscribe();
    });
  }
}
