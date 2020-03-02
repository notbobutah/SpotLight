import { createAction, props } from '@ngrx/store';
import FlowNode from './flow-node.model';

export const GetFlowNodeAction = createAction('[FlowNode] - Get FlowNode');

export const CreateFlowNodeAction = createAction(
  '[FlowNode] - Create FlowNode',
  props<FlowNode>()
);

export const BeginGetFlowNodeAction = createAction('[FlowNode] - Begin Get FlowNode');

export const SuccessGetFlowNodeAction = createAction(
  '[FlowNode] - Success Get FlowNode',
  props<{ payload: FlowNode[] }>()
);

export const BeginCreateFlowNodeAction = createAction(
  '[FlowNode] - Begin Create FlowNode',
  props<{ payload: FlowNode }>()
);

export const SuccessCreateFlowNodeAction = createAction(
  '[FlowNode] - Success Create FlowNode',
  props<{ payload: FlowNode }>()
);

export const ErrorFlowNodeAction = createAction('[FlowNode] - Error', props<Error>());