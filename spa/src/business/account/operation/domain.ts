import { Operation } from "./model";
import { CollectionDomain, createCollectionDomain } from "redux-generic";

export const operationDomain: CollectionDomain<Operation> = createCollectionDomain("OPERATION");
