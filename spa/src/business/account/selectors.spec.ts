import { ApplicationState } from "../state";
import { mockObject } from "../../util/mockObject";
import { Account } from "./model";
import { computeBalance } from "./selectors";
import { accountFixtures } from "./fixtures";
import { Operation, operationFixtures } from "./operation";

describe("Test of computeBalance selector", () => {
  it("should add amounts of all operations", () => {
    const account0: Account = {
      ...accountFixtures.account0,
      id: "accountId0"
    };

    const operation0: Operation = {
      ...operationFixtures.operation0,
      accountId: "accountId0"
    };

    const operation1: Operation = {
      ...operationFixtures.operation1,
      accountId: "accountId0"
    };

    const operation2: Operation = {
      ...operationFixtures.operation2,
      accountId: "anotherAccountId"
    };

    // GIVEN
    const state = mockObject<ApplicationState>({
      account: {
        [account0.id]: account0
      },
      operation: {
        [operation0.id]: operation0,
        [operation1.id]: operation1,
        [operation2.id]: operation2
      }
    });

    // WHEN
    const actual: number = computeBalance(state, account0.id);

    // THEN
    const expected: number = operation0.amount + operation1.amount;
    expect(actual).toEqual(expected);
  });
});
