import React from "react";
import { LabeledDebitOrCredit } from "../LabeledDebitOrCredit";
import "./Balance.scss";

export interface OwnProps {
  accountId: string;
}

export interface StateProps {
  amount: number;
}

type Props = OwnProps & StateProps;

export const BalanceComponent: React.FunctionComponent<Props> = ({ amount }: Props) => {
  return (
    <div className="balance" data-e2e="account-balance">
      <LabeledDebitOrCredit amount={amount} renderLabel={() => <span>Balance</span>} />
    </div>
  );
};
