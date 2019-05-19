import React from "react";
import SignupView from "../../components/LoginSignup/View";

import { View } from "react-native";

export default class LoginScreen extends React.Component {
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
      }
    ],
    credentials: {}
  };

  loginSubmit = credentials => {
    const validationCheck = Object.keys(credentials).length;
    if (validationCheck) {
      const [name, email, password] = [
        ...Object.keys(credentials).map(key => credentials[key])
      ];
      if (name.length && email.length && password.length) {
        const newCredential = { name, email, password };
        console.log(newCredential);
        this.setState({ credentials: newCredential });
      } else {
        alert("Fill in all the fields first");
      }
    } else {
      alert("Fill in all the fields first");
    }
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <SignupView
          formInput={this.state.formInput}
          submit={this.loginSubmit}
          title="Login"
        />
      </View>
    );
  }
}
