import { OperationHistoryComponent, OwnProps, StateProps } from "./OperationHistory";
import { connect } from "react-redux";
import { ApplicationState } from "../../business/state";
import { Operation } from "../../business/account/operation";
import business from "../../business";

function mapStateToProps(state: ApplicationState, { accountId }: OwnProps): StateProps {
  const operations: Operation[] = business.getAccountOperations(state, accountId);
  return { operations };
}

export const OperationHistory = connect<StateProps, {}, OwnProps, ApplicationState>(
  mapStateToProps,
  {}
)(OperationHistoryComponent);
