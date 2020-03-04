import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Gradebook } from './models/gradebook.models';

@Injectable({
    providedIn: 'root'
})
export class GradebookService {
    constructor(private _http: HttpClient) {}

    getGradbook(): Observable<Gradebook> {
        return this._http.get<Gradebook>('/assets/data/gradebook.json');
    }
    
    // setGridSize(columns: number, rows: number) {
    //   node.style.setProperty('--grades-columns', columns);
    //   node.style.setProperty('--grades-rows', rows);
    // }
}
