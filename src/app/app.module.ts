import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GradebookModule } from './gradebook/gradebook.module';
 
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent 
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    GradebookModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
