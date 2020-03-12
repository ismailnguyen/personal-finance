import { fetchAccounts, addOperation, deleteOperation } from "./thunks";
import { getAllAccounts, getAccount, computeBalance } from "./selectors";
import { operationPublicApi } from "./operation";

export const accountPublicApi = {
  fetchAccounts,
  getAllAccounts,
  getAccount,
  computeBalance,
  addOperation,
  deleteOperation,
  ...operationPublicApi
};
