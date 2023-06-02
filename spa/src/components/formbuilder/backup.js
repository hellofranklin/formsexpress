// import React, { Component } from "react";
// import TextInput from "../formcomponents/TextInput";
// import SelectInput from "../formcomponents/SelectInput";
// import CheckBoxInput from "../formcomponents/CheckBoxInput";
// import TextAreaInput from "../formcomponents/TextAreaInput";
// import RadioInput from "../formcomponents/RadioInput";
// import SideBar from "../sidebar/SideBar";
// import WithLoadingSpinner from "../spinner/WithLoadingSpinner";
// import TitlePanel from "../titlepanel/TitlePanel";
// import {
//   createForm,
//   getFranklinFormDataJson,
//   stageFranklinForm,
// } from "../../api/index";

// import Formtemplates from "../../sampleform/sampledata";
// import {
//   builderStateToFormJson,
//   formJsonToBuilderState,
// } from "../../utils/AppUtils";
// import WithNavigate from "../WithNavigate";
// import BottomNavigation from "../bottombar/BottomNavigation";

// class FormBuilder extends Component {
//   constructor(props) {
//     super(props);
//     const urlParams = new URLSearchParams(window.location.search);
//     const updatedElement = {};
//     const formAction =
//       urlParams.get("action") === null ? "create" : urlParams.get("action");
//     updatedElement["formAction"] = formAction;
//     let formElements = [];
//     let title = urlParams.get("title");
//     let description = "";
//     if (formAction === "create") {
//       let formSample = urlParams.get("sample");
//       let formTemplates = Formtemplates;
//       if (formTemplates.hasOwnProperty(formSample)) {
//         formElements = formTemplates[formSample]?.elements;
//         title = formTemplates[formSample]?.title;
//         description = formTemplates[formSample]?.description;
//       }
//     }
//     const email = localStorage.getItem("email");
//     this.state = {
//       formElements: formElements,
//       formTitle: title,
//       formDesc: description,
//       formAction: formAction,
//       email: email,
//       focusedElementIndex: -1,
//     };
//   }

//   componentMap = {
//     text: TextInput,
//     select: SelectInput,
//     checkbox: CheckBoxInput,
//     textarea: TextAreaInput,
//     radio: RadioInput,
//     email: TextInput,
//   };

//   componentWillUnmount() {
//     localStorage.removeItem("formElements");
//   }

//   componentDidUpdate() {
//     localStorage.setItem(
//       "formElements",
//       JSON.stringify(this.state.formElements)
//     );
//   }

//   componentDidMount = () => {
//     if (localStorage.getItem("formElements") !== null) {
//       const formElements = JSON.parse(localStorage.getItem("formElements"));
//       this.updateFormBuilderState({ formElements: formElements });
//     } else if (
//       this.state.formAction === "update" &&
//       this.state.formTitle !== undefined
//     ) {
//       getFranklinFormDataJson(
//         this.state.formTitle,
//         this.state.email,
//         this.props.handleApiCall
//       ).then((responseJson) => {
//         const updateStatePairs = formJsonToBuilderState(responseJson.data);
//         this.updateFormBuilderState(updateStatePairs);
//       });
//     }
//   };

//   updateFormBuilderState = (element) => {
//     const updateState = { ...this.state, ...element };
//     this.setState(updateState);
//   };

//   handleUpdateElement = (updatedElement) => {
//     const index = this.state.formElements.findIndex(
//       (element) => element.Id === updatedElement.Id
//     );
//     if (index !== -1) {
//       const updatedElements = [
//         ...this.state.formElements.slice(0, index),
//         updatedElement,
//         ...this.state.formElements.slice(index + 1),
//       ];
//       this.setState({
//         formElements: updatedElements,
//       });
//     }
//   };

//   handleRemoveFormElement = (deletedIndex) => {
//     const { formElements } = this.state;
//     const updatedElements = formElements
//       .filter((item, index) => item.Id !== deletedIndex)
//       .map((item, index) => ({ ...item, Id: index + 1 }));
//     this.updateFormBuilderState({ formElements: updatedElements });
//   };

//   onElementClickHandler = (focusedElementIndex) => {
//     if (
//       !isNaN(focusedElementIndex) &&
//       focusedElementIndex !== undefined &&
//       focusedElementIndex !== this.state.focusedElementIndex
//     ) {
//       this.updateFormBuilderState({ focusedElementIndex: focusedElementIndex });
//     }
//   };

//   renderFormElement = (element, index) => {
//     const ElementComponent = this.componentMap[element.Type];
//     if (!ElementComponent) {
//       return null;
//     }
//     return (
//       <ElementComponent
//         key={index}
//         elementState={element}
//         isFocused={this.state.focusedElementIndex === index}
//         onUpdate={(updatedElemnt) => this.handleUpdateElement(updatedElemnt)}
//         onRemove={(elemIndex) => this.handleRemoveFormElement(elemIndex)}
//         rearrangeFormElements={(dragIndex, targetIndex) =>
//           this.rearrangeFormElements(dragIndex, targetIndex)
//         }
//         onElementClickHandler={(elemIndex) =>
//           this.onElementClickHandler(elemIndex)
//         }
//       />
//     );
//   };

//   addElement = (type) => {
//     const newComponent = {
//       Id: this.state.formElements.length + 1,
//       Name: "",
//       Type: type,
//       Label: "",
//       Mandatory: false,
//       Min: "",
//       Max: "",
//       Options: [],
//       Fieldset: "datapanel",
//       Value: "",
//       Placeholder: "",
//     };

//     this.updateFormBuilderState({
//       formElements: [...this.state.formElements, newComponent],
//       focusedElementIndex: this.state.formElements.length + 1,
//     });
//   };

//   formCreatorBtnHandler = async () => {
//     const { formTitle, formDesc, formElements, email, formAction } = this.state;
//     if (
//       this.validateData(formElements, this.state.email, formTitle, formDesc)
//     ) {
//       const data = builderStateToFormJson(formElements, formTitle, formDesc);
//       const response = await createForm(
//         data,
//         email,
//         formTitle,
//         this.props.handleApiCall,
//         formAction
//       );
//       if (formAction === "create") {
//         const cachedData = JSON.parse(localStorage.getItem("data"));
//         const form = {
//           title: formTitle,
//           folderURL: response.folderURL,
//           publishUrl: response.formPublishURL,
//           resultSheetUrl: response.resultSheetUrl,
//         };
//         if (cachedData === null) {
//           localStorage.setItem("data", JSON.stringify([{ ...form }]));
//         } else {
//           cachedData.push(form);
//           localStorage.setItem("data", JSON.stringify(cachedData));
//         }
//       }

//       stageFranklinForm(formTitle, email, this.props.handleApiCall, "no");
//       this.props.navigate("/home");
//     }
//   };

//   validateData = (data, email, formTitle, formDesc) => {
//     if (!data || !email || !formTitle) {
//       alert("Check if formtitle is not empty");
//       return false; // one of the required values is empty or undefined
//     }
//     // validation successful
//     return true;
//   };

//   rearrangeFormElements(dragIndex, targetIndex) {
//     const newFormElements = [...this.state.formElements];
//     const dragObj = newFormElements.find((obj) => obj.Id === dragIndex);
//     // Remove the object from its current position in the array
//     newFormElements.splice(dragIndex - 1, 1);

//     // Insert the object at the new position in the array
//     newFormElements.splice(targetIndex - 1, 0, dragObj);

//     // Update the IDs of the objects in the array to reflect their new positions
//     newFormElements.forEach((obj, index) => {
//       obj.Id = index + 1;
//     });
//     this.updateFormBuilderState({ formElements: newFormElements });
//   }

//   render() {
//     const { formElements } = this.state;

//     return (
//       <div className="container formbuilder-container">
//         <div className="form-panel">
//           <TitlePanel
//             updateFormBuilderState={this.updateFormBuilderState}
//             formTitle={this.state.formTitle}
//             formDesc={this.state.formDesc}
//             isUpdate={this.state.formAction === "update"}
//           />
//           <div className="form-components">
//             {this.state.formElements.map((element, index) =>
//               this.renderFormElement(element, index + 1)
//             )}
//             {formElements.length > 0 && (
//               <div className="createbutton-container">
//                 <button
//                   className="createButton"
//                   onClick={this.formCreatorBtnHandler}
//                 >
//                   {this.state.formAction}
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>
//         {/* on basis of css handling which one to display */}
//         <div className="sidebar-view">
//           <SideBar onAddElement={this.addElement} />
//         </div>
//         <div className="bottom-view">
//           <BottomNavigation onAddElement={this.addElement} />
//         </div>
//       </div>
//     );
//   }
// }

// export default WithNavigate(WithLoadingSpinner(FormBuilder));
