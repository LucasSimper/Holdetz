import * as React from "react";
import homeScreen from "./homeScreen";
import yourEventsScreen from "./yourEventsScreen";
import createEventScreen from "./createEventScreen";
import { View, Text, Button, Image } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import singleEventScreen from "./singleEventScreen";

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
        options={({ navigation, route }) => ({
          headerTitleStyle: { textAlign: "right", color: "white" },
          headerStyle: { backgroundColor: "#62bab5" }

        })}
      />

      <Stack.Screen
        name="Single Event Page"
        component={singleEventScreen}
        options={({ navigation, route }) => ({
          headerTitleStyle: { textAlign: "right", color: "white" },
          headerStyle: { backgroundColor: "#62bab5" }

        })}
      />
    </Stack.Navigator>
  );
}

export default StackNavigator;
