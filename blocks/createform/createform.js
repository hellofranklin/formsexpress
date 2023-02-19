let codeBlock =
'<div class="top-container">' +
'<div id="spinner">' +
'<div class="spinner-animation"></div>' +
'</div>' +
'<div class="main-form-container" id="main-form-container">' +
'<div class="title-container form-item">' +
'<h1 contenteditable="true" id="form-title-heading"> Untitled Form </h1>' +
'<input type="email" id="user-email" required placeholder="Enter your Gmail"/>' +
'' +
'<div id="result" class="hidden">' +
'<p id="result-status"></p>' +
'<p>Your <a id="result-form" href="#"></a> is ready to share.</p>' +
'<p>Results & Edit form using <a id="result-folder-url" href="#"></a></p>' +
'</div>' +
'</div>' +
'</div>' +
'<div class="side-container">' +
'<div id="plus-btn">Add New</div>' +
'<div id="options" class="hidden">' +
'<button class="option-text" id="option-1"> Text Response</button>' +
'<button class="option-text" id="option-2"> Single Choice </button>' +
'<button class="option-text" id="option-3"> Multiple Choice </button>' +
'</div>' +
'</div>' +
'</div>' ;

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
  let plusBtn = document.getElementById("plus-btn");
  const options = document.getElementById("options");
  const option1 = document.getElementById("option-1");
  const option2 = document.getElementById("option-2");
  const option3 = document.getElementById("option-3");
  const mainFormContainer = document.getElementById("main-form-container");
  const submitBtn = document.getElementById("submit-btn");
  const email = document.getElementById("user-email");
  const FORM_EXPRESS_BACKEND_URL =
    "https://script.google.com/macros/s/AKfycbw9GQJ7dtvHCBiM6Q0PkxKyF4KFUtPMvIDdv68A4MtIlHdSs09Xc24w97Q_M_Z4txut/exec?";

  // Event listeners

  plusBtn &&
    plusBtn.addEventListener("click", () => {
      options.classList.toggle("hidden");
      options.style.animationFillMode = "fadeout";
    });

  option1 &&
    option1.addEventListener("click", () => {
      questionCreator("text");
    });
  option2 &&
    option2.addEventListener("click", () => {
      questionCreator("radio");
    });
  option3 &&
    option3.addEventListener("click", () => {
      questionCreator("checkbox");
    });

  // Question Creator Function
  function questionCreator(type) {
    let formElement;

    switch (type) {
      case "text":
        formElement = getTextBoxElement();
        break;
      case "checkbox":
        formElement = getCheckBoxElement();
        break;

      case "radio":
        formElement = getRadioBoxElement();
        break;

      default:
        formElement = getTextBoxElement();
    }

    mainFormContainer.insertBefore(formElement, mainFormContainer.lastChild);
    addSubmitButton();
  }

  function getContainerDiv() {
    let elementDiv = document.createElement("div");
    elementDiv.classList.add("form-item");
    elementDiv.classList.add("user-form-item");
    elementDiv.classList.add("user-form-text-item");
    elementDiv.id = `item-${
      document.getElementsByClassName("user-form-item").length
    }`;
    return elementDiv;
  }

  function getTextBoxElement() {
    let textBoxDiv = getContainerDiv();

    let inputLabel = document.createElement("label");
    inputLabel.classList.add("input-label");
    inputLabel.textContent = "Untitled Question";
    inputLabel.setAttribute("contenteditable", "true");

    let input = document.createElement("input");
    input.classList.add("question-field");
    input.type = "text";

    textBoxDiv.appendChild(inputLabel);
    textBoxDiv.appendChild(input);

    let questionFooter = getQuestionFooter();
    textBoxDiv.appendChild(questionFooter);

    return textBoxDiv;
  }

  function getRadioBoxElement() {
    let radioBoxDiv = getContainerDiv();

    let inputLabel = document.createElement("label");
    inputLabel.classList.add("input-label");
    inputLabel.textContent = "Single Choice Question";

    let input = document.createElement("input");
    input.classList.add("question-field");
    input.type = "text";
    input.placeholder = "Enter your Question";

    let choice1 = document.createElement("input");
    choice1.classList.add("choice-field");
    choice1.type = "text";
    choice1.placeholder = "Choice 1";

    let choice2 = document.createElement("input");
    choice2.classList.add("choice-field");
    choice2.type = "text";
    choice2.placeholder = "Choice 2";

    radioBoxDiv.appendChild(inputLabel);
    radioBoxDiv.appendChild(input);
    radioBoxDiv.appendChild(choice1);
    radioBoxDiv.appendChild(choice2);

    let questionFooter = getQuestionFooter();
    radioBoxDiv.appendChild(questionFooter);
    return radioBoxDiv;
  }

  function getCheckBoxElement() {
    let radioBoxDiv = getContainerDiv();

    let input = document.createElement("input");
    input.classList.add("question-field");
    input.type = "text";
    input.placeholder = " Untitled Question";

    let choice1 = document.createElement("input");
    choice1.classList.add("choice-field");
    choice1.type = "text";
    choice1.placeholder = "Choice 1";

    let choice2 = document.createElement("input");
    choice2.classList.add("choice-field");
    choice2.type = "text";
    choice2.placeholder = "Choice 2";

    let addChoiceButton = document.createElement("button");
    addChoiceButton.classList.add("btn-add-choice");
    addChoiceButton.setAttribute("onclick", "addChoice();");
    addChoiceButton.textContent = "Add More";

    radioBoxDiv.appendChild(input);
    radioBoxDiv.appendChild(choice1);
    radioBoxDiv.appendChild(choice2);
    radioBoxDiv.appendChild(addChoiceButton);

    let questionFooter = getQuestionFooter();
    radioBoxDiv.appendChild(questionFooter);

    return radioBoxDiv;
  }

  function addChoice() {
    let choice = document.createElement("input");
    choice.classList.add("chocie-field");
    choice.type = "text";
    choice.placeholder = "choice";

    // TO BE ADDED TO PARENT NODE, NEED TO GENERATE IDs DYNAMICALLY
  }

  function getQuestionFooter() {
    let questionFooter = document.createElement("div");
    questionFooter.classList.add("question-footer");

    let requiredLabel = document.createElement("label");
    requiredLabel.classList.add("switch", "question-checkbox-label");
    let requiredInput = document.createElement("input");
    requiredInput.type = "checkbox";
    let requiredInputSpan = document.createElement("span");
    requiredInputSpan.classList.add("slider", "round");
    requiredLabel.appendChild(requiredInput);
    requiredLabel.appendChild(requiredInputSpan);

    let deleteIcon = document.createElement("img");
    deleteIcon.classList.add("delete-icon");
    deleteIcon.src =
      'data:image/svg+xml;utf8, <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">     <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"/>   </svg>';

    deleteIcon.addEventListener("click", (event) => {
      let questionId = event.target.parentElement.parentElement.id;
      let element = document.getElementById(questionId);
      element.remove();
      if (useFormItemsSize() == 0) {
        document.getElementById("submit-btn").remove();
      }
    });

    questionFooter.appendChild(requiredLabel);
    questionFooter.appendChild(deleteIcon);

    return questionFooter;
  }

  // Forms Submission & Process

  function useFormItemsSize() {
    return document.getElementsByClassName("user-form-item").length;
  }

  function addSubmitButton() {
    //early return if nothing to do
    if (
      useFormItemsSize() === 0 ||
      document.getElementById("submit-btn") !== null
    )
      return;

    let button = document.createElement("button");
    button.classList.add("submit-btn");
    button.id = "submit-btn";
    button.type = "submit";
    button.value = "Create Form";
    button.textContent = "Create Form";
    mainFormContainer.appendChild(button);

    function getFormData() {
      let formData = [];
      let formElements = mainFormContainer.children;
      for (let element of formElements) {
        if (element.classList.contains("user-form-item")) {
          let formItem = {};
          if (element.classList.contains("user-form-text-item")) {
            const label = element.getElementsByTagName("label")[0];
            const inputElement = element.getElementsByTagName("input")[0];

            formItem["Field"] = label.firstChild.textContent.replace(/\s/g, "");
            formItem["Label"] = label.textContent;
            formItem["Placeholder"] = inputElement.placeholder;
            formItem["Type"] = "text-field";
            formItem["Format"] = "email";
          }
          formData.push(formItem);
        }
      }
      return formData;
    }

    //add click event to button
    button.addEventListener("click", (event) => {
      let userEmailElement = document.getElementById("user-email");
      let formTitleElement = document.getElementById("form-title-heading");
      let formData = getFormData();

      if (formData.length == 0) {
        alert("form data is empty");
      } else if (!/@gmail\.com$/.test(userEmailElement.textContent)) {
        userEmailElement.style.borderColor = "red";
      } else if (
        formTitleElement.textContent === null ||
        formTitleElement.textContent === undefined
      ) {
        formTitleElement.style.borderColor = "red";
      } else {
        postFranklinFormData(formData, userEmail, formTitle);
      }
    });
  }

  const postFranklinFormData = async (data, userEmail, formTitle) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "text/plain;charset=utf-8");
    var spinner = document.getElementById("spinner");
    spinner.style.display = "flex";

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify(data),
      // mode: 'no-cors',
      redirect: "follow",
    };

    let URL =
      FORM_EXPRESS_BACKEND_URL +
      `requestType=createform&formTitle=${formTitle}&email=${userEmail}`;

    fetch(encodeURI(URL), requestOptions)
      .then((response) => response.text())
      .then((result) => handleFormSubmissionResult(result))
      .catch((error) => handleFormSubmissionResultError(error));
  };

  const handleFormSubmissionResult = (result) => {
    var spinner = document.getElementById("spinner");
    spinner.style.display = "none";
    console.log(result);

    const resultDetails = JSON.parse(result);

    document.getElementById("result").classList.remove("hidden");

    document.getElementById("result-folder-url").textContent = "Form Folder";
    document.getElementById("result-folder-url").href = resultDetails.folderURL;

    document.getElementById("result-form").textContent = "Form";
    document.getElementById("result-form").href = resultDetails.formPublishURL;
  };

  const handleFormSubmissionResultError = (error) => {
    var spinner = document.getElementById("spinner");
    spinner.style.display = "none";
    console.log(error);

    document.getElementById("result-status").textContent = "Error";
  };

  const getFormSubmissionSuccessDiv = (successMessage) => {
    let div = document.createElement("div");
    let h2 = document.createElement("h2");
    h2.textContent = successMessage;
    div.appendChild(h2);
    return div;
  };
};
