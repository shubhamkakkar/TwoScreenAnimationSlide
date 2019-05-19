import React, { PureComponent, Fragment } from "react";
import { View } from "react-native";

import InSlideScreenAnimation from "../../container/InScreenSlideAnimation";
import { Login, Signup } from "../../container/LoginSignup";

class AuthScreen extends PureComponent {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <InSlideScreenAnimation comp={[<Login />, <Signup />]} />
      </View>
    );
  }
}

export default AuthScreen;
