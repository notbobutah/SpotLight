import { BrowserModule } from '@angular/platform-browser';
import { DiagramModule, SymbolPaletteModule } from '@syncfusion/ej2-angular-diagrams';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppPalletteComponent } from './flow-node/flow-pallette.component'

import { AppComponent } from './app.component';
import { FlowNodeComponent } from './flow-node/flow-node.component';
 
/**
 * Module
 */
@NgModule({
  imports: [
      BrowserModule, DiagramModule, HttpClientModule, SymbolPaletteModule
  ],
  declarations: [
    AppComponent, 
    FlowNodeComponent,
    AppPalletteComponent ],
  bootstrap: [AppComponent],
  providers: [ ],
})
 
export class AppModule { }
 