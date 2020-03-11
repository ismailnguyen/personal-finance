import { BalanceComponent, OwnProps, StateProps } from "./Balance";
import { connect } from "react-redux";
import { ApplicationState } from "../../business/state";
import business from "../../business";

function mapStateToProps(state: ApplicationState, { accountId }: OwnProps): StateProps {
  const balance: number = business.computeBalance(state, accountId);
  return { amount: balance };
}

export const Balance = connect<StateProps, {}, OwnProps, ApplicationState>(mapStateToProps, {})(BalanceComponent);
