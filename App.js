import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import BlogScreen from "./screens/BlogScreen";
import LoginScreen from "./screens/LoginScreen";
import BlogsDetailsScreen from "./screens/BlogDetailsScreen";
import CreateBlogScreen from "./screens/CreateBlogScreen";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen component={LoginScreen} name="Login"/>
        <Stack.Screen component={BlogScreen} name="Blog" options={{ headerLeft: false }}/>
        <Stack.Screen component={BlogsDetailsScreen} name="Post"/>
        <Stack.Screen component={CreateBlogScreen} name="Create"/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});