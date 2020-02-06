import { Component, OnInit, OnDestroy } from '@angular/core';
 
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';

@Component({
  selector: 'gb-gradebook',
  templateUrl: './gradebook.component.html'
})
export class GradebookComponent implements OnInit ,OnDestroy {
 
  private _subscriptions: Subscription = new Subscription();


  constructor(private _http: HttpClient) {
   
  }
  
  ngOnInit() {
    // 
    let sub  = this._http.get('http://localhost:4300/assets/data/gradebook.json')
          		.subscribe(data  => console.log(data));

    this._subscriptions.add(sub);
  }
 
  ngOnDestroy(): void {
    this._subscriptions.unsubscribe();
  }

}
