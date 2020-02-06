import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GradebookComponent } from './gradebook/gradebook.component';
import { GradebookModule } from './gradebook/gradebook.module';
 
@NgModule({
  declarations: [
    AppComponent 
  ],
  imports: [
    BrowserModule,
    GradebookModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
