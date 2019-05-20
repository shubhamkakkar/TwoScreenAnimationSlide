import React from "react";
import { View, ScrollView } from "react-native";

import HeaderButton from "../HeaderButton";
import Form from "./Form";

import GoogleAuth from "../../container/GoogleAuth/GoogleAuth";
import FacebookAuth from "../../container/FacebookAuth/FacebookAuth";

export default ({ submit, formInput, title }) => (
  <ScrollView
    style={{
      flexGrow: 1
    }}
    contentContainerStyle={{ flex: 1 }}
    keyboardDismissMode="interactive"
  >
    <View
      style={{
        // justifyContent: "center",
        // alignItems: "center",
        flex: 2
      }}
    >
      <Form submit={submit} formInput={formInput} ButtonTitle={title} />
    </View>
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row"
      }}
    >
      <GoogleAuth />
      <FacebookAuth />
    </View>
  </ScrollView>
);

{
  /* <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        
      }}
    >
      <HeaderButton title={title} />
    </View> */
}
