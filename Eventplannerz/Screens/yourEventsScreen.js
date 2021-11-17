import {Button, StyleSheet, Text, View} from "react-native";
import * as React from "react";

function yourEventsScreen({navigation}) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Button title="Create Event" onPress={() => navigation.navigate('Create Event')}  />
      </View>
    );
  }

  export default yourEventsScreen;