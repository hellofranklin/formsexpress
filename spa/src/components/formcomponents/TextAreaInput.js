import React from "react";
import FormElement from "./FormElement";

class TextAreaInput extends FormElement {
  renderInput() {
    return (
      <div className="textareainput-component">
        <textarea readOnly={true}></textarea>
      </div>
    );
  }
}

export default TextAreaInput;
