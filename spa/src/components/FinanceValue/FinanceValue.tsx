import React from "react";

export interface Props {
  amount: number;
}

export const FinanceValue: React.FunctionComponent<Props> = ({ amount }: Props) => {
  const amountText: string = (amount > 0 ? "+" : "") + amount.toString();
  return <span className="value">{amountText}</span>;
};
