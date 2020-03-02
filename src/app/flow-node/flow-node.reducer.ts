import { Action, createReducer, on } from '@ngrx/store';
import * as FlowNodeActions from './flow-node.action';
import FlowNode from './flow-node.model';
import FlowNodeState, { initializeState } from './flow-node.state';

export const intialState = initializeState();

const reducer = createReducer(
  intialState,
  on(FlowNodeActions.GetFlowNodeAction, state => state),
  on(FlowNodeActions.CreateFlowNodeAction, (state: FlowNodeState, FlowNode: FlowNode) => {
    return { ...state, FlowNodes: [...state.flownodes, FlowNode], FlowNodeError: null };
  }),
  on(FlowNodeActions.SuccessGetFlowNodeAction, (state: FlowNodeState, { payload }) => {
    return { ...state, FlowNodes: payload };
  }),
  on(FlowNodeActions.SuccessCreateFlowNodeAction, (state: FlowNodeState, { payload }) => {
    return { ...state, FlowNodes: [...state.flownodes, payload], FlowNodeError: null };
  }),
  on(FlowNodeActions.ErrorFlowNodeAction, (state: FlowNodeState, error: Error) => {
    console.log(error);
    return { ...state, FlowNodeError: error };
  })
);

export default function FlowNodeReducer(state: FlowNodeState | undefined, action: Action) {
  return reducer(state, action);
}