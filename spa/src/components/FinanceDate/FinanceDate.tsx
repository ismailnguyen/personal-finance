import React from "react";

export interface Props {
  date: Date;
}

export const FinanceDate: React.FunctionComponent<Props> = ({ date }: Props) => {
  const year: number = date.getFullYear();
  const month: number = date.getMonth() + 1;
  const day: number = date.getDate();
  return <span className="date">{`${year}-${month}-${day}`}</span>;
};
