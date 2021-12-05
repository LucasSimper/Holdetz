
import * as React from 'react';
import { View, Text, Platform, FlatList, StyleSheet, Button, Alert } from 'react-native';
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
  remove,
} from "firebase/database";
import { getAuth, onAuthStateChanged } from "firebase/auth";



const singleEventScreen = ({route,navigation}) => {
    const [event,setEvent] = useState({});

    useEffect(() => {
        /*Henter event values og sætter dem*/
        setEvent(route.params.event[1]);

        /*Når vi forlader screen, tøm object*/
        return () => {
            setEvent({})
        }
    });

    const handleEdit = () => {
        // Vi navigerer videre til EditEvent skærmen og sender eventet videre med
        const event = route.params.event
        navigation.navigate('Edit Event', { event });
    };

    // Vi spørger brugeren om han er sikker
    const confirmDelete = () => {
        /*Er det mobile?*/
        console.log("penis");
            Alert.alert('Are you sure?', 'Do you want to delete the event?', [
                { text: 'Cancel', style: 'cancel' },
                // Vi bruger this.handleDelete som eventHandler til onPress
                { text: 'Delete', style: 'destructive', onPress: () => handleDelete() },
            ]);
        };

    // Vi sletter det aktuelle event
    const  handleDelete = () => {
        const id = route.params.event[0];
        try {
            const db = getDatabase();
            console.log(id);
            const userRef = ref(db, "events/");
            console.log("penis");
            userRef.remove().then(function() {
                console.log("Remove succeeded.")
             })
             .catch(function(error) {
                console.log("Remove failed: " + error.message)
             });
            navigation.goBack();
        } catch (error) {
            Alert.alert(error.message);
        }
    };


    if (!event) {
        return <Text>No data</Text>;
    }

    //all content
    return (
        <View style={styles.container}>
            <Button title="Edit" onPress={() => handleEdit()} />
            <Button title="Delete" onPress={() => handleDelete()} />
            {
                Object.entries(event).map((item,index)=>{
                    return(
                        <View style={styles.row} key={index}>
                            {/*Vores event keys navn*/}
                            <Text style={styles.label}>{item[0]} </Text>
                            {/*Vores event values navne */}
                            <Text style={styles.value}>{item[1]}</Text>
                        </View>
                    )
                })
            }
        </View>
    );
}

export default singleEventScreen;

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'flex-start' },
    row: {
        margin: 5,
        padding: 5,
        flexDirection: 'row',
    },
    label: { width: 100, fontWeight: 'bold' },
    value: { flex: 1 },
});