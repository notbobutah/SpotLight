import { BrowserModule } from '@angular/platform-browser';
import { DiagramModule } from '@syncfusion/ej2-angular-diagrams';
import { NgModule } from '@angular/core';
 
import { AppComponent } from './app.component';
 
/**
 * Module
 */
@NgModule({
  imports: [
      BrowserModule, DiagramModule
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
  providers: [ ],
})
 
export class AppModule { }
 