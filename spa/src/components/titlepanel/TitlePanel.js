import React, { Component } from "react";
import "./TitlePanel.css";

class TitlePanel extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const formTitle =
      this.props.formTitle === undefined || this.props.formTitle === null
        ? ""
        : this.props.formTitle;
    const formDesc =
      this.props.formDesc === undefined || this.props.formDesc === null
        ? ""
        : this.props.formDesc;

    return (
      <div className="title-container">
        <input
          type="text"
          className="form-title"
          placeholder="Untitled Form"
          onChange={(evt) =>
            this.props.updateFormBuilderState({ formTitle: evt.target.value })
          }
          value={formTitle}
          required={true}
          readOnly={this.props.isUpdate}
          title ={this.props.isUpdate ? "Title can't be updated": "Form Title" }
        />
      <input
          type="text"
          className="form-description"
          placeholder="Form description"
          onChange={(evt) =>
            this.props.updateFormBuilderState({ formDesc: evt.target.value })
          }
          value={formDesc}
        />
      </div>
    );
  }
}

export default TitlePanel;
