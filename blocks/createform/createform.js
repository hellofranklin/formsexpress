let codeBlock =
  '<div class="form-creator-container">' +
  "<h2>Form Express</h2>" +
  '<div class="field-type-container">' +
  '<label for="field-type">Field Type:</label>' +
  '<select id="field-type">' +
  '<option value="text">Text</option>' +
  '<option value="email">Email</option>' +
  '<option value="password">Password</option>' +
  '<option value="checkbox">Checkbox</option>' +
  "</select>" +
  "</div>" +
  '<div class="field-label-container">' +
  '<label for="field-label">Field Label:</label>' +
  '<input id="field-label" type="text" />' +
  "</div>" +
  '<button id="add-field-btn">Add Field</button>' +
  '<div id="form-creator"></div>' +
  "</div>" +
  '<button id="create-form-btn">Create Form</button>';

// basic block

async function createFormBlock() {
  let div = document.createElement("div");
  div.className = "create-form-container";
  div.innerHTML = codeBlock;
  return div;
}

export default async function decorate(block) {
  const form = block.querySelector('a[href$="google.com"]');
  if (form) {
    form.replaceWith(await createFormBlock(form.href));
  }

  initializeFields();
}

// createform.js

const initializeFields = () => {
  const fieldType = document.getElementById("field-type");
  const fieldLabel = document.getElementById("field-label");
  const addFieldBtn = document.getElementById("add-field-btn");
  const formCreator = document.getElementById("form-creator");
  const createFormBtn = document.getElementById("create-form-btn");

  addFieldBtn.addEventListener("click", function () {
    const fieldValue = fieldType.value;
    const labelValue = fieldLabel.value;

    if (!labelValue) {
      alert("Please enter a field label");
      return;
    }

    const formField = document.createElement("div");
    formField.classList.add("form-field");

    const fieldLabelEl = document.createElement("label");
    fieldLabelEl.innerHTML = labelValue;
    formField.appendChild(fieldLabelEl);

    if (
      fieldValue === "text" ||
      fieldValue === "email" ||
      fieldValue === "password"
    ) {
      const inputEl = document.createElement("input");
      inputEl.setAttribute("type", fieldValue);
      formField.appendChild(inputEl);
    } else if (fieldValue === "checkbox") {
      const inputEl = document.createElement("input");
      inputEl.setAttribute("type", fieldValue);
      formField.appendChild(inputEl);
    }

    const deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = "Delete";
    deleteBtn.classList.add("delete-btn");
    deleteBtn.addEventListener("click", function () {
      formField.remove();
    });
    formField.appendChild(deleteBtn);

    formCreator.appendChild(formField);
  });

  createFormBtn.addEventListener("click", function () {
    const formData = {};
    const formFields = formCreator.querySelectorAll(".form-field");
    formFields.forEach(function (field) {
      const label = field.querySelector("label").innerHTML;
      const input = field.querySelector("input");
      formData[label] = input ? input.value : "";
    });

    console.log(formData);

    //   const xhr = new XMLHttpRequest();
    //   xhr.open("POST", "http://localhost:8080/createform", true);
    //   xhr.setRequestHeader("Content-Type", "application/json");
    //   xhr.send(JSON.stringify(formData));
  });
};
