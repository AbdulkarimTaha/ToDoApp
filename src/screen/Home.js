import React from "react";
import { View, Text, TextInput, StyleSheet, Button, ActivityIndicator } from "react-native";
import { useState } from "react";
import { logout } from "../logout";
import AsyncStorage from '@react-native-async-storage/async-storage';

const Home = ({ navigation }) => {
    const [search, setSearch] = useState("");
    const [task, setTask] = useState("");



    return (
        <View >
            <View style={{ flexDirection: "row", width: "100%", marginBottom: 8 }}>
                <TextInput
                    style={styles.input}
                    onChangeText={setSearch}
                    value={search}
                />
                <Button title="search" />
            </View>
            <View style={{ flexDirection: "row", width: "100%", marginBottom: 8 }}>
                <TextInput
                    style={styles.input}
                    onChangeText={setTask}
                    value={task}
                />
                <Button title="Add Task" onPress={() => addTask(task)} />
            </View>

            <Button title="All Task" onPress={() => navigation.navigate("AllTask")} />
            <View style={{ height: 20 }} />
            <Button title="logout" onPress={() => logout(navigation)} />

        </View>);
}


async function addTask(task) {

    const value = await AsyncStorage.getItem('jwt');
    var bearer = 'Bearer ' + value;
    if (task == "") {
        console.log("need Task");
    }
    else {

        try {
            fetch('https://api-nodejs-todolist.herokuapp.com/task', {
                method: 'POST',
                headers: {
                    "Authorization": bearer,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "description": task
                })
            }).then((response) => response.json()).then((res) => console.log(res));
        }
        catch (e) {
            console.log(e);
        }
    }
}

const styles = StyleSheet.create({
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        width: "70%"
    },
});



export default Home;