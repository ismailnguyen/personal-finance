import React from "react";
import { FinanceValue } from "../FinanceValue";
import "./DebitOrCredit.scss";

export interface Props {
  amount: number;
}

export const DebitOrCredit: React.FunctionComponent<Props> = ({ amount }: Props) => {
  return (
    <div className="debit-or-credit">
      <span className="credit">{amount >= 0 && <FinanceValue amount={amount} />}</span>
      <span className="debit">{amount < 0 && <FinanceValue amount={amount} />}</span>
    </div>
  );
};
