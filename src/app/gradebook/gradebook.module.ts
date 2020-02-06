import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GradebookRoutingModule } from './gradebook-routing.module';
import { GradebookComponent } from './gradebook.component';


@NgModule({
  declarations: [GradebookComponent],
  imports: [
    CommonModule,
    GradebookRoutingModule
  ],
 
  exports: [
    GradebookComponent
  ]
})
export class GradebookModule { }
