import React from "react";
import { Operation as IOperation } from "../../business/account/operation/model";
import { FinanceDate } from "../FinanceDate";
import { LabeledDebitOrCredit } from "../LabeledDebitOrCredit";
import { OperationActions } from "../OperationActions/OperationActions";
import "./Operation.scss";

export interface OwnProps {
  id: string;
}

export interface StateProps {
  operation: IOperation;
}

export interface DispatchProps {
  deleteOperation(): void;
}

export type Props = OwnProps & StateProps & DispatchProps;

export const OperationComponent: React.FunctionComponent<Props> = ({
  operation: { date, amount },
  deleteOperation
}) => (
  <div className="operation" data-e2e="account-operation">
    <LabeledDebitOrCredit amount={amount} renderLabel={() => <FinanceDate date={date} />} />
    <div className="actions-container">
      <div className="actions-content">
        <OperationActions onDelete={deleteOperation} />
      </div>
    </div>
  </div>
);
