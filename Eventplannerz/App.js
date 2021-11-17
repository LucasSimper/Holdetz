import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import firebase from "firebase";
import { initializeApp } from "firebase/app";
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';



import homeScreen from './Screens/homeScreen';
import settingsScreen from './Screens/settingsScreen';
import profileScreen from './Screens/profileScreen';



function HomeScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Home!</Text>
    </View>
  );
}

function SettingsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Settings!</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();

export default function App() {

  const firebaseConfig = {
    apiKey: "AIzaSyBD-8PCupSRRA4-EkKB1YH7iHu5tmgp-J4",
    authDomain: "eventplannerz-be6b5.firebaseapp.com",
    projectId: "eventplannerz-be6b5",
    storageBucket: "eventplannerz-be6b5.appspot.com",
    messagingSenderId: "1037590493568",
    appId: "1:1037590493568:web:2462f68e2cd8122fa4a965",
    measurementId: "G-YC3051JC8P"
  };
  
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }

  return (

    <NavigationContainer>
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  </NavigationContainer>
  
    /*
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={homeScreen} />
        <Tab.Screen name="Settings" component={settingsScreen} />
        <Tab.Screen name="Profile" component={profileScreen} />
      </Tab.Navigator>
    </NavigationContainer>
    */
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
