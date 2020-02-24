import { BrowserModule } from '@angular/platform-browser';
import { DiagramModule } from '@syncfusion/ej2-angular-diagrams';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
 
import { AppComponent } from './app.component';
import { FlowNodeComponent } from './flow-node/flow-node.component';
 
/**
 * Module
 */
@NgModule({
  imports: [
      BrowserModule, DiagramModule, HttpClientModule
  ],
  declarations: [
    AppComponent, 
    FlowNodeComponent ],
  bootstrap: [AppComponent],
  providers: [ ],
})
 
export class AppModule { }
 