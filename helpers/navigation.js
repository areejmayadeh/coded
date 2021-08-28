import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet, Text } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { TBCharacterList } from '../screens/TBCharacterList';
import { TBCharacterDetails } from '../screens/TBCharacterDetails';

const Stack = createStackNavigator()
const StackNavigator = ({ navigation, route }) => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerTintColor: 'black',
                headerTruncatedBackTitle: '',
                headerBackTitle: '',
                headerTitleAlign: 'center',
                headerLeftContainerStyle: styles.headerLeftContainerStyle,
            }}
            initialRouteName="Home"
        >
            <Stack.Screen
                name="Home"
                component={TBCharacterList}
                options={{
                    title: '',
                    headerTransparent: true,
                }}
            />
            <Stack.Screen
                name="TBCharacterDetails"
                component={TBCharacterDetails}
                options={{
                    title: '',
                    headerTransparent: true,
                }}
            />
        </Stack.Navigator>
    );
}
const config = {
    screens: {
        TBCharacterDetails: 'details/?id',
        Home: 'characters',
    },
};
const MainStackNavigator = () => {
    const linking = {
        prefixes: "mycoded://",
        config
    };
    return (
        <NavigationContainer linking={linking} fallback={<Text>Loading...</Text>} >
            <StackNavigator />
        </NavigationContainer>
    )
}

const styles = StyleSheet.create({
    headerLeftContainerStyle: {
        paddingHorizontal: 10
    },
});

export { MainStackNavigator }