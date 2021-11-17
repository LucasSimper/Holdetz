import * as React from "react";
import homeScreen from "./homeScreen";
import yourEventsScreen from "./yourEventsScreen";
import createEventScreen from "./createEventScreen";
import { createStackNavigator } from '@react-navigation/stack';


const Stack = createStackNavigator()

function StackNavigator() {
    return (
        <Stack.Navigator
            initialRouteName="Home"
        >
            <Stack.Screen name="Home" component={homeScreen}
            options={{
                headerTitleAlign: 'center',
                headerTitleStyle: {color: 'white'},
                headerStyle: {backgroundColor: '#ba6262'}}
                }
            />
        
            <Stack.Screen name="Your Events" component={yourEventsScreen} options={{
                headerTitleStyle: { textAlign: 'right', color: 'white' },
                headerStyle: {backgroundColor: '#62bab5'}
            }} />

            <Stack.Screen name="Create Event" component={createEventScreen} options={{
                headerTitleStyle: { textAlign: 'right', color: 'white' },
                headerStyle: {backgroundColor: '#62bab5'}
            }} />

        </Stack.Navigator>
    )
}

export default StackNavigator;