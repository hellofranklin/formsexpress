import { Component } from "react";
import Header from "../../components/header/Header";
import FormBuilder from "../../components/formbuilder/FormBuilder";
import "./Home.css";
import WithAuth from "../../WithAuth";

class Home extends Component {
  render() {
    return (
      <>
        <Header />
        <FormBuilder />
      </>
    );
  }
}

export default WithAuth(Home);
