import React, { Component } from "react";

const WithAuth = (WrappedComponent) => {
  return class extends Component {
    constructor(props) {
      super(props);
      this.state = {
        redirecting: false, // add a state to track whether redirecting or not
      };
    }
    
    componentDidMount() {
      const email = localStorage.getItem("email");
      const code = localStorage.getItem("code");
      if (!email || !code) {
        this.setState({ redirecting: true });
        setTimeout(() => {
          window.location.href = "/authoring/login";
        }, 500); // redirect after 1 second
      }
    }

    render() {
      if (this.state.redirecting) {
        return <div>Redirecting to login page...</div>; // show a message or a spinner while redirecting
      }
      return <WrappedComponent {...this.props} />;
    }
  };
};

export default WithAuth;
