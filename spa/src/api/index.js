import {
  CREATE_FORM_API_CALL_SPINNER_MSG,
  PUBLISH_API_CALL_SPINNER_MSG,
  STAGE_API_CALL_SPINNER_MSG,
  UPDATE_FORM_API_CALL_SPINNER_MSG,
  USER_FORMS_API_CALL_SPINNER_MSG,
  USER_LOGIN_API_CALL_SPINNER_MSG,
} from "../constants/Constants";
import { getGmailUserId } from "../utils/AppUtils";

export const createForm = async (
  data,
  email,
  title,
  handleApiCall,
  formAction
) => {
  const requestType = formAction === "create" ? "createform" : "updateform";
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "text/plain;charset=utf-8");

  const spinnerMSG =
    formAction === "create"
      ? CREATE_FORM_API_CALL_SPINNER_MSG
      : UPDATE_FORM_API_CALL_SPINNER_MSG;

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify(data),
    redirect: "follow",
  };

  const URL =
    process.env.REACT_APP_BACKEND_URL +
    `?requestType=${requestType}&formTitle=${title}&email=${email}`;

  return handleApiCall(() => fetch(encodeURI(URL), requestOptions), spinnerMSG);
};

export const generateLoginCodeApi = async (email, handleApiCall) => {
  const requestType = "getlogincode";
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "text/plain;charset=utf-8");
  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    redirect: "follow",
  };

  const URL =
    process.env.REACT_APP_BACKEND_URL +
    `?requestType=${requestType}&email=${email}`;

  return handleApiCall(() => fetch(encodeURI(URL), requestOptions), "no");
};

export const login = async (email, code, handleApiCall) => {
  const requestType = "verifylogin";
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "text/plain;charset=utf-8");

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    redirect: "follow",
  };
  const URL =
    process.env.REACT_APP_BACKEND_URL +
    `?requestType=${requestType}&email=${email}&code=${code}`;

  return handleApiCall(
    () => fetch(encodeURI(URL), requestOptions),
    USER_LOGIN_API_CALL_SPINNER_MSG
  );
};

export const getUserForms = async (email, handleApiCall, message) => {
  const requestType = "userforms";
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "text/plain;charset=utf-8");
  const requestOptions = {
    method: "GET",
    headers: myHeaders,
  };

  const URL =
    process.env.REACT_APP_BACKEND_URL +
    `?requestType=${requestType}&email=${email}`;

  return handleApiCall(
    () => fetch(encodeURI(URL), requestOptions),
    message === "no" ? message : USER_FORMS_API_CALL_SPINNER_MSG
  );
};

// export const getFranklinFormDataJson = async (title, email, handleApiCall) => {
//   const myHeaders = new Headers();
//   const requestOptions = {
//     method: "GET",
//     headers: myHeaders,
//   };

//   const gmailUserId = getGmailUserId(email);

//   const host = window.location.host.includes("localhost")
//     ? "https://main--express--hellofranklin.hlx.page"
//     : window.location.host;

//   const updatedTitle = title.replaceAll(" ", "-");
//   const hostWithHttps = host.startsWith("https://") ? host : `https://${host}`;

//   const URL = `https://main--express--hellofranklin.hlx.page/forms/${gmailUserId}/${updatedTitle}/form.json`;

//   return handleApiCall(() => fetch(encodeURI(URL), requestOptions));
// };

export const getFranklinFormDataJson = async (title, email, handleApiCall) => {
  const requestType = "getformjson";
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "text/plain;charset=utf-8");
  const requestOptions = {
    method: "POST",
    headers: myHeaders,
  };

  const URL =
    process.env.REACT_APP_BACKEND_URL +
    `?requestType=${requestType}&email=${email}&formTitle=${title}`;

  return handleApiCall(() => fetch(encodeURI(URL), requestOptions));
};

export const stageFranklinForm = async (
  title,
  email,
  handleApiCall,
  message
) => {
  const requestType = "stageform";
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "text/plain;charset=utf-8");
  const requestOptions = {
    method: "POST",
    headers: myHeaders,
  };

  const URL =
    process.env.REACT_APP_BACKEND_URL +
    `?requestType=${requestType}&email=${email}&formTitle=${title}`;

  return handleApiCall(
    () => fetch(encodeURI(URL), requestOptions),
    message === "no" ? message : STAGE_API_CALL_SPINNER_MSG
  );
};

export const publishFranklinForm = async (title, email, handleApiCall) => {
  const requestType = "publishform";
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "text/plain;charset=utf-8");
  const requestOptions = {
    method: "POST",
    headers: myHeaders,
  };

  const URL =
    process.env.REACT_APP_BACKEND_URL +
    `?requestType=${requestType}&email=${email}&formTitle=${title}`;

  return handleApiCall(
    () => fetch(encodeURI(URL), requestOptions),
    PUBLISH_API_CALL_SPINNER_MSG
  );
};
