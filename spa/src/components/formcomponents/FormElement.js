import React, { Component } from "react";
import SVGUtils from "../../utils/SVGUtils";
import "./FormComponents.css";

class FormElement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Id: props.elementState.Id,
      Name: props.elementState.Name,
      Type: props.elementState.Type,
      Label: props.elementState.Label,
      Mandatory: props.elementState.Mandatory,
      Min: props.elementState.Min,
      Max: props.elementState.Max,
      Options: props.elementState.Options,
      Fieldset: "datapanel",
      Value: props.elementState.Value,
      Placeholder: props.elementState.Placeholder,
    };
  }

  handleChange = (updatedData) => {
    let updatedState = { ...this.state, ...updatedData };
    this.setState(updatedState);
    this.props.onUpdate(updatedState);
  };

  deleteElementHandler = () => {
    this.props.onRemove(this.state.Id);
  };

  elementClickHandler = (event) => {
    this.props.onElementClickHandler(
      parseInt(event.target.closest(".form-component").dataset.index)
    );
  };

  handleDragStart = (e, index) => {
    e.dataTransfer.setData("index", index);
  };

  handleDragEnter = (e, index) => {
    const targetIndex = index;
  };

  handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  handleDrop = (e, index) => {
    e.preventDefault();

    const dragIndex = e.dataTransfer.getData("index");
    const targetIndex = e.target.closest(".form-component").dataset.index;

    console.log("dragIndex  " + dragIndex + " " + "targetIndex " + targetIndex);
    this.props.rearrangeFormElements(
      parseInt(dragIndex),
      parseInt(targetIndex)
    );
  };

  render() {
    return (
      <div
        className={`form-component ${this.state.Type}-component`}
        data-index={this.state.Id}
        onClick={this.elementClickHandler}
        focused={this.props.isFocused ? "true" : "false"}
        draggable={true}
        onDragStart={(e) => this.handleDragStart(e, this.state.Id)}
        onDragOver={this.handleDragOver}
        onDrop={this.handleDrop}
        onDragEnter={(event) => this.handleDragEnter(event, this.state.Id)}
      >
        <input
          type="text"
          value={this.state.Label}
          placeholder="Enter Your Question Here"
          onChange={(event) => this.handleChange({ Label: event.target.value })}
        />
        {this.renderInput(this.props.isFocused)}
        {this.props.isFocused && (
          <div className="footer">
            <div className="left-footer"> </div>
            <div className="right-footer">
              <div
                className="delete-icon"
                onClick={this.deleteElementHandler}
                title="Delete"
              >
                <SVGUtils name="delete" />
              </div>
              <label className="switch" title="Required">
                <input
                  type="checkbox"
                  checked={
                    this.state.Mandatory === "true" ||
                    this.state.Mandatory === true
                  } // check for both string and booolean
                  onChange={(event) =>
                    this.handleChange({ Mandatory: event.target.checked })
                  }
                />
                <span className="slider round"></span>
              </label>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default FormElement;
