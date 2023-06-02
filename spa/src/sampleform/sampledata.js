const Formtemplates = {
  blank: {
    id: 1,
    title: "BlankForm",
    description: "Create a new form from scratch",
    svg: "add",
  },

  contact: {
    id: 2,
    title: "Contact Form",
    description: "A regular contact form for capturing basic details",
    svg: "contact",
    elements: [
      {
        Id: 1,
        Name: "FirstName",
        Type: "text",
        Label: "First Name",
        Mandatory: "",
        Min: "",
        Max: "",
        Options: [],
        Fieldset: "datapanel",
        Value: "",
        Placeholder: "",
      },
      {
        Id: 2,
        Name: "LastName",
        Type: "text",
        Label: "Last Name",
        Mandatory: "",
        Min: "",
        Max: "",
        Options: [],
        Fieldset: "datapanel",
        Value: "",
        Placeholder: "",
      },
      {
        Id: 3,
        Name: "Email",
        Type: "text",
        Label: "Email",
        Mandatory: true,
        Min: "",
        Max: "",
        Options: [],
        Fieldset: "datapanel",
        Value: "",
        Placeholder: "",
      },
      {
        Id: 4,
        Name: "Gender",
        Type: "select",
        Label: "Gender",
        Mandatory: true,
        Min: "",
        Max: "",
        Options: ["Male", "Female"],
        Fieldset: "datapanel",
        Value: "",
        Placeholder: "",
      },
      {
        Id: 5,
        Name: "About Yourself",
        Type: "textarea",
        Label: "About Yourself",
        Mandatory: true,
        Min: "",
        Max: "",
        Options: [],
        Fieldset: "datapanel",
        Value: "",
        Placeholder: "",
      },
    ],
  },
  feedback: {
    id: 3,
    title: "Feedback Form",
    description: `Thank you for participating in our event. We hope you had as much fun attending as we did organizing it. 

    We want to hear your feedback so we can keep improving our logistics and content. Please fill this quick survey and let us know your thoughts (your answers will be anonymous).`,
    svg: "feedback",
    elements: [
      {
        Id: 1,
        Name: "First Name",
        Type: "text",
        Label: "First Name",
        Mandatory: "",
        Min: "",
        Max: "",
        Options: [],
        Fieldset: "datapanel",
        Value: "",
        Placeholder: "",
      },
      {
        Id: 2,
        Name: "Email",
        Type: "text",
        Label: "Email",
        Mandatory: true,
        Min: "",
        Max: "",
        Options: [],
        Fieldset: "datapanel",
        Value: "",
        Placeholder: "",
      },
      {
        Id: 3,
        Name: "Gender",
        Type: "radio",
        Label: "Gender",
        Mandatory: "",
        Min: "",
        Max: "",
        Options: ["Male", "Female"],
        Fieldset: "datapanel",
        Value: "",
        Placeholder: "",
      },
      {
        Id: 4,
        Name: "On a scale of 1-10, how would you rate the overall organization and structure of the meeting?",
        Type: "text",
        Label:
          "On a scale of 1-10, how would you rate the overall organization and structure of the meeting?",
        Mandatory: "",
        Min: "",
        Max: "",
        Options: [],
        Fieldset: "datapanel",
        Value: "",
        Placeholder: "",
      },
      {
        Id: 5,
        Name: "Additional Feedback ?",
        Type: "textarea",
        Label: "Additional Feedback ?",
        Mandatory: "",
        Min: "",
        Max: "",
        Options: [],
        Fieldset: "datapanel",
        Value: "",
        Placeholder: "",
      },
    ],
  },
};

export default Formtemplates;