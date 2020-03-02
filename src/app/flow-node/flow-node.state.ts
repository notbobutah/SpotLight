import  FlowNode  from "./flow-node.model";

export default class flownodestate  {
    flownodes: Array<FlowNode>;
    flError: Error;
}

export const initializeState = (): flownodestate => {
    return { flownodes: Array<FlowNode>(), flError: null }
}