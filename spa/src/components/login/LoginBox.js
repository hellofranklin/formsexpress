import React, { Component } from "react";
import { generateLoginCodeApi, login } from "../../api";
import WithLoadingSpinner from "../spinner/WithLoadingSpinner";
import "./LoginBox.css";

import WithNavigate from "../WithNavigate";

class LoginBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      docpageUrl: "",
      code: "",
      loading: false,
    };
  }

  updateState = (key, value) => {
    this.setState((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  handleEmailChange = (event) => {
    this.updateState("email", event.target.value);
  };

  generateLoginCode = async () => {
    this.updateState("loading", true);
    const responseJson = await generateLoginCodeApi(
      this.state.email,
      this.props.handleApiCall
    );
    this.updateState("docpageUrl", responseJson.LoginPageURL);
    this.updateState("loading", false);
  };

  handleSubmissionClick = async () => {
    const { code, email } = this.state;
    const responseJson = await login(email, code, this.props.handleApiCall);
    const { loginStatus } = responseJson;
    if (loginStatus === "Success") {
      localStorage.setItem("email", email);
      localStorage.setItem("code", code);
      this.props.navigate("/home");
    } else {
      alert("Unauthorized Acces");
    }
  };

  handleBackButton = () => {
    this.updateState("docpageUrl", "");
  };

  handleCodeChange = (evt) => {
    this.updateState("code", evt.target.value);
  };

  componentDidMount() {
    const email = localStorage.getItem("email");
    if (email) {
      this.props.navigate("/home");
    }
  }

  render() {
    const { docpageUrl, email, code, loading } = this.state;
    return (
      <div className="login-container">
        <section
          id="section_uname"
          className={
            "section_uname " + (docpageUrl === "" ? "d-show" : "d-none")
          }
        >
          <div className="auth-wrapper">
            <img
              src="/spa/build/adobe_logo.png"
              alt=""
              height={20}
              width={20}
            />
            <span className="titlename"> Forms Express</span>
            <h2 className="title mb-16 mt-16">Sign in</h2>
            <div className="mb-16">
              <p id="error_uname" className="error"></p>
              <input
                id="inp_uname"
                type="email"
                name="uname"
                className="loginemail"
                placeholder="Enter your Gmail"
                value={email}
                onChange={(event) => this.handleEmailChange(event)}
              />
            </div>
            <div className={"loading-dots " + (loading ? "d-show" : "d-none")}>
              <div className="loading-dot"></div>
              <div className="loading-dot"></div>
              <div className="loading-dot"></div>
            </div>
            <div className="mt-16">
              <button
                className="btn"
                id="btn_next"
                onClick={() => this.generateLoginCode()}
              >
                Next
              </button>
            </div>
          </div>
        </section>

        <section
          id="section_pwd"
          className={"section_pwd " + (docpageUrl === "" ? "d-none" : "d-show")}
        >
          <div className="auth-wrapper">
            <img
              src="/spa/build/adobe_logo.png"
              alt=""
              height={20}
              width={20}
            />
            <span className="titlename"> Forms Express</span>
            <div className="identity w-100 mt-16 mb-16">
              <button className="back" onClick={() => this.handleBackButton()}>
                <img src="/spa/build/back.png" />
              </button>
              <span id="user_identity">{email}</span>
            </div>
            <h2 className="title mb-16">Enter Login Code</h2>

            <div className="mb-16">
              <p id="error_pwd" className="error"></p>
              <input
                id="inp_pwd"
                type="text"
                name="pass"
                className="input code-input"
                placeholder="Enter your code"
                value={code}
                onChange={(evt) => {
                  this.handleCodeChange(evt);
                }}
              />
            </div>

            <div className="login-code-label">
              <p className="mb-16">
                Get your login code from{"  "}
                <a href={docpageUrl} className="link fs-13" target="_blank">
                  here
                </a>
              </p>
            </div>
            <div>
              <button
                className="btn"
                id="btn_sig"
                onClick={() => this.handleSubmissionClick()}
              >
                Sign in
              </button>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default WithNavigate(WithLoadingSpinner(LoginBox));
