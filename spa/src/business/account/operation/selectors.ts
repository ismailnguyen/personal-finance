import { Operation } from "./model";
import { ApplicationState } from "../../state";

export const operationSelectors = {
  getOperation,
  getAccountOperations
};

export function getOperation({ operation: state }: ApplicationState, id: string): Operation {
  const operation: Operation | undefined = state[id];
  if (operation === undefined) {
    throw new Error(`No operation matches the following id: ${id}`);
  }
  return operation;
}

export function getAccountOperations(state: ApplicationState, accountId: string): Operation[] {
  return getAllOperations(state).filter(withAccountId(accountId));
}

function getAllOperations({ operation: state }: ApplicationState): Operation[] {
  return Object.keys(state).map((key: string) => state[key]);
}

function withAccountId(accountIdToMatch: string) {
  return function({ accountId }: Operation): boolean {
    return accountId === accountIdToMatch;
  };
}
