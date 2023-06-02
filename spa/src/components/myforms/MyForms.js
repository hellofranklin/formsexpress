import React, { useEffect, useState } from "react";
import { getUserForms } from "../../api";
import Formtemplates from "../../sampleform/sampledata";
import WithAuth from "../../WithAuth";
import Card from "../card/card";
import Header from "../header/Header";
import WithLoadingSpinner from "../spinner/WithLoadingSpinner";

import './MyForms.css'

const MyForms = (props) => {
  const [forms, setForms] = useState([]);

  const [loadingMyForms, isLoadingMyForms] = useState(false);

  useEffect(() => {
    window.onbeforeunload = () => {
      localStorage.removeItem("data");
    };

    window.onload = () => {
      localStorage.removeItem("data");
    };
    const cachedData = localStorage.getItem("data");
    if (cachedData) {
      setForms(JSON.parse(cachedData));
    } else {
      const userEmail = localStorage.getItem("email");
      isLoadingMyForms(true);
      getUserForms(userEmail, props.handleApiCall, "no").then(
        (responseData) => {
          localStorage.setItem("data", JSON.stringify(responseData.forms));
          setForms(responseData.forms);
          isLoadingMyForms(false);
        }
      );
    }
  }, []);

  const loadingDots = () => {
    return (
      <div className="loading-dots">
        Loading
        <div className="loading-dot"></div>
        <div className="loading-dot"></div>
        <div className="loading-dot"></div>
      </div>
    );
  };
  return (
    <div>
      <Header />
      <div className="main-container">
        <div className="container sample-forms">
          <div className="container-heading">
            <h3> Create Your Form</h3>
          </div>

          <div className="form-list">
            {Object.values(Formtemplates).map((form, index) => {
              return (
                <Card formdata={form} type="sample" id={index} key={index} />
              );
            })}
          </div>
        </div>

        <div className="container my-forms">
          <div className="container-heading">
            <h3> My Forms</h3>
          </div>
          <div className="form-cards">
            {loadingMyForms ? (
              loadingDots()
            ) : forms.length <= 0 ? (
              <p> No Forms Found </p>
            ) : (
              forms.map((form, index) => (
                <Card formdata={form} type="userform" id={index} key={index} />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WithAuth(WithLoadingSpinner(MyForms));
