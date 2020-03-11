import React from "react";
import { Operation as IOperation } from "../../business/account/operation/model";
import { Operation } from "../Operation";

export interface OwnProps {
  accountId: string;
}

export interface StateProps {
  operations: IOperation[];
}

export type Props = OwnProps & StateProps;

export const OperationHistoryComponent: React.FunctionComponent<Props> = ({ operations }: Props) => {
  return (
    <div>
      {operations.map((operation: IOperation) => (
        <Operation key={operation.id} id={operation.id} />
      ))}
    </div>
  );
};
