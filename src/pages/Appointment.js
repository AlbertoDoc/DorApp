import React, { useState, useEffect } from 'react';
import {Picker, View, Text, StyleSheet, StatusBar, AsyncStorage, } from 'react-native';
import transformPropsString from '../components/AppointmentList';

import api from '../services/api';

export default function Appointment(){

    const [name, setname] = useState('');
    var time = [1,2];

    useEffect(() => {
        AsyncStorage.getItem('name').then(name => setname(name));
        /*async function loadHour(){
            const response = await api.get('/appointments', {
                params: {time}
            });
            
            console.log(response.data);
        }
        loadHour();*/
    }, []);

    return(
        <View style={styles.view}>
            <View style={styles.viewStyle}>
                <Text style={styles.text}>Marque seu horário</Text>
            </View>
            <Text style={styles.informationText}>{name}, preencha as informações abaixo para agendar seu horário</Text>
            <View style={styles.viewForm}>
                <Text>Horário desejado</Text>
            </View>
        </View>
    );
}
//Finish the form and connect with db
const styles = StyleSheet.create({
    text: {
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
        alignSelf: 'center',
    },
    viewStyle: {
        backgroundColor: '#f05a5b',
    },
    viewForm: {
        paddingHorizontal: '7%',
        borderRadius: 3,
        borderColor: '#333',
        borderWidth: 1,
        marginTop: 7,
        marginHorizontal: '7%',
    },

    informationText: {
        alignSelf: 'center',
        paddingHorizontal: '7%',
    },
})