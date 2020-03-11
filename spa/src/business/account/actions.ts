import { Account } from "./model";
import { CollectionAction } from "redux-generic";
import { accountDomain } from "./domain";
import { operationActionCreators, OperationAction } from "./operation/actions";

export type AccountAction = CollectionAction<Account> | OperationAction;

export const accountActionCreators = {
  ...accountDomain.actionCreators,
  operation: operationActionCreators
};
