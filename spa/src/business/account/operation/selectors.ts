import { Operation } from "./model";
import { ApplicationState } from "../../state";

export const operationSelectors = {
  getAllOperations,
  getOperation,
  computeBalance
};

export function getAllOperations({ operation: state }: ApplicationState): Operation[] {
  return Object.keys(state).map((key: string) => state[key]);
}

export function getOperation({ operation: state }: ApplicationState, id: string): Operation {
  const operation: Operation | undefined = state[id];
  if (operation === undefined) {
    throw new Error(`No operation matches the following id: ${id}`);
  }
  return operation;
}

export function computeBalance(state: ApplicationState): number {
  return getAllOperations(state)
    .map(extractAmount)
    .reduce(sum, 0);
}

function extractAmount({ amount }: Operation): number {
  return amount;
}

function sum(accumulated: number, current: number): number {
  return accumulated + current;
}