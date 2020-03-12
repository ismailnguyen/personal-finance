import { Thunk, ExtendedDispatch } from "../definitions";
import { Account, AccountWithRawOperations } from "./model";
import { ApplicationState } from "../state";
import { BatchAction, batchActions } from "redux-batched-actions";
import { operationThunksCreators } from "./operation/thunks";
import { RawOperation, Operation } from "./operation";
import { applicationActionCreators } from "../actions";
import flatMap from "lodash.flatmap";

export type AccountApi = GetAccountsApi & AddOperationApi & DeleteOperationApi;

export const accountThunksCreators = {
  fetchAccounts,
  accountsFetched,
  addOperation,
  ...operationThunksCreators
};

interface GetAccountsApi {
  getAccounts(): Promise<AccountWithRawOperations[]>;
}

export function fetchAccounts(): Thunk {
  return async (
    dispatch: ExtendedDispatch,
    _: () => ApplicationState,
    { thunkCreators: { accountsFetched, operationsFetched }, api: { getAccounts } }
  ) => {
    const accountsWithOperations: AccountWithRawOperations[] = await getAccounts();

    const allAccountsOperations: Operation[] = flatMap(
      accountsWithOperations,
      ({ id, operations }: AccountWithRawOperations) => operations.map(enhanceOperationWithAccountId(id))
    );
    dispatch(operationsFetched(allAccountsOperations));

    const accounts: Account[] = accountsWithOperations.map(({ id }: AccountWithRawOperations) => ({ id }));
    dispatch(accountsFetched(accounts));
  };
}

function enhanceOperationWithAccountId(accountId: string) {
  return (rawOperation: RawOperation): Operation => {
    return {
      ...rawOperation,
      accountId
    };
  };
}

export function accountsFetched(accounts: Account[]): Thunk {
  return (dispatch: ExtendedDispatch, _: () => ApplicationState) => {
    const insertAccountActions = accounts.map((account: Account) => {
      return applicationActionCreators.account.createInsertAction(account.id, account, "FETCHED_ACCOUNT_ADDED");
    });

    const batchedAction: BatchAction = batchActions(insertAccountActions, "ALL_FETCHED_ACCOUNTS_ADDED");

    dispatch(batchedAction);
  };
}

interface AddOperationApi {
  addOperation(accountId: string, operation: RawOperation): Promise<void>;
}

export function addOperation(accountId: string, operation: RawOperation): Thunk {
  return async (dispatch: ExtendedDispatch, _getState: () => ApplicationState, { api: { addOperation } }) => {
    await addOperation(accountId, operation);

    const insertOperationAction = applicationActionCreators.account.operation.createInsertAction(
      operation.id,
      { ...operation, accountId },
      "OPERATION_ADDED"
    );

    dispatch(insertOperationAction);
  };
}

interface DeleteOperationApi {
  deleteOperation(id: string): Promise<void>;
}

export function deleteOperation(operationId: string): Thunk {
  return async (dispatch: ExtendedDispatch, _getState: () => ApplicationState, { api: { deleteOperation } }) => {
    await deleteOperation(operationId);

    const deleteOperationAction = applicationActionCreators.account.operation.createDeleteAction(
      operationId,
      "OPERATION_DELETED"
    );

    dispatch(deleteOperationAction);
  };
}
