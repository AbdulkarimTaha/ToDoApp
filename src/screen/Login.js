import React from "react";
import { View, Text, TextInput, StyleSheet, Button, ActivityIndicator } from "react-native";
import { useState } from "react";
import { CommonActions } from '@react-navigation/native';


import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = ({navigation}) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    function check() {

        if (email == "" || password == "") {
            console.log("need Data");
        }
        else {
            loginFun();
        }
    }


    function loginFun() {

        try {
            fetch('https://api-nodejs-todolist.herokuapp.com/user/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "email": email,
                    "password": password
                })
            }).then((response) => response.json()).then(async (res) => {
                if (res.token) {
                    await AsyncStorage.setItem('jwt', res.token);
                    const resetAction = CommonActions.reset({
                        index: 2,
                        routes: [{ name: "Home"}]
                    });
                    navigation.dispatch(resetAction);
                } else {
                }

            });

        } catch (e) {
            console.log(e);
        }
    }

    return (
        <View >
            <TextInput
                style={styles.input}
                onChangeText={setEmail}
                value={email}
            />
            <TextInput
                style={styles.input}
                onChangeText={setPassword}
                value={password}
            />
            <Button title="login" onPress={() => check()} />
        </View>
    );

}

const styles = StyleSheet.create({
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
});


export default Login;