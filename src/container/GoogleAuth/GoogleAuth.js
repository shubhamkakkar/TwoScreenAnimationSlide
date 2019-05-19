import React, { PureComponent } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import SocialAuthButtonHoc from "../../components/social-auth-button-hoc";

class GoogleAuth extends PureComponent {
  handelGoogleAuth = async () => {
    try {
      const result = await Expo.Google.logInAsync({
        androidClientId: "<App-ID>",
        scopes: ["profile", "email"]
      });
      if (result.type === "success") {
        console.log(result.user);
        const { name, email, photoUrl } = result.user;
        const password = "no password ; googleauth";
        const userDetail = { name, email, photoUrl, password };
      } else {
        console.log("cancelled");
      }
    } catch (e) {
      console.log("error", e);
    }
  };
  render() {
    return (
      <SocialAuthButtonHoc handleAuth={this.handelGoogleAuth} name="google" />
    );
  }
}

export default GoogleAuth;
