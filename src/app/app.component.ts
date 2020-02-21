import { Component } from '@angular/core';
import { NodeModel, ConnectorModel, Connector } from '@syncfusion/ej2-angular-diagrams';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'spotlight';
   public nodes: NodeModel[] = [
     { 
        //Define unique id for each shape
         id: 'Start', offsetY: 50, annotations: [{ content: 'Start' }], 
          //Define the shape type and flow shape
         shape: { type: 'Flow', shape: 'Terminator' } 
      },
      {
         id: 'Init', offsetY: 150, annotations: [{ content: 'var i = 0;' }],
          shape: { type: 'Flow', shape: 'Process' } 
       },
      {
          id: 'Condition', offsetY: 250, annotations: [{ content: 'i < 10?' }], shape: { type: 'Flow', shape: 'Decision' },
          
        },
        { id: 'Print', offsetY: 350, annotations: [{ content: 'print(\'Hello!!\');' }], shape: { type: 'Flow', shape: 'PreDefinedProcess' } },
        {
          id: 'Increment', offsetY: 450, annotations: [{ content: 'i++;' }], shape: { type: 'Flow', shape: 'Process' },
          
        },
        {
          id: 'End', offsetY: 550, annotations: [{ content: 'End' }], shape: { type: 'Flow', shape: 'Terminator' },
         
        },
    ];
        public connectors: ConnectorModel[] = [
          { 
              //Define unique ID for connectors
             id: 'connector1',
             //SourceID and targetID property is used to define the relationship between shapes
             sourceID: 'Start', targetID: 'Init' 
           },
         {
            id: 'connector3', sourceID: 'Condition', targetID: 'Print',
            annotations: [{ content: 'Yes' }]
          },
          {
            id: 'connector4', sourceID: 'Condition', targetID: 'End',  
            annotations: [{ content: 'No' }]
          },
          { id: 'connector5', sourceID: 'Print', targetID: 'Increment' },
          {
            id: 'connector6', sourceID: 'Increment', targetID: 'Condition',  
          }
        ];
        public nodeDefaults(obj: NodeModel) : NodeModel {
            let node: NodeModel = {};
            node.height = 50;
            node.width = 140;
            node.offsetX = 300;
            return node;
          } 
        public connDefaults(obj: Connector) : void {
            obj.type = 'Orthogonal';
            obj.targetDecorator = { shape: 'Arrow', width: 10, height: 10 };
          }
}
