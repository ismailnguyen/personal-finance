import { operationFixtures } from "./fixtures";
import { operationSelectors } from "./selectors";
import { Operation } from "./model";
import { ApplicationState } from "../../state";
import { mockObject } from "../../../util/mockObject";

describe("Test of getOperation selector", () => {
  const { operation0, operation1, operation2 } = operationFixtures;

  it("should return the operation corresponding to the id", () => {
    // GIVEN
    const state = mockObject<ApplicationState>({
      operation: {
        [operation0.id]: operationFixtures.operation0,
        [operation1.id]: operationFixtures.operation1,
        [operation2.id]: operationFixtures.operation2
      }
    });
    const operationId: string = operation1.id;

    // WHEN
    const actual: Operation = operationSelectors.getOperation(state, operationId);

    // THEN
    const expected: Operation = operation1;
    expect(actual).toEqual(expected);
  });

  it("should throw an exception in case no operation exists that corresponds to the given id", () => {
    // GIVEN
    const state = mockObject<ApplicationState>({
      operation: {
        [operation0.id]: operation0,
        [operation1.id]: operation1,
        [operation2.id]: operation2
      }
    });
    const operationId: string = "Another id";

    // WHEN THEN
    expect(() => operationSelectors.getOperation(state, operationId)).toThrowError(
      "No operation matches the following id: Another id"
    );
  });
});

describe("Test of getAccountOperations()", () => {
  it("should return all operations related to the given account", () => {
    const operation0: Operation = {
      ...operationFixtures.operation0,
      accountId: "accountId0"
    };

    const operation1: Operation = {
      ...operationFixtures.operation1,
      accountId: "accountId1"
    };

    const operation2: Operation = {
      ...operationFixtures.operation2,
      accountId: "accountId1"
    };

    // GIVEN
    const state = mockObject<ApplicationState>({
      operation: {
        [operation0.id]: operation0,
        [operation1.id]: operation1,
        [operation2.id]: operation2
      }
    });

    // WHEN
    const actual: Operation[] = operationSelectors.getAccountOperations(state, "accountId1");

    // THEN
    const expected: Operation[] = [operation1, operation2];
    expect(actual).toEqual(expected);
  });
});
