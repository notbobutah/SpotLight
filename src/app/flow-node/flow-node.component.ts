import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { NodeModel, ConnectorModel, Connector, IDragEnterEventArgs } from '@syncfusion/ej2-angular-diagrams';
import { Droppable, Draggable,  DropEventArgs  } from '@syncfusion/ej2-base';
import { RestApiService } from '../shared/rest-api'

@Component({
  selector: 'app-flow-node',
  templateUrl: './flow-node.component.html',
  styleUrls: ['./flow-node.component.css']
})
export class FlowNodeComponent implements OnInit {
    title = 'NodeModel';
    diagramcanvas: HTMLElement;
    public nodes: NodeModel[] = [];
    public connectors: ConnectorModel[] = [];
    @Input() nodeDetails: NodeModel;
    @Input() connDetails: ConnectorModel;
  
    constructor (public restApi: RestApiService ){}
  
    ngOnInit(){
      this.loadNodeModels();
      this.loadConnectionModels();
    }
    @ViewChild('diagram')element: any;

    ngAfterViewInit() {
      this.diagramcanvas = document.getElementById('diagram')
      console.log("create droppable event")
      console.log(this.diagramcanvas)
        let droppable: Droppable = new Droppable( this.diagramcanvas, {
            drop: (e: DropEventArgs) => {
              console.log("inside droppable event")
                e.droppedElement.querySelector('.drag').textContent = 'Dropped';
            }
        });
    }
    public dragEnter(args: IDragEnterEventArgs): void {
      console.log("DragEnter for component");
      // let obj: NodeModel = args.element as NodeModel;
      // if (obj instanceof Node) {
      //   let oWidth: number = obj.width;
      //   let oHeight: number = obj.height;
      //   let ratio: number = 100 / obj.width;
      //   obj.width = 100;
      //   obj.height *= ratio;
      //   obj.offsetX += (obj.width - oWidth) / 2;
      //   obj.offsetY += (obj.height - oHeight) / 2;
      //   obj.style = { fill: '#357BD2', strokeColor: 'white' };
      // }
    }
  
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

          addnodeDetails(datanodeDetails) {
            this.restApi.createNodeModel(this.nodeDetails).subscribe((data: {}) => {
            })
          }

          loadNodeModel() {
            return this.restApi.getNodeModel(this.nodeDetails.id).subscribe((data: NodeModel) => {
               this.nodeDetails = data;
            })
          }

          loadNodeModels() {
            return this.restApi.getNodeModels().subscribe((data) => {
               this.nodes = data 
            })
          }

          deletenodeDetails(id) {
              this.restApi.deleteNodeModel(this.nodeDetails.id).subscribe(data => {
                this.loadNodeModel()
              })
          }  

          updatenodeDetails() {
              this.restApi.updateNodeModel(this.nodeDetails.id, this.nodeDetails).subscribe(data => {
              })
          }
          addConnectionDetails(datanodeDetails) {
            this.restApi.createConnectionModel(this.nodeDetails).subscribe((data: {}) => {
            })
          }

          loadConnectionModel() {
            return this.restApi.getConnectionModel(this.nodeDetails.id).subscribe((data: ConnectorModel) => {
               this.connDetails = data;
            })
          }

          loadConnectionModels() {
            return this.restApi.getConnectionModels().subscribe((data) => {
               this.connectors = data 
            })
          }

          deleteConnectionDetails(id) {
              this.restApi.deleteNodeModel(this.nodeDetails.id).subscribe(data => {
                this.loadNodeModel()
              })
          }  

          updateConnectionDetails() {
              this.restApi.updateNodeModel(this.nodeDetails.id, this.nodeDetails).subscribe(data => {
              })
          }
}
