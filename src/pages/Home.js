import React, { useState, useEffect } from 'react';
import {TouchableOpacity, ScrollView, Text, AsyncStorage, StyleSheet} from 'react-native';
import {ToastAndroid} from 'react-native';
import ShimmerPlaceHolder from 'react-native-shimmer-placeholder';

import AppointmentList from '../components/AppointmentList';

export default function Home({navigation}){

    const [name, setname] = useState('');
    const hourList = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24];
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        AsyncStorage.getItem('name').then(name => setname(name));
        AsyncStorage.removeItem('hour');

        setTimeout(()=> {setVisible(true)}, 1000);
    }, []);

    async function handleNavigate(){
        //This function only redirect to Appointment's page if some hour was previously selected
        if(await checkingButtonClick()){
            navigation.navigate('Appointment');
        }
        else{
            ToastAndroid.show('Nenhum horário foi selecionado!', ToastAndroid.SHORT);
        }
    }

     async function checkingButtonClick(){
        const value = await AsyncStorage.getItem('hour');
        if(value == undefined || value == null){
            return false;
        }
        else{
            // Means that Async Storage hour is not empty, i.e the user click on some hour's button
            return true;
        }
        //nesta funcao deve ser feita a verificacao se o botao de selecionar horario foi clicado
        //para fechar issue
    }

    return(
        <ScrollView style={styles.scrollView}>
            <ShimmerPlaceHolder style={styles.shimmer} autoRun={true} visible={visible}>
                <Text style={styles.welcomeText}>Olá, {name} estes são os horários de hoje</Text>
            </ShimmerPlaceHolder>
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

    disabledButton: {
        backgroundColor: '#333',
    },

    shimmer: {
        width: '100%',
    },

    scrollView: {
        backgroundColor: '#FFF',
    },
});