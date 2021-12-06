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

const editEventScreen = ({route,navigation}) => {

    const initialState = {
        Name: '',
        ImageURL: '',
        Description: '',
        Time: '',
        Date: '',
        Location: '',
        UserID: '',
        Private: ''
    }

    const [newEvent,setNewEvent] = useState(initialState);

    useEffect(() => {
            const Event = route.params.event[1];
            setNewEvent(Event)
        /*Fjern data, når vi går væk fra screenen*/
        return () => {
            setNewEvent(initialState)
        };
    }, []);

    const changeTextInput = (name,event) => {
        setNewEvent({...newEvent, [name]: event});
    }

    const handleSave = () => {

        const { Name, ImageURL, Description, Time, Date, Location, UserID, Private} = newEvent;
        const id = route.params.Event[0];
            try {
                firebase
                    .database()
                    .ref(`/events/${id}`)
                    // Vi bruger update, så kun de felter vi angiver, bliver ændret
                    .update({ Name, ImageURL, Description, Time, Date, Location, UserID, Private });
                // Når bilen er ændret, går vi tilbage.
                Alert.alert("Din info er nu opdateret");
                const Event = [id,newEvent]
                navigation.navigate("singleEventScreen",{Event});
            } catch (error) {
                console.log(`Error: ${error.message}`);
            }
        }

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
                                    onChangeText={(event) => changeTextInput(key,event)}
                                    style={styles.input}
                                />
                            </View>
                        )
                    })
                }
                {/*Hvis vi er inde på edit Event, vis save changes i stedet for add Event*/}
                <Button title={"Save changes"} onPress={() => handleSave()} />
            </ScrollView>
        </SafeAreaView>
    );
}


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




export default editEventScreen;
