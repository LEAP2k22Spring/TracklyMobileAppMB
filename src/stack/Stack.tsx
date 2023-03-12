import * as React from 'react'
import { createStackNavigator } from "@react-navigation/stack";
import { Text } from "react-native";
import HomeScreen from "../screen/Home";
import LoginScreen from "../screen/Login";

const Stack = createStackNavigator();
const MyStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};
export default MyStack;
