import { accountActionCreators, accountFixtures } from "../business/account";

const { account0 } = accountFixtures;

const AN_APPLICATION_WITH_A_SINGLE_ACCOUNT_AND_NO_OPERATION = [
  accountActionCreators.createInsertAction(account0.id, account0)
];

export const entryPoints = {
  AN_APPLICATION_WITH_A_SINGLE_ACCOUNT_AND_NO_OPERATION
};
