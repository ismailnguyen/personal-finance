import { Reducer } from "redux";
import { CollectionAction } from "redux-generic";
import { Operation } from "./model";
import { operationDomain } from "./domain";
import { OperationState } from "./state";

export const operationReducer: Reducer<OperationState, CollectionAction<Operation>> = operationDomain.reducer;
