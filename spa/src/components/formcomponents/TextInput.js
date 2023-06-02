import React from "react";
import FormElement from "./FormElement";

class TextInput extends FormElement {

  renderInput() {
    return (
      <div className="textinput-component">
        <input type="text" value="Answer" disabled />
      </div>
    );
  }
}

export default TextInput;
