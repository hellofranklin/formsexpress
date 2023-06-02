// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { generateLoginCodeApi, login } from "../../api";
// import WithLoadingSpinner from "../spinner/WithLoadingSpinner";
// import "./LoginBox.css";

// function LoginBox(props) {
//   const [email, setEmail] = useState("");
//   const [url, setUrl] = useState("");
//   const [code, setCode] = useState("");
//   const navigate = useNavigate();

//   const handleEmailChange = (event) => {
//     setEmail(event.target.value);
//   };

//   const generateLoginCode = async () => {
//     const responseJson = await generateLoginCodeApi(email, props.handleApiCall);
//     setUrl(responseJson.LoginPageURL);
//   };

//   const handleSubmissionClick = async () => {
//     const responseJson = await login(email, code, props.handleApiCall);
//     const { loginStatus } = responseJson;
//     if (loginStatus === "Success") {
//       localStorage.setItem("email", email);
//       localStorage.setItem("code", code);
//       navigate("/home");
//     } else {
//       alert("Unauthorized Acces");
//     }
//   };

//   return (
//       <div className="login-box-container container">
//         <div className="login-header">
//           <img src="/adobe_logo.png" width={15} height={15} ></img>
//           <span className="site-name">  Forms Express </span>
//         </div>
//         <div className="sign-in-label"> Sign In</div>
//         <input
//           type="email"
//           placeholder="Enter your email"
//           value={email}
//           onChange={handleEmailChange}
//           className="email-input"
//         />
//         {url && (
//           <div className="url-container">
//             <p className="url-label">
//               Enter the code provided in{" "}
//               <a href={url} target="_blank">
//                 URL
//               </a>
//             </p>

//             <input
//               type="text"
//               value={code}
//               onChange={(evt) => {
//                 setCode(evt.target.value);
//               }}
//               className="code-input"
//             />
//             <br />
//             <button onClick={handleSubmissionClick} className="submit-button">
//               {" "}
//               Submit
//             </button>
//           </div>
//         )}
//         {!url && (
//           <button onClick={generateLoginCode} className="login-button">
//             Next
//           </button>
//         )}

//     </div>
//   );
// }

// export default WithLoadingSpinner(LoginBox);
