let codeBlock =
'<div class="container">' +
'<form id="form">' +
'<div class="form-group">' +
'<label for="question-input">Question:</label>' +
'<input type="text" id="question-input" placeholder="Enter your question here">' +
'</div>' +
'<div class="form-group">' +
'<label for="answer-type">Answer Type:</label>' +
'<select id="answer-type">' +
'<option value="text">Text</option>' +
'<option value="radio">Multiple Choice (Radio Buttons)</option>' +
'<option value="checkbox">Multiple Choice (Checkboxes)</option>' +
'</select>' +
'</div>' +
'<div class="form-group options-group" id="options-group">' +
'<label for="options-input">Options:</label>' +
'<input type="text" id="options-input" placeholder="Enter options separated by commas">' +
'</div>' +
'<button type="button" id="add-question-btn">Add Question</button>' +
'<button type="button" id="create-form-btn">Create Form</button> ' +
'</form>' +
'<h2>Preview</h2>' +
'<div id="preview"></div>' +
'</div>';

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




// lates 

const initializeFields = () => {
  var form = document.getElementById("form");
  var questionInput = document.getElementById("question-input");
  var answerType = document.getElementById("answer-type");
  var optionsInput = document.getElementById("options-input");
  var optionsGroup = document.getElementById("options-group");
  var addQuestionBtn = document.getElementById("add-question-btn");
  var preview = document.getElementById("preview");
  var createFormBtn = document.getElementById("create-form-btn");

  answerType.addEventListener("change", function () {
    if (answerType.value === "radio" || answerType.value === "checkbox") {
      optionsGroup.style.display = "block";
    } else {
      optionsGroup.style.display = "none";
    }
  });

  addQuestionBtn.addEventListener("click", function () {
    if (!questionInput.value) {
      alert("Please enter a question");
      return;
    }

    var questionContainer = document.createElement("div");
    questionContainer.classList.add("question-container");

    var question = document.createElement("p");
    question.innerHTML = questionInput.value;
    questionContainer.appendChild(question);

    if (answerType.value === "text") {
      var textAnswer = document.createElement("input");
      textAnswer.type = "text";
      questionContainer.appendChild(textAnswer);
    } else if (
      answerType.value === "radio" ||
      answerType.value === "checkbox"
    ) {
      var options = optionsInput.value.split(",");
      for (var i = 0; i < options.length; i++) {
        var option = options[i].trim();
        var answerOption = document.createElement("input");
        answerOption.type = answerType.value;
        answerOption.name = questionInput.value;
        answerOption.value = option;
        var answerOptionLabel = document.createElement("label");
        answerOptionLabel.innerHTML = option;
        answerOptionLabel.appendChild(answerOption);
        questionContainer.appendChild(answerOptionLabel);
      }
    }

    var deleteIcon = document.createElement("i");
    deleteIcon.classList.add("fa", "fa-trash");
    deleteIcon.addEventListener("click", function () {
      questionContainer.remove();
    });
    questionContainer.appendChild(deleteIcon);

    preview.appendChild(questionContainer);
    form.reset();
    optionsGroup.style.display = "none";
  });

  createFormBtn.addEventListener("click", function () {
    var questions = [];

    var questionContainers = document.querySelectorAll(".question-container");
    questionContainers.forEach(function (questionContainer) {
      var question = questionContainer.querySelector("p").innerHTML;
      var answerType = "text";
      var options = [];

      var inputs = questionContainer.querySelectorAll("input");
      if (inputs.length > 1) {
        answerType = inputs[0].type;
        for (var i = 0; i < inputs.length; i++) {
          var input = inputs[i];
          if (input.type === answerType) {
            options.push(input.value);
          }
        }
      }

      questions.push({
        question: question,
        answerType: answerType,
        options: options,
      });
    });

    console.log(JSON.stringify(questions));
  });
};































// // createform.js

// const initializeFields = () => {
//   const fieldType = document.getElementById("field-type");
//   const fieldLabel = document.getElementById("field-label");
//   const addFieldBtn = document.getElementById("add-field-btn");
//   const formCreator = document.getElementById("form-creator");
//   const createFormBtn = document.getElementById("create-form-btn");

//   addFieldBtn.addEventListener("click", function () {
//     const fieldValue = fieldType.value;
//     const labelValue = fieldLabel.value;

//     if (!labelValue) {
//       alert("Please enter a field label");
//       return;
//     }

//     const formField = document.createElement("div");
//     formField.classList.add("form-field");

//     const fieldLabelEl = document.createElement("label");
//     fieldLabelEl.innerHTML = labelValue;
//     formField.appendChild(fieldLabelEl);

//     if (
//       fieldValue === "text" ||
//       fieldValue === "email" ||
//       fieldValue === "password"
//     ) {
//       const inputEl = document.createElement("input");
//       inputEl.setAttribute("type", fieldValue);
//       formField.appendChild(inputEl);
//     } else if (fieldValue === "checkbox") {
//       const inputEl = document.createElement("input");
//       inputEl.setAttribute("type", fieldValue);
//       formField.appendChild(inputEl);
//     }

//     const deleteBtn = document.createElement("button");
//     deleteBtn.innerHTML = "Delete";
//     deleteBtn.classList.add("delete-btn");
//     deleteBtn.addEventListener("click", function () {
//       formField.remove();
//     });
//     formField.appendChild(deleteBtn);

//     formCreator.appendChild(formField);
//   });

//   createFormBtn.addEventListener("click", function () {
//     const formData = {};
//     const formFields = formCreator.querySelectorAll(".form-field");
//     formFields.forEach(function (field) {
//       const label = field.querySelector("label").innerHTML;
//       const input = field.querySelector("input");
//       formData[label] = input ? input.value : "";
//     });

//     console.log(formData);

//     //   const xhr = new XMLHttpRequest();
//     //   xhr.open("POST", "http://localhost:8080/createform", true);
//     //   xhr.setRequestHeader("Content-Type", "application/json");
//     //   xhr.send(JSON.stringify(formData));
//   });
// };
