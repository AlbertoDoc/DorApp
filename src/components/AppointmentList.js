import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';

import api from '../services/api';

export default function AppointmentList({ time, textTime, reservedText }){
    function transformPropsString(time){
        if(time == 1){
            textTime = '00h ~ 01h';
            return textTime;
        }
        else if(time == 2){
            textTime = '01h ~ 02h';
            return textTime;
        }
        else if(time == 3){
            textTime = '02h ~ 03h';
            return textTime;
        }
        else if(time == 4){
            textTime = '03h ~ 04h';
            return textTime;
        }
        else if(time == 5){
            textTime = '04h ~ 05h';
            return textTime;
        }
        else if(time == 6){
            textTime = '05h ~ 06h';
            return textTime;
        }
        else if(time == 7){
            textTime = '06h ~ 07h';
            return textTime;
        }
        else if(time == 8){
            textTime = '07h ~ 08h';
            return textTime;
        }
        else if(time == 9){
            textTime = '08h ~ 09h';
            return textTime;
        }
        else if(time == 10){
            textTime = '09h ~ 10h';
            return textTime;
        }
        else if(time == 11){
            textTime = '10h ~ 11h';
            return textTime;
        }
        else if(time == 12){
            textTime = '11h ~ 12h';
            return textTime;
        }
        else if(time == 13){
            textTime = '12h ~ 13h';
            return textTime;
        }
        else if(time == 14){
            textTime = '13h ~ 14h';
            return textTime;
        }
        else if(time == 15){
            textTime = '14h ~ 15h';
            return textTime;
        }
        else if(time == 16){
            textTime = '15h ~ 16h';
            return textTime;
        }
        else if(time == 17){
            textTime = '16h ~ 17h';
            return textTime;
        }
        else if(time == 18){
            textTime = '17h ~ 18h';
            return textTime;
        }
        else if(time == 19){
            textTime = '18h ~ 19h';
            return textTime;
        }
        else if(time == 20){
            textTime = '19h ~ 20h';
            return textTime;
        }
        else if(time == 21){
            textTime = '20h ~ 21h';
            return textTime;
        }
        else if(time == 22){
            textTime = '21h ~ 22h';
            return textTime;
        }
        else if(time == 23){
            textTime = '22h ~ 23h';
            return textTime;
        }
        else if(time == 24){
            textTime = '23h ~ 00h';
            return textTime;
        }
    }

    const [appointments, setAppointments] = useState('');

    useEffect(() => {
        async function loadAppointments(){
            const response = await api.get('/appointments', {
                params: {time}
            });

            //console.log(response.data.map(a => a.time));
            setAppointments(response.data);
        }

        loadAppointments();
    }, []);

    function isReserved(reservedText, appointments){
        let user;
        let user_id;
        if(appointments == ''){
            user = undefined;
            user_id = user;
        }
        else {
            user = appointments.map(a => a.user);
            user_id = user[0];
        }
        if(user_id === undefined){
            reservedText = 'Livre';
            return reservedText;
        }
        else {
            reservedText = 'Reservado';
            return reservedText;
        }
    }
    
    return (
        <View style={styles.container}>
            <Text style={styles.text}>{transformPropsString(time)} | {isReserved(reservedText, appointments)}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        borderWidth: 1,
        borderColor: '#888',
        marginVertical: 5,
        marginHorizontal: 70,
        borderRadius: 2,
    },

    text: {
        color: '#222',
        paddingBottom: 6,
        alignItems: 'center',
        alignSelf: 'center',
        paddingTop: 6,
    },
});