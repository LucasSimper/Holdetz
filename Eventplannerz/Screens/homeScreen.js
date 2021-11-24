import {Button, StyleSheet, Text, View} from "react-native";
import * as React from "react";


function homeScreen({navigation}) {

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button onPress={() => navigation.navigate("Your Events")}
                title="Your Events" />
      ),
    });
  }, [navigation]);

    return (
      <View style={{ flex: 1, alignItems: 'center' }}>
      </View>
    );
  }

  export default homeScreen;