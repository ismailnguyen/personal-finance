import { Reducer } from "redux";
import { OperationState, defaultState } from "./state";
import { OperationAction } from "./actions";
import { Operation } from "./model";
import { operationSelectors } from "./selectors";

export const operationReducer: Reducer<OperationState, OperationAction> = (
  state: OperationState = defaultState,
  action: OperationAction
) => {
  switch (action.type) {
    case "ACTIONS_FETCHED":
      return setOperations(state, action.operations);

    case "OPERATION_ADDED":
      return addOperation(state, action.operation);

    case "OPERATION_DELETED":
      return deleteOperation(state, action.operationId);

    default:
      return state;
  }
};

function setOperations(state: OperationState, operations: Operation[]): OperationState {
  return {
    ...state,
    operations
  };
}

function addOperation(state: OperationState, operation: Operation): OperationState {
  const balance = operationSelectors.computeBalance(state);

  if (balance + operation.amount >= 0) {
    return {
      ...state,
      operations: [...state.operations, operation]
    };
  }

  return state;
}

function deleteOperation(state: OperationState, operationId: string): OperationState {
  const operations: Operation[] = [...state.operations];
  const index: number = operations.findIndex(({ id }: Operation) => id === operationId);
  if (index === -1) {
    return state;
  }
  operations.splice(index, 1);
  return {
    ...state,
    operations
  };
}
