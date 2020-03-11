import { Reducer } from "redux";
import { CollectionAction } from "redux-generic";
import { Account } from "./model";
import { accountDomain } from "./domain";
import { AccountState } from "./state";

export const accountReducer: Reducer<AccountState, CollectionAction<Account>> = accountDomain.reducer;
