import React from "react";
import { View, Text, TextInput, StyleSheet, Button, ActivityIndicator } from "react-native";
import { useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

import { CommonActions } from '@react-navigation/native';

const SignUp = ({ navigation }) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [age, setPAge] = useState("");


    function check() {
        if (email == "" || password == "" || name == "" || age == "") {
            console.log("need Data");
        }
        else {
            signUpFun();
        }
    }
    async function signUpFun() {

        try {
            await fetch('https://api-nodejs-todolist.herokuapp.com/user/register/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({

                    "name": name,
                    "email": email,
                    "password": password,
                    "age": age

                })
            }).then((response) => response.json()).then(async (res) => {
                if (res.token) {
                    await AsyncStorage.setItem('jwt', res.token);
                    const resetAction = CommonActions.reset({
                        index: 1,
                        routes: [{ name: "Home" }]
                    });
                    navigation.dispatch(resetAction);
                }

            });
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <View >
            <Text>Name</Text>
            <TextInput
                style={styles.input}
                onChangeText={setName}
                value={name}
            />
            <Text>age</Text>
            <TextInput
                style={styles.input}
                onChangeText={setPAge}
                value={age}
            />
            <Text>email</Text>
            <TextInput
                style={styles.input}
                onChangeText={setEmail}
                value={email}
            />
            <Text>password</Text>
            <TextInput
                style={styles.input}
                onChangeText={setPassword}
                value={password}
            />
            <Button title="SignUp" onPress={() => check()} />
            <View style={{ height: 20 }} />
            <Button title="Login" onPress={() => navigation.navigate("Login")} />



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


export default SignUp;