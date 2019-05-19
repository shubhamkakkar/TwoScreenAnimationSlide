import React from "react";
import { createStackNavigator } from "react-navigation";

import { Auth as AuthScreen, Home as HomeScreen } from "../src/screens";

const Auth = createStackNavigator(
  {
    Auth: AuthScreen
  },
  {
    defaultNavigationOptions: {
      header: null
    }
  }
);

const Home = createStackNavigator(
  {
    Home: HomeScreen
  },
  {
    defaultNavigationOptions: {
      header: null
    }
  }
);

const Root = createStackNavigator(
  {
    Auth,
    Home
  },
  {
    defaultNavigationOptions: {
      header: null
    }
  }
);

export default Root;
