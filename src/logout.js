
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CommonActions } from '@react-navigation/native';



async function logou(navigation) {
    const value = await AsyncStorage.getItem('jwt');
    var bearer = 'Bearer ' + value;

    await fetch('https://api-nodejs-todolist.herokuapp.com/user/logout', {
        method: 'POST',
        headers: {
            "Authorization": bearer,
            'Content-Type': 'application/json'
        },
    }).then((response) => response.json()).then(async (res) => {
        console.log(res);
        if (res.success) {
            await AsyncStorage.removeItem('jwt');
            const resetAction = CommonActions.reset({
                index: 1,
                routes: [{ name: "SignUp" }]
            });
            navigation.dispatch(resetAction);
        }
    });
}

export const logout = logou;