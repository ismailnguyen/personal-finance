import React from "react";
import { useState, useRef } from "react";
import { RawOperation } from "../../business/account/operation/model";
import { v4 as uuid } from "uuid";
import "./AddOperation.scss";

export interface OwnProps {
  accountId: string;
}

export interface DispatchProps {
  addOperation(operation: RawOperation): void;
}

type Props = OwnProps & DispatchProps;

export const AddOperationComponent: React.FunctionComponent<Props> = ({ addOperation }: Props) => {
  const [inputValue, setInputValue] = useState<string>("");

  const inputRef: React.RefObject<HTMLInputElement> = useRef(null);

  function resetInput(): void {
    setInputValue("");
  }

  function createOperation(amount: number): RawOperation {
    return {
      id: uuid(),
      date: new Date(),
      amount
    };
  }

  function onInputFocus(): void {
    if (inputRef.current) {
      inputRef.current.select();
    }
  }

  function onInputChange(event: React.ChangeEvent<HTMLInputElement>): void {
    setInputValue(event.target.value);
  }

  function onButtonClick(): void {
    const amount: number = parseFloat(inputValue);
    if (!isNaN(amount) && amount !== 0) {
      const operation: RawOperation = createOperation(amount);
      addOperation(operation);
      resetInput();
    }
  }

  return (
    <div className="add-operation">
      <input
        ref={inputRef}
        className="input-amount"
        type="number"
        value={inputValue}
        onFocus={onInputFocus}
        onChange={onInputChange}
        data-e2e="account-new-operation-input-amount"
      />
      <button
        onClick={onButtonClick}
        className="add-amount mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent"
        data-e2e="account-new-operation-add-amount"
      >
        Add
      </button>
    </div>
  );
};
