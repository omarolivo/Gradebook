import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Gradebook, Assignment } from './models/gradebook.models';

@Injectable({
    providedIn: 'root'
})
export class GradebookService {
    constructor(private _http: HttpClient) {}

    getGradbook(): Observable<Gradebook> {
        return this._http.get<Gradebook>('/assets/data/gradebook.json');
    }

    deleteAssignment(assignment: Assignment): Observable<boolean> {
        return of(true);
    }
}
