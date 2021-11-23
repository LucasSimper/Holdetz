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
import { getDatabase, ref, child, get } from "firebase/database";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";

const yourEventsScreen = ({ navigation }) => {
  const auth = getAuth();
  const user = auth.currentUser;
  const [events, setEvents] = useState({});
  const dbRef = ref(getDatabase());

  useEffect(() => {
    get(child(dbRef, `events/` + user.uid))
      .then((snapshot) => {
        if (snapshot.exists()) {
          console.log(snapshot.val());
          setEvents(snapshot.val());
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
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

      <Button
        title="Create Event"
        onPress={() => navigation.navigate("Create Event")}
      />

      <Button title="See events" onPress={() => console.log(eventsArr)} />
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
