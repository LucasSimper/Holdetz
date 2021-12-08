import React, {useEffect, useState } from "react";
import {
  Button,
  Text,
  View,
  TextInput,
  ActivityIndicator,
  StyleSheet,
  Switch,
  Alert,
  ScrollView,
  SafeAreaView
} from "react-native";
import { getAuth, onAuthStateChanged } from "firebase/auth";

import { getDatabase, ref, push, set } from "firebase/database";

function createEvent({ navigation }) {
  const [name, setName] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [location, setLocation] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);
  const [isCompleted, setCompleted] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const toggleSwitch = () => setIsPrivate(previousState => !previousState);

  const renderButton = () => {
    return <Button onPress={() => handleSubmit()} title="Create event" />;
  };

  const handleSubmit = async () => {
    try {
      const auth = getAuth();
      const user = auth.currentUser;
      const db = getDatabase();
      const postListRef = ref(db, "events/");
      const newPostRef = push(postListRef);
      set(newPostRef, {
        Name: name,
        ImageURL: imageURL,
        Description: description,
        Time: time,
        Date: date,
        Location: location,
        UserID: user.uid,
        Private: isPrivate,
        Invited: [],
        Going: [user.uid]
      });
      navigation.navigate("Your Events")
    } catch (error) {
      setErrorMessage(error.message);
    }
  };
  return (
    <View>
      <Text style={styles.header}>New Event</Text>
      <TextInput
        placeholder="Name"
        value={name}
        onChangeText={(name) => setName(name)}
        style={styles.inputField}
      />
      <TextInput
        placeholder="ImageURL"
        value={imageURL}
        onChangeText={(imageURL) => setImageURL(imageURL)}
        style={styles.inputField}
      />
      <TextInput
        placeholder="description"
        value={description}
        onChangeText={(description) => setDescription(description)}
        style={styles.inputField}
      />
      <TextInput
        placeholder="time"
        value={time}
        onChangeText={(time) => setTime(time)}
        style={styles.inputField}
      />
      <TextInput
        placeholder="date"
        value={date}
        onChangeText={(date) => setDate(date)}
        style={styles.inputField}
      />
      <TextInput
        placeholder="location"
        value={location}
        onChangeText={(location) => setLocation(location)}
        style={styles.inputField}
      />
      <Text>Private: </Text>
      <Switch
        trackColor={{ false: "#767577", true: "#81b0ff" }}
        onValueChange={toggleSwitch}
        value={isPrivate}
      />
      {errorMessage && <Text style={styles.error}>Error: {errorMessage}</Text>}
      {renderButton()}
    </View>
  );
}

const styles = StyleSheet.create({
  error: {
    color: "red",
  },
  inputField: {
    borderWidth: 1,
    margin: 10,
    padding: 10,
  },
  header: {
    fontSize: 40,
  },
});

export default createEvent;


/*


import React, {useEffect, useState } from "react";
import {
  Button,
  Text,
  View,
  TextInput,
  StyleSheet,
  Alert,
  ScrollView,
  SafeAreaView
} from "react-native";
import { getAuth, onAuthStateChanged } from "firebase/auth";

import { getDatabase, ref, push, set } from "firebase/database";

const createEventScreen = ({navigation,route}) => {

    const initialState = {
        name: '',
        place: '',
        time: '',
        date: ''
    }

    const [newEvent,setNewEvent] = useState(initialState);

    //Returnere true, hvis vi er på edit event
    const isEditEvent = route.name === "Edit Event";

    useEffect(() => {
        if(isEditEvent){
            const event = route.params.event[1];
            setNewEvent(event)
        }
        //Fjern data, når vi går væk fra screenen
        return () => {
            setNewEvent(initialState)
        };
    }, []);

    const changeTextInput = (name,event) => {
        setNewEvent({...newEvent, [name]: event});
    }

    const handleSave = () => {

        const { name, place, time, date } = newEvent;

        if(name.length === 0 || place.length === 0 || time.length === 0 || date.length === 0 ){
            return Alert.alert('Et af felterne er tomme!');
        }

        if(isEditEvent){
            const id = route.params.event[0];
            try {
                firebase
                    .database()
                    .ref(`/events/${id}`)
                    // Vi bruger update, så kun de felter vi angiver, bliver ændret
                    .update({ name, place, time, date });
                // Når bilen er ændret, går vi tilbage.
                Alert.alert("Din info er nu opdateret");
                const event = [id,newEvent]
                navigation.navigate("Event Details",{event});
            } catch (error) {
                console.log(`Error: ${error.message}`);
            }

        }else{

            try {
                firebase
                    .database()
                    .ref('/event/')
                    .push({ name, place, time, date });
                Alert.alert(`Saved`);
                setNewEvent(initialState)
            } catch (error) {
                console.log(`Error: ${error.message}`);
            }
        }

    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                {
                    Object.keys(initialState).map((key,index) =>{
                        return(
                            <View style={styles.row} key={index}>
                                <Text style={styles.label}>{key}</Text>
                                <TextInput
                                    value={newEvent[key]}
                                    onChangeText={(event) => changeTextInput(key,event)} //event her refererer ikke til vores event/begivenhed
                                    style={styles.input}
                                />
                            </View>
                        )
                    })
                }
                //Hvis vi er inde på edit event, vis save changes i stedet for add event
                <Button title={ isEditEvent ? "Save changes" : "Add event"} onPress={() => handleSave()} />
            </ScrollView>
        </SafeAreaView>
    );
}

export default createEventScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
    },
    row: {
        flexDirection: 'row',
        height: 30,
        margin: 10,
    },
    label: {
        fontWeight: 'bold',
        width: 100
    },
    input: {
        borderWidth: 1,
        padding:5,
        flex: 1
    },
});
*/