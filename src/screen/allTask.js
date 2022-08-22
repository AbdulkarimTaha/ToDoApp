import React from "react";
import { useEffect, useState } from "react";
import { View, FlatList, Text } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

const AllTask = () => {
    const [data, setData] = useState([]);
    async function getAllTask() {
        const value = await AsyncStorage.getItem('jwt')

        var bearer = 'Bearer ' + value
        try {
            var i = await fetch('https://api-nodejs-todolist.herokuapp.com/task', {
                method: 'GET',
                headers: {
                    "Authorization": bearer,
                    'Content-Type': 'application/json'
                },
            }).then((response) => response.json());
            
            i.data.map((item) => {
                setData(data => [...data,{ id: item._id, completed: item.completed, description: item.description, owner: item.owner }])
            });
    
        }
        catch (e) {
            console.log(e);
        }
    }

 
    useEffect(() => { getAllTask()  ; }, [])
    return (<>
        <FlatList

            data={data}
            renderItem={({ item }) => (<View >
                <Text>{item.description}</Text>
                </View>)} keyExtractor={(item) => item.id} /></>)
}


export default AllTask;