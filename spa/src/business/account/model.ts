import { RawOperation, SerializedRawOperation, deserializeRawOperations } from "./operation";

export interface Account {
  id: string;
}

export interface AccountWithRawOperations {
  id: string;
  operations: RawOperation[];
}

export interface SerializedAccountWithRawOperations {
  id: string;
  operations: SerializedRawOperation[];
}

export function deserializeAccounts(accounts: SerializedAccountWithRawOperations[]): AccountWithRawOperations[] {
  return accounts.map(deserializeSingleAccount);
}

export function deserializeSingleAccount(account: SerializedAccountWithRawOperations): AccountWithRawOperations {
  return {
    ...account,
    operations: deserializeRawOperations(account.operations)
  };
}
