import * as React from "react";
import homeScreen from "./homeScreen";
import yourEventsScreen from "./yourEventsScreen";
import createEventScreen from "./createEventScreen";
import { createStackNavigator } from "@react-navigation/stack";
import { View, Text, Button, Image } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

const Stack = createNativeStackNavigator();

function StackNavigator() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={homeScreen}
        options={({ navigation, route }) => ({
          headerTitleStyle: { textAlign: "right", color: "white" },
          headerStyle: { backgroundColor: "#62bab5" }

        })}
      />

      <Stack.Screen
        name="Your Events"
        component={yourEventsScreen}
        options={({ navigation, route }) => ({
          headerTitleStyle: { textAlign: "right", color: "white" },
          headerStyle: { backgroundColor: "#62bab5" }

        })}
      />

      <Stack.Screen
        name="Create Event"
        component={createEventScreen}
        options={{
          headerTitleStyle: { textAlign: "right", color: "white" },
          headerStyle: { backgroundColor: "#62bab5" },
        }}
      />
    </Stack.Navigator>
  );
}

export default StackNavigator;
