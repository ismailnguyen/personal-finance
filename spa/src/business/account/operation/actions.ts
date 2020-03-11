import { Operation } from "./model";
import { CollectionAction } from "redux-generic";
import { operationDomain } from "./domain";

export type OperationAction = CollectionAction<Operation>;

export const operationActionCreators = {
  ...operationDomain.actionCreators
};
