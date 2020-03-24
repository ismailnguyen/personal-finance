import { OperationState } from "./state";
import { OperationAction, operationActionCreators } from "./actions";
import { Operation } from "./model";
import { operationFixtures } from "./fixtures";
import { operationReducer } from "./reducer";

const { operation0, operation1, operation2 } = operationFixtures;

describe("Operation reducer", () => {
  it("ACTIONS_FETCHED", () => {
    // GIVEN
    const state: OperationState = {
      operations: []
    };
    const operations: Operation[] = [operation0, operation1, operation2];
    const action: OperationAction = operationActionCreators.createOperationsFetchedAction(operations);

    // WHEN
    const actual: OperationState = operationReducer(state, action);

    // THEN
    const expected: OperationState = {
      operations: [operation0, operation1, operation2]
    };
    expect(actual).toEqual(expected);
  });

  it("OPERATION_ADDED", () => {
    // GIVEN
    const state: OperationState = {
      operations: [operation0, operation1, operation2]
    };
    const operation: Operation = operationFixtures.anotherOperation;
    const action: OperationAction = operationActionCreators.createOperationAddedAction(operation);

    // WHEN
    const actual: OperationState = operationReducer(state, action);

    // THEN
    const expected: OperationState = {
      operations: [operation0, operation1, operation2, operation]
    };
    expect(actual).toEqual(expected);
  });

  it("OPERATION_ADDED don't add into balance when under zero", () => {
    // GIVEN
    const state: OperationState = {
      operations: [operation0, operation1, operation1]
    };
    const operation: Operation = operation1;
    const action: OperationAction = operationActionCreators.createOperationAddedAction(operation);

    // WHEN
    const actual: OperationState = operationReducer(state, action);

    // THEN
    const expected: OperationState = {
      operations: [operation0, operation1, operation1]
    };
    expect(actual).toEqual(expected);
  });

  it("OPERATION_DELETED", () => {
    // GIVEN
    const state: OperationState = {
      operations: [operation0, operation1, operation2]
    };
    const operationId: string = operation1.id;
    const action: OperationAction = operationActionCreators.createOperationDeletedAction(operationId);

    // WHEN
    const actual: OperationState = operationReducer(state, action);

    // THEN
    const expected: OperationState = {
      operations: [operation0, operation2]
    };
    expect(actual).toEqual(expected);
  });

  it("Other action", () => {
    // GIVEN
    const state: OperationState = {
      operations: [operation0, operation1, operation2]
    };
    const action = ({ type: "ANOTHER_ACTION" } as unknown) as OperationAction;

    // WHEN
    const actual: OperationState = operationReducer(state, action);

    // THEN
    const expected: OperationState = {
      operations: [operation0, operation1, operation2]
    };
    expect(actual).toEqual(expected);
  });
});
