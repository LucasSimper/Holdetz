import {Button, StyleSheet, Text, View} from "react-native";
import * as React from "react";
import { Card } from 'react-native-paper';
import CreateEventForm from "./createEventForm"

function createEventScreen() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Card style={{padding:20}}>
            <CreateEventForm/>
          </Card>   
      </View>
    );
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      paddingTop: '5%',
      backgroundColor: 'transparent',
      padding: 20,
    },
    paragraph: {
      margin: 24,
      fontSize: 18,
      fontWeight: 'bold',
      textAlign: 'center',
    },
  });

  export default createEventScreen;