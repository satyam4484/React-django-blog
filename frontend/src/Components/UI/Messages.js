import { Fragment } from "react";

const Messages = (props) => {
  let error = "";
  if (props.error === "success") {
    error = (
      <div class="alert alert-dismissible alert-success text-center">
        <button
          type="button"
          class="btn-close"
          data-bs-dismiss="alert"
        ></button>
        <strong>Well done! </strong> {props.message}.
      </div>
    );
  }
  if (props.error === "danger") {
    error = (
      <div class="alert alert-dismissible alert-danger text-center">
        <button
          type="button"
          class="btn-close"
          data-bs-dismiss="alert"
        ></button>
        <strong>Oh snap!</strong>
        {props.message}
      </div>
    );
  }
  return <Fragment>{error}</Fragment>;
};

export default Messages;

