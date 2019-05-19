import React, { PureComponent } from "react";
import { Facebook } from "expo";

import SocialAuthButtonHoc from "../../components/social-auth-button-hoc";

class FacebookAuth extends PureComponent {
  handleFacebookAuth = async () => {
    try {
      const { type, token } = await Facebook.logInWithReadPermissionsAsync(
        "<App-ID>",
        {
          permissions: ["public_profile", "email"]
        }
      );
      if (type === "success") {
        // Get the user's name using Facebook's Graph API
        let response = await fetch(
          `https://graph.facebook.com/me?access_token=${token}`
        );
        response = await response.json();
        console.log(response);
      } else {
        alert("Facebook Login Canceled");
      }
    } catch (er) {
      console.log(er);
      // alert(`Facebook Login Error: ${message}`);
    }
  };

  render() {
    return (
      <SocialAuthButtonHoc
        handleAuth={this.handleFacebookAuth}
        name="facebook"
      />
    );
  }
}

export default FacebookAuth;
