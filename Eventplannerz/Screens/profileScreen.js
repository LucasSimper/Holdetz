import React from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
import firebase from 'firebase';

function profileScreen() {
    const handleLogOut = async () => {
        await firebase.auth().signOut();
    };

    if (!firebase.auth().currentUser) {
        return <View><Text>Not found</Text></View>;
    }

    return (
        <View style={styles.container} >
            <Text>Current user: {firebase.auth().currentUser.email}</Text>
            <Button onPress={() => handleLogOut()} title="Log out" />
        </View>
    );

}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingTop: '5%',
        backgroundColor: '#ecf0f1',
        padding: 8,
    },
});

  export default profileScreen;