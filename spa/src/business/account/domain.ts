import { Account } from "./model";
import { createCollectionDomain, CollectionDomain } from "redux-generic";

export const accountDomain: CollectionDomain<Account> = createCollectionDomain("ACCOUNT");
