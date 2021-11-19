import React from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
import { getAuth, signOut } from "firebase/auth";



function profileScreen() {
    const auth = getAuth();
    const handleLogOut = async () => {
        await signOut(auth).then(() => {
          // Sign-out successful.
        }).catch((error) => {
          // An error happened.
        });
    };

    if (!getAuth().currentUser) {
        return <View><Text>Not found</Text></View>;
    }

    return (
        <View style={styles.container} >
            <Text>Current user: {getAuth().currentUser.email}</Text>
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