import React from "react";
import { View, ScrollView } from "react-native";

import HeaderButton from "../HeaderButton";
import Form from "./Form";

import GoogleAuth from "../../container/GoogleAuth/GoogleAuth";
import FacebookAuth from "../../container/FacebookAuth/FacebookAuth";

export default ({ submit, formInput, title }) => (
  <View
    style={{
      flexGrow: 1
    }}
  >
    <View
      style={{
        flex: 1,
        width: "90%",
        marginLeft: "auto",
        marginRight: "auto"
      }}
    >
      <HeaderButton title={title} />
    </View>
    <ScrollView
      style={{
        flexGrow: 1
      }}
      contentContainerStyle={{ flex: 1 }}
      keyboardDismissMode="interactive"
    >
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          flex: 1
        }}
      >
        <Form submit={submit} formInput={formInput} ButtonTitle="Signup" />
      </View>
    </ScrollView>
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <GoogleAuth />
      <FacebookAuth />
    </View>
  </View>
);
