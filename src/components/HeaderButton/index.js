import React from "react";

import { TouchableOpacity, Text } from "react-native";

export default ({ title }) => (
  <TouchableOpacity
    style={{
      borderWidth: 1,
      borderColor: "#007aff",
      borderRadius: 4
    }}
  >
    <Text
      style={{
        color: "#007aff"
      }}
    >
      {title}
    </Text>
  </TouchableOpacity>
);
