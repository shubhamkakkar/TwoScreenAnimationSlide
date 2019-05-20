import React from "react";
import { TouchableOpacity } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";

export default props => (
  <TouchableOpacity
    style={{
      margin: 5,
      padding: 10,
      width: 50,
      height: 50,
      backgroundColor: "#007aff",
      borderRadius: 25,
      justifyContent: "center",
      alignItems: "center",
      borderColor: "#007aff"
    }}
    onPress={() => props.handelAuth()}
  >
    <FontAwesome name={props.name} size={20} color="#fff" />
  </TouchableOpacity>
);
