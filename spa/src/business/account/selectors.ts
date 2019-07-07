import { Account } from "./model";
import { operationSelectors } from "./operation";
import { ApplicationState } from "../state";

export const accountSelectors = {
  getAllAccounts,
  getAccount,
  operation: operationSelectors
};

export function getAllAccounts({ account: state }: ApplicationState): Account[] {
  return Object.keys(state).map((key: string) => state[key]);
}

export function getAccount({ account: state }: ApplicationState, id: string): Account {
  const account: Account | undefined = state[id];
  if (account === undefined) {
    throw new Error(`No account matches the following id: ${id}`);
  }
  return account;
}
