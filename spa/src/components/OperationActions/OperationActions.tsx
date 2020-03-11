import React from "react";
import "./OperationActions.scss";

export interface Props {
  onDelete(): void;
}

export const OperationActions: React.FunctionComponent<Props> = ({ onDelete }: Props) => (
  <div className="actions">
    <button
      className="delete mdl-button mdl-js-button mdl-button--icon"
      onClick={onDelete}
      data-e2e="account-operation-delete"
    >
      <i className="material-icons">delete</i>
    </button>
  </div>
);
