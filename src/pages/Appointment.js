import React, { useState, useEffect } from 'react';
import {View, Text, StyleSheet, AsyncStorage, TouchableOpacity, ToastAndroid} from 'react-native';

import api from '../services/api';


export default function Appointment({ navigation }){

    const [hour, setHour] = useState('');
    const [name, setName] = useState('');
    const [userID, setUserID] = useState('');

    useEffect(() => {
        AsyncStorage.getItem('name').then(setName);
        AsyncStorage.getItem('hour').then(setHour);
        AsyncStorage.getItem('user').then(setUserID);

    }, []);

    function transformPropsString(time){
        if(time == 1){
            return '00h ~ 01h';
        }
        else if(time == 2){
            return '01h ~ 02h';
        }
        else if(time == 3){
            return '02h ~ 03h';
        }
        else if(time == 4){
            return '03h ~ 04h';
        }
        else if(time == 5){
            return '04h ~ 05h';
        }
        else if(time == 6){
            return '05h ~ 06h';
        }
        else if(time == 7){
            return '06h ~ 07h';
        }
        else if(time == 8){
            return '07h ~ 08h';
        }
        else if(time == 9){
            return '08h ~ 09h';
        }
        else if(time == 10){
            return '09h ~ 10h';
        }
        else if(time == 11){
            return '10h ~ 11h';
        }
        else if(time == 12){
            return '11h ~ 12h';
        }
        else if(time == 13){
            return '12h ~ 13h';
        }
        else if(time == 14){
            return '13h ~ 14h';
        }
        else if(time == 15){
            return '14h ~ 15h';
        }
        else if(time == 16){
            return '15h ~ 16h';
        }
        else if(time == 17){
            return '16h ~ 17h';
        }
        else if(time == 18){
            return '17h ~ 18h';
        }
        else if(time == 19){
            return '18h ~ 19h';
        }
        else if(time == 20){
            return '19h ~ 20h';
        }
        else if(time == 21){
            return '20h ~ 21h';
        }
        else if(time == 22){
            return '21h ~ 22h';
        }
        else if(time == 23){
            return '22h ~ 23h';
        }
        else if(time == 24){
            return '23h ~ 00h';
        }
    }

    async function handleYesButton(time, user_id){
        const response = await api.post('/appointments', {
            time
        }, {
            headers: { user_id }
        });

        ToastAndroid.show('Horário reservado com sucesso!', ToastAndroid.SHORT);
    }

    function handleNoButton(){
        navigation.navigate('Home');
    }

    return(
        <View style={styles.view}>
            <View style={styles.viewForm}>
                <Text style={styles.confirmationText}>{name}, você escolheu o horário {transformPropsString(parseInt(hour))} tem certeza que deseja continuar?</Text>
                <View style={styles.buttonView}>
                    <TouchableOpacity style={styles.yesButton} onPress={() => handleYesButton(hour, userID)}>
                        <Text style={styles.yesButtonText}>Sim</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.noButton} onPress={handleNoButton}>
                        <Text style={styles.noButtonText}>Não</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    viewForm: {
        paddingHorizontal: '7%',
        borderRadius: 12,
        borderColor: '#333',
        borderWidth: 1,
        marginTop: 25,
        marginHorizontal: '7%',
        backgroundColor: '#f05a5b',
    },

    confirmationText: {
        color: '#fff',
        fontSize: 17,
        paddingVertical: 10,
        textAlign: 'justify',
    },

    buttonView: {
        flexDirection: 'row',
        alignSelf: 'center',
        marginBottom: 30,
        marginTop: 10,
    },

    yesButton: {
        backgroundColor: '#fff',
        marginRight: 50,
        paddingVertical: 7,
        paddingHorizontal: 30,
        borderRadius: 12,
    },

    yesButtonText: {
        color: '#f05a5b',
        fontSize: 16,
    },

    noButton: {
        backgroundColor: '#fff',
        paddingHorizontal: 30,
        paddingVertical: 7,
        borderRadius: 12,
    },

    noButtonText: {
        color: '#f05a5b',
        fontSize: 16,
    },
})