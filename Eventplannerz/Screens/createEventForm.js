import React, {useState} from 'react';
import {Button,Text,
    View,
    TextInput,
    ActivityIndicator,
    StyleSheet,
} from 'react-native';
import firebase from 'firebase';
import { getAuth, onAuthStateChanged } from "firebase/auth";

import { getDatabase, ref, set } from "firebase/database";

function createEvent() {
   // const [userid]
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [location, setLocation] = useState('');
    const [isCompleted, setCompleted] = useState(false)
    const [errorMessage, setErrorMessage] = useState(null)

    const renderButton = () => {
        return <Button onPress={() => handleSubmit()} title="Create event" />;
    };

    const handleSubmit = async() => {
        try {
            const db = getDatabase();
            set(ref(db, 'events/' + userId), {
              Description: description,
              Time: time,
              Date: date,
              Location : location
            });
        } catch (error){
           setErrorMessage(error.message)
        }

    }
return(
    <View>
            <Text style={styles.header}>Description</Text>
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
                secureTextEntry
                style={styles.inputField}
            />
            <TextInput
                placeholder="date"
                value={date}
                onChangeText={(date) => setDate(date)}
                secureTextEntry
                style={styles.inputField}
            />
            <TextInput
                placeholder="location"
                value={location}
                onChangeText={(location) => setLocation(location)}
                secureTextEntry
                style={styles.inputField}
            />
            {errorMessage && (
                <Text style={styles.error}>Error: {errorMessage}</Text>
            )}
            {renderButton()}
        </View>
)
}



export default createEvent;