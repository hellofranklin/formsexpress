import React from "react";
import FormElement from "./FormElement";

class SelectInput extends FormElement {
  componentDidMount() {
    const defaultState = { Type: "select" };
    if (this.state.Options.length == 0) {
      defaultState["Options"] = ["", ""];
      defaultState["Placeholder"] = "Select an Option";
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

  renderOptionContainer = (Options) => {
    return (
      <>
        <div className="option-container">
          {Options.map((option, index) => (
            <div key={index} className="option" data-index={index}>
              <input
                type="text"
                placeholder={`Option ${index + 1}`}
                data-index={index}
                value={Options[index]}
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
  };

  renderSelectContainer = (Options) => {
    return (
      <>
        <div className="select-wrapper">
          <select readOnly={true}>
            <option value="">Select an option</option>
            {Options.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </>
    );
  };

  renderInput(isFocused) {
    const { Options } = this.state;
    return (
      <>
        {isFocused
          ? this.renderOptionContainer(Options)
          : this.renderSelectContainer(Options)}
      </>
    );
  }
}

export default SelectInput;
