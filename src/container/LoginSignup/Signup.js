import React from "react";

import SignupView from "../../components/LoginSignup/View";

export default class SignupScreen extends React.Component {
  state = {
    formInput: [
      {
        label: "Name"
      },
      {
        label: "Email"
      },
      {
        label: "Password"
      },
      {
        label: "Confirm Password"
      }
    ],
    credentials: {}
  };

  signupSubmit = credentials => {
    const validationCheck = Object.keys(credentials).length;

    if (validationCheck) {
      const [name, email, password, confirmPassword] = [
        ...Object.keys(credentials).map(key => credentials[key])
      ];
      if (
        name.length &&
        email.length &&
        password.length &&
        confirmPassword.length
      ) {
        if (password === confirmPassword) {
          const newCredential = { name, email, password, confirmPassword };
          this.setState({ credentials: newCredential });
        } else {
          alert("Passwords dont match");
        }
      } else {
        alert("Fill in all the fields first");
      }
    } else {
      alert("Fill in all the fields first");
    }
  };

  render() {
    return (
      <SignupView
        formInput={this.state.formInput}
        submit={this.signupSubmit}
        title="Singup"
      />
    );
  }
}
