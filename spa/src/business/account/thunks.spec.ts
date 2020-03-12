import { fetchAccounts, accountsFetched, addOperation, deleteOperation } from "./thunks";
import { Account } from "./model";
import { accountFixtures } from "./fixtures";
import { mockStore } from "../../util/mockStore";
import { Thunk, ExtraArgument } from "../definitions";
import { batchActions } from "redux-batched-actions";
import { applicationActionCreators } from "../actions";
import { ApplicationState } from "../state";
import { mockObject } from "../../util/mockObject";
import { operationFixtures } from "./operation/fixtures";
import { Operation } from "./operation";

const { account0, account1 } = accountFixtures;
const { operation0, operation1, operation2 } = operationFixtures;

describe("Test of fetchAccounts()", () => {
  it("should return a thunk that calls the API, then inserts the accounts and all their operations", async () => {
    // GIVEN
    const accountsFetched: Thunk = jest.fn().mockReturnValue({ type: "accountsFetched" });
    const operationsFetched: Thunk = jest.fn().mockReturnValue({ type: "operationsFetched" });
    const getAccounts = jest.fn().mockResolvedValue([
      { id: account0.id, operations: [operation0] },
      { id: account1.id, operations: [operation1, operation2] }
    ]);
    const extraArgument = mockObject<ExtraArgument>({
      thunkCreators: {
        accountsFetched,
        operationsFetched
      },
      api: {
        getAccounts
      }
    });
    const initialState = mockObject<ApplicationState>({});
    const store = mockStore(extraArgument, initialState);

    // WHEN
    const thunk: Thunk = fetchAccounts();
    await store.dispatch(thunk);

    // THEN
    expect(getAccounts).toHaveBeenCalled();
    expect(accountsFetched).toHaveBeenCalledWith([account0, account1]);
    expect(operationsFetched).toHaveBeenCalledWith([
      { ...operation0, accountId: account0.id },
      { ...operation1, accountId: account1.id },
      { ...operation2, accountId: account1.id }
    ]);
    const actualActions = store.getActions();
    const expectedActions = [{ type: "operationsFetched" }, { type: "accountsFetched" }];
    expect(actualActions).toEqual(expectedActions);
  });
});

describe("Test of accountsFetched()", () => {
  it("should return a thunk that dispatches a batch of FETCHED_ACCOUNT_ADDED actions, one per account", () => {
    // GIVEN
    const initialState = mockObject<ApplicationState>({});
    const store = mockStore({}, initialState);
    const accounts: Account[] = [account0, account1];

    // WHEN
    const thunk: Thunk = accountsFetched(accounts);
    store.dispatch(thunk);

    // THEN
    const actualActions = store.getActions();
    const expectedActions = [
      batchActions(
        [
          applicationActionCreators.account.createInsertAction(account0.id, account0, "FETCHED_ACCOUNT_ADDED"),
          applicationActionCreators.account.createInsertAction(account1.id, account1, "FETCHED_ACCOUNT_ADDED")
        ],
        "ALL_FETCHED_ACCOUNTS_ADDED"
      )
    ];
    expect(actualActions).toEqual(expectedActions);
  });
});

describe("Test of addOperation()", () => {
  it("should return a thunk that calls the API, then inserts the operation and updates the account", async () => {
    // GIVEN
    const addOperationApi = jest.fn().mockResolvedValue("OK");
    const extraArgument = mockObject<ExtraArgument>({
      api: {
        addOperation: addOperationApi
      }
    });
    const initialState = mockObject<ApplicationState>({});
    const store = mockStore(extraArgument, initialState);
    const operation: Operation = operation0;

    // WHEN
    const thunk: Thunk = addOperation(account0.id, operation);
    await store.dispatch(thunk);

    // THEN
    expect(addOperationApi).toHaveBeenCalled();
    const actualActions = store.getActions();
    const expectedActions = [
      applicationActionCreators.account.operation.createInsertAction(
        operation0.id,
        { ...operation0, accountId: account0.id },
        "OPERATION_ADDED"
      )
    ];
    expect(actualActions).toEqual(expectedActions);
  });
});

describe("Test of deleteOperation()", () => {
  it("should return a thunk that calls the API, then dispatches a OPERATION_DELETED action", async () => {
    // GIVEN
    const deleteOperationApi = jest.fn().mockResolvedValue("OK");
    const extraArgument = mockObject<ExtraArgument>({
      api: {
        deleteOperation: deleteOperationApi
      }
    });
    const initialState = mockObject<ApplicationState>({});
    const store = mockStore(extraArgument, initialState);
    const operationId: string = operation0.id;

    // WHEN
    const thunk: Thunk = deleteOperation(operationId);
    await store.dispatch(thunk);

    // THEN
    expect(deleteOperationApi).toHaveBeenCalled();
    const actualActions = store.getActions();
    const expectedActions = [
      applicationActionCreators.account.operation.createDeleteAction(operation0.id, "OPERATION_DELETED")
    ];
    expect(actualActions).toEqual(expectedActions);
  });
});
