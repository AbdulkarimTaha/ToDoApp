import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../screen/Home";
import Login from "../screen/Login";
import SignUp from "../screen/signUp";
import AllTask from "../screen/allTask";
import { Text } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect } from "react";



const Stack = createNativeStackNavigator();


const Navi = () => {

    const [isLoading, setIsLoading] = useState(false)
    const [token, setToken] = useState()

    useEffect(() => {
        setIsLoading(true)
        getKeyChain();
    }, [])

    async function getKeyChain() {

        try {
            const value = await AsyncStorage.getItem('jwt')
            console.log(value);
            setToken(value);
            setIsLoading(false)
        } catch (E) {
            console.log(E);
        }
    }

    if (isLoading) {
        return (
            <Text>
                isloading
            </Text>
        );
    }




    if (token == null) {
        return (
            <Stack.Navigator initialRouteName="SignUp">
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="SignUp" component={SignUp} />
                <Stack.Screen name="AllTask" component={AllTask} />
            </Stack.Navigator>

        );

    } else {
        return (
            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="SignUp" component={SignUp} />
                <Stack.Screen name="AllTask" component={AllTask} />
            </Stack.Navigator>

        );
    }


}

export default Navi;