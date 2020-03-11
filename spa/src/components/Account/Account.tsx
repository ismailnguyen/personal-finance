import React from "react";
import { OperationHistory } from "../OperationHistory";
import { Balance } from "../Balance";
import { AddOperation } from "../AddOperation";

export interface Props {
  accountId: string;
}

export const Account: React.FunctionComponent<Props> = ({ accountId }: Props) => {
  return (
    <div>
      <AddOperation accountId={accountId} />
      <OperationHistory accountId={accountId} />
      <Balance accountId={accountId} />
    </div>
  );
};
