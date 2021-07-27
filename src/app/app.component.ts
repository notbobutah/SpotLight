import { Component, OnInit, Input } from '@angular/core';
import { NodeModel, ConnectorModel, Connector } from '@syncfusion/ej2-angular-diagrams';
import { RestApiService } from './shared/rest-api'
import { AppPalletteComponent } from './flow-node/flow-pallette.component'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  {
  title = 'spotlight';
}
