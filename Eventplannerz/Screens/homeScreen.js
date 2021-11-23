import {Button, StyleSheet, Text, View} from "react-native";
import * as React from "react";


function homeScreen({navigation}) {
    return (
      <View style={{ flex: 1, alignItems: 'center' }}>
        <Button title="Your Events" onPress={() => navigation.navigate('Your Events')}  />
      </View>
    );
  }

  export default homeScreen;