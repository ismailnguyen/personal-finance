import { Account } from "./model";
import { operationSelectors, Operation } from "./operation";
import { ApplicationState } from "../state";

export const accountSelectors = {
  getAllAccounts,
  getAccount,
  computeBalance,
  ...operationSelectors
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

export function computeBalance(state: ApplicationState, accountId: string): number {
  return operationSelectors
    .getAccountOperations(state, accountId)
    .map(extractAmount)
    .reduce(sum, 0);
}

function extractAmount({ amount }: Operation): number {
  return amount;
}

function sum(accumulated: number, current: number): number {
  return accumulated + current;
}
