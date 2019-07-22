import React, { FunctionComponent } from "react";
import { Message } from "semantic-ui-react";

interface ErrorMessageProps {
  header: string,
  errorMsgs: string[]
}

const ErrorMessage: FunctionComponent<ErrorMessageProps> = ({ header, errorMsgs }) => (
  <Message error header={header} content={
    <ul>
      {errorMsgs.map((msg, i) => <li key={i.toString()}>{msg}</li>)}
    </ul>
  } />
);

export default ErrorMessage;