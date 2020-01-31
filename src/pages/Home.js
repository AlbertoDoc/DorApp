import React, { useState, useEffect } from 'react';
import {TouchableOpacity, ScrollView, Text, AsyncStorage, StyleSheet} from 'react-native';

import AppointmentList from '../components/AppointmentList';

export default function Home({navigation}){

    const [name, setname] = useState('');
    const hourList = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24];

    useEffect(() => {
        AsyncStorage.getItem('name').then(name => setname(name));
    }, []);

    function handleNavigate(){
        navigation.navigate('Appointment');
    }

    return(
        <ScrollView>
            <Text style={styles.welcomeText}>Olá, {name} estes são os horários de hoje</Text>
            {hourList.map(hour => <AppointmentList
                                    key={hour}
                                    time={hour}
                                    reservedText=''
                                    style={styles.appointment}
                                    />
                                    )}
            <TouchableOpacity style={styles.button} onPress={handleNavigate}>
                <Text style={styles.textButton}>Marque um horário</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    welcomeText:{
        fontSize: 17,
        fontWeight: 'bold',
        alignSelf: 'center',
    },

    button: {
        backgroundColor: '#f05a5b',
        borderRadius: 25,
        alignItems: 'center',
        marginHorizontal: 70,
        marginTop: 10,
        marginBottom: 20,
        paddingVertical: 5,
    },

    textButton: {
        fontSize: 16,
        color: "#FFF",
    },

    view: {
        backgroundColor: '#f05a5b',
    },
});