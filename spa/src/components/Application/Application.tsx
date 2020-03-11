import * as React from "react";
import { Account as IAccount } from "../../business/account";
import { Account } from "../Account";

export interface OwnProps {}

export interface StateProps {
  accounts: IAccount[];
}

type Props = OwnProps & StateProps;

export const ApplicationComponent: React.FunctionComponent<Props> = ({ accounts }: Props) => {
  return (
    <div>
      {accounts.map(({ id }: IAccount) => (
        <Account key={id} accountId={id} />
      ))}
    </div>
  );
};
