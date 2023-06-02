import React from "react";
import FormElement from "./FormElement";

class CheckboxInput extends FormElement {
  componentDidMount() {
    const defaultState = { Type: "checkbox" };
    if (this.state.Options.length === 0) {
      defaultState["Options"] = ["", ""];
    }
    this.updateState(defaultState);
  }

  updateState = (updatedElements) => {
    this.setState((prevState) => ({
      ...prevState,
      ...updatedElements,
    }));
  };

  handleOptionChange = (event) => {
    const index = event.target.dataset.index;
    let options = this.state.Options;
    options[index] = event.target.value;
    this.handleChange({ Options: options });
  };

  addOption = () => {
    let options = this.state.Options;
    options[this.state.Options.length] = "";
    this.handleChange({ Options: options });
  };

  deleteOption = (event) => {
    const deletedIndex = event.target.dataset.index;
    let options = [...this.state.Options]; // create a copy of the array
    options.splice(deletedIndex, 1);
    this.handleChange({ Options: options });
  };

  renderInput() {
    const { Options } = this.state;
    return (
      <>
        <div className="option-container">
          {Options.map((option, index) => (
            <div key={index} className="option">
              <input type={"checkbox"} readOnly={true}></input>
              <input
                type="text"
                placeholder={`Option ${index + 1}`}
                value={Options[index]}
                data-index={index}
                onChange={this.handleOptionChange}
              />
              {Options.length > 2 && (
                <span
                  className="cross-btn"
                  data-index={index}
                  onClick={this.deleteOption}
                />
              )}
            </div>
          ))}

          {this.state.Options.length < 4 && (
            <div key={this.state.Options.length} className="option">
              <input type={"checkbox"} readOnly={true}></input>
              <input
                type="text"
                placeholder="Add Option"
                onFocus={this.addOption}
                readOnly={true}
              />
            </div>
          )}
        </div>
      </>
    );
  }
}

export default CheckboxInput;
