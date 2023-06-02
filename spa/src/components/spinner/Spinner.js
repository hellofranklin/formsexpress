import React from "react";
import "./Spinner.css";

const Spinner = (props) => {
  const spinnerMsg =
    props.spinnerMsg === undefined ? "Loading data..." : props.spinnerMsg;

  return (
    <>
      <div className="spinner-overlay">
        <div className="msg">{spinnerMsg}</div>
      </div>
    </>
  );
};

export default Spinner;
