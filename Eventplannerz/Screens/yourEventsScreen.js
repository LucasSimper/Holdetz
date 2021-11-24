import {
  SafeAreaView,
  FlatList,
  Button,
  StyleSheet,
  Text,
  View,
  StatusBar,
} from "react-native";
import * as React from "react";
import { getDatabase, ref, query, child, get, orderByChild, equalTo, onValue } from "firebase/database";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";

const yourEventsScreen = ({ navigation }) => {

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button onPress={() => navigation.navigate("Create Event")}
                title="Create Event" />
      ),
    });
  }, [navigation]);

  const auth = getAuth();
  const user = auth.currentUser;
  const [events, setEvents] = useState({});
  const db = getDatabase();

useEffect(() => {
  const yourEventQuery = query(ref(db, 'events'), orderByChild('UserID'), equalTo(user.uid))
  onValue(yourEventQuery, (snapshot) => {
    if (snapshot.exists) {
      console.log(snapshot.val());
      setEvents(snapshot.val());
    } else {
      console.log("No data Available")
    }
})
}, []);

  const eventsArr = Object.keys(events).map((key) => {
    events[key].id = key;
    return events[key];
  });

  const Item = ({ title }) => (
    <View style={styles.item}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );

  const renderItem = ({ item }) => <Item title={item.id} />;

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={eventsArr}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});

export default yourEventsScreen;
