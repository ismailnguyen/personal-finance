import { ApplicationComponent, OwnProps, StateProps } from "./Application";
import { connect } from "react-redux";
import { ApplicationState } from "../../business/state";
import business from "../../business";

function mapStateToProps(state: ApplicationState): StateProps {
  return {
    accounts: business.getAllAccounts(state)
  };
}

export const Application = connect<StateProps, {}, OwnProps, ApplicationState>(
  mapStateToProps,
  {}
)(ApplicationComponent);
