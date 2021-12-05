
import * as React from 'react';
import {View, Text, FlatList, TouchableOpacity, StyleSheet} from 'react-native';
import {useEffect, useState} from "react";
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

const yourEventsScreen = ({navigation}) => {

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

    // Vi viser ingenting hvis der ikke er data
    if (!events) {
        return <Text>Loading...</Text>;
    }

   const handleSelectEvent = id => {
        /*Her søger vi direkte i vores array af events og finder event objektet som matcher idet vi har tilsendt*/
        const event = Object.entries(events).find( event => event[0] === id /*id*/)
        navigation.navigate('Single Event Page', { event });
    };

    // Flatlist forventer et array. Derfor tager vi alle values fra vores events objekt, og bruger som array til listen
    const eventArray = Object.values(events);
    const eventKeys = Object.keys(events);

    return (
        <FlatList
            data={eventArray}
            // Vi bruger eventKeys til at finde ID på den aktuelle bil og returnerer dette som key, og giver det med som ID til CarListItem
            keyExtractor={(item, index) => eventKeys[index]}
            renderItem={({ item, index }) => {
                return(
                    <TouchableOpacity style={styles.container} onPress={() => handleSelectEvent(eventKeys[index])}>
                        <Text>
                            {item.name} {item.place}
                        </Text>
                    </TouchableOpacity>
                )
            }}
        />
    );
}

export default yourEventsScreen;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        borderWidth: 1,
        borderRadius:10,
        margin: 5,
        padding: 5,
        height: 50,
        justifyContent:'center'
    },
    label: { fontWeight: 'bold' },
});


/*
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
*/