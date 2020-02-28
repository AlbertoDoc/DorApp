import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, AsyncStorage, TouchableOpacity} from 'react-native';
import ShimmerPlaceHolder from 'react-native-shimmer-placeholder';

import api from '../services/api';

export default function AppointmentList({ time, textTime, reservedText, navigation }){
    const [appointments, setAppointments] = useState('');
    const [visible, setVisible] = useState(false);
    const [switchValue, setSwitchValue] = useState(false);
    
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

    useEffect(() => {
        async function loadAppointments(){
            const response = await api.get('/appointments', {
                params: {time}
            });

            setAppointments(response.data);
        }

        async function getThemeOnAsync(){
            const value = await AsyncStorage.getItem('colorValue');
            if(value === 'true'){
                setSwitchValue(true);
            }
            else{
                setSwitchValue(false);
            }
        }
        
        getThemeOnAsync();
        loadAppointments();

        setTimeout(()=> {
            setVisible(true);
        }, 5000);
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


    function puttingButtons(reservedText){
        if(reservedText == 'Livre'){
            return (
                <View>
                    <TouchableOpacity style={styles.button} onPress={handleButton}>
                        <Text style={styles.textButton}>Reservar</Text>
                    </TouchableOpacity>
                </View>
            );
        }
        else{
            return (<View />);
        }
    }

    async function handleButton(){
        await AsyncStorage.setItem('hour', time.toString());
        //const navigation = useNavigation();

        navigation.navigate('Appointment');
    }
    
    return (
        <View style={styles.container}>
            <ShimmerPlaceHolder style={styles.shimmerAppointment} colorShimmer={["#FFF", "#f05a5b", "#FFF"]} autoRun={true} visible={visible}>
                <Text style={switchValue ? [styles.text ,styles.textDark] : [styles.text, styles.textLight]}>{transformPropsString(time)} | {isReserved(reservedText, appointments)}</Text>
            </ShimmerPlaceHolder>
            <View>
                <ShimmerPlaceHolder style={styles.shimmerAppointmentButton} colorShimmer={["#FFF", "#f05a5b", "#FFF"]} autoRun={true} visible={visible}>
                    {puttingButtons(isReserved(reservedText, appointments))}
                </ShimmerPlaceHolder>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        borderWidth: 1,
        borderColor: '#888',
        marginVertical: 5,
        marginHorizontal: 70,
        borderRadius: 10,
    },

    text: {
        fontSize: 16,
        paddingBottom: 3,
        alignSelf: 'center',
        paddingTop: 6,
    },

    textLight: {
        color: '#222',
    },

    textDark: {
        color: '#FFF',
    },

    button: {
        backgroundColor: '#f05a5b',
        borderRadius: 25,
        alignItems: 'center',
        marginHorizontal: '30%',
        paddingVertical: 3,
        marginBottom: 10,
    },

    textButton: {
        fontSize: 14,
        color: '#FFF'
    },

    shimmerAppointment: {
        width: 250,
        paddingTop: 8,
        height: 20,
        marginHorizontal: 7,
    },

    shimmerAppointmentButton: {
        height: 30,
        alignSelf: 'center',
        marginTop: 26,
        width: 90,
        borderRadius: 25,
        marginBottom: 15,
    },
});