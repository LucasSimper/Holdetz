import {
  SafeAreaView,
  FlatList,
  Button,
  StyleSheet,
  Text,
  View,
  StatusBar,
  Image,
} from "react-native";
import * as React from "react";
import {
  getDatabase,
  ref,
  query,
  child,
  get,
  orderByChild,
  equalTo,
  onValue,
} from "firebase/database";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";

const yourEventsScreen = ({ navigation }) => {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button
          onPress={() => navigation.navigate("Create Event")}
          title="Create Event"
        />
      ),
    });
  }, [navigation]);

  const auth = getAuth();
  const user = auth.currentUser;
  const [events, setEvents] = useState({});
  const db = getDatabase();

  useEffect(() => {
    const yourEventQuery = query(
      ref(db, "events"),
      orderByChild("UserID"),
      equalTo(user.uid)
    );
    onValue(yourEventQuery, (snapshot) => {
      if (snapshot.exists) {
        //console.log(snapshot.val());
        setEvents(snapshot.val());
      } else {
        console.log("No data Available");
      }
    });
  }, []);

  const eventsArr = Object.keys(events).map((key) => {
    events[key].id = key;
    return events[key];
  });

  const Item = ({ title, picture, date, time }) => (
    <View style={styles.item}>
      <Image
        style={{ width: 320, height: 120, alignSelf: "center" }}
        source={{ uri: picture }}
      />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.dateTime}>Date: {date}  Time: {time}</Text>
    </View>
  );

  const renderItem = ({ item }) => (
    <Item title={item.Name} picture={item.ImageURL} date={item.Date} time={item.Time}/>
  );

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
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 20,
    alignSelf: "center",
  },
  dateTime: {
    fontSize: 15,
    alignSelf: "center"
  }
});

export default yourEventsScreen;
