import React, {useState} from 'react';
import {Button,Text,
    View,
    TextInput,
    ActivityIndicator,
    StyleSheet,
} from 'react-native';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";


function signUpForm() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isCompleted, setCompleted] = useState(false)
    const [errorMessage, setErrorMessage] = useState(null)

    const renderButton = () => {
        return <Button onPress={() => handleSubmit()} title="Create user" />;
    };

    const auth = getAuth();

    const handleSubmit = async() => {
        try {
           await createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            // ...
          })
        } catch (error){
           setErrorMessage(error.message)
        }

    }

    return (
        <View>
            <Text style={styles.header}>Sign up</Text>
            <TextInput
                placeholder="email"
                value={email}
                onChangeText={(email) => setEmail(email)}
                style={styles.inputField}
            />
            <TextInput
                placeholder="password"
                value={password}
                onChangeText={(password) => setPassword(password)}
                secureTextEntry
                style={styles.inputField}
            />
            {errorMessage && (
                <Text style={styles.error}>Error: {errorMessage}</Text>
            )}
            {renderButton()}
        </View>
    );
}


const styles = StyleSheet.create({
    error: {
        color: 'red',
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

export default signUpForm;