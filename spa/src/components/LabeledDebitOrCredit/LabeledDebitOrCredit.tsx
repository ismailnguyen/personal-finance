import React from "react";
import { DebitOrCredit } from "../DebitOrCredit";
import "./LabeledDebitOrCredit.scss";

export interface Props {
  amount: number;
  renderLabel(): React.ReactElement;
}

export const LabeledDebitOrCredit: React.FunctionComponent<Props> = ({ amount, renderLabel }: Props) => {
  return (
    <div className="labeled-debit-or-credit">
      <div className="label-container">{renderLabel()}</div>
      <div className="amount-container">
        <DebitOrCredit amount={amount} />
      </div>
    </div>
  );
};
