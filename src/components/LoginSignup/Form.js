import React from "react";
import { View, TextInput, Text, TouchableOpacity } from "react-native";

export default props => {
  let credentials = [];

  handleInput = (text, index) => {
    if (text.trim().length) {
      credentials = { ...credentials, [index]: text };
    } else {
      credentials = { ...credentials, [index]: "" };
    }
  };
  return (
    <View
      style={{
        flex: 1
        // justifyContent: "center",
        // alignItems: "center"
      }}
    >
      <View
        style={{ flex: 2, justifyContent: "flex-end", alignItems: "center" }}
      >
        {props.formInput.map(({ label, placeholder }, index) => (
          <View key={label} style={{ marginBottom: 5 }}>
            <TextInput
              blurOnSubmit={true}
              clearTextOnFocus={true}
              placeholder={label}
              clearTextOnFocus={true}
              placeholderTextColor="#000"
              secureTextEntry={
                label === "Password" || label === "Confirm Password"
                  ? true
                  : false
              }
              onChangeText={text => handleInput(text, index)}
              style={{ textAlign: "center" }}
            />
          </View>
        ))}
      </View>
      <View
        style={{
          flex: 1,
          justifyContent: "center"
          // alignItems: "center"
        }}
      >
        <TouchableOpacity
          onPress={() => props.submit(credentials)}
          style={{
            alignSelf: "center",
            borderColor: "#f34573",
            margin: 10,
            borderWidth: 1,
            // backgroundColor: "#f34573"
            paddingLeft: 15,
            paddingRight: 15,
            paddingTop: 10,
            paddingBottom: 10,
            borderRadius: 5
          }}
        >
          <Text
            style={{
              color: "#f34573",
              textAlign: "center",
              fontWeight: "bold"
            }}
          >
            {props.ButtonTitle}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
