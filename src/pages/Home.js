import React, { useState, useEffect, useCallback } from 'react';
import {TouchableOpacity, ScrollView, Text, AsyncStorage, StyleSheet, RefreshControl} from 'react-native';
import {ToastAndroid} from 'react-native';
import ShimmerPlaceHolder from 'react-native-shimmer-placeholder';

import AppointmentList from '../components/AppointmentList';

export default function Home({navigation}){

    const [name, setname] = useState('');
    const hourList = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24];
    const [visible, setVisible] = useState(false);
    const [refreshing, setRefreshing] = useState(false);

    Home.navigationOptions = {
        headerRight: () => (
            <TouchableOpacity style={styles.headerButton} onPress={() => {navigation.navigate('Settings')}}>
               <Text style={styles.headerText}>Configurações</Text>
            </TouchableOpacity>
        )
    }

    useEffect(() => {
        AsyncStorage.getItem('name').then(name => setname(name));
        AsyncStorage.removeItem('hour');

        setTimeout(()=> {setVisible(true)}, 1000);
    }, []);

    const onRefresh =  useCallback(() => {
            setRefreshing(true);



            setTimeout(() => {setRefreshing(false), 2000})
       }, [refreshing]);

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
    }

    return(
        <ScrollView style={styles.scrollView} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}>
            <ShimmerPlaceHolder style={styles.shimmer} autoRun={true} visible={visible}>
                <Text style={styles.welcomeText}>Olá, {name} estes são os horários de hoje</Text>
            </ShimmerPlaceHolder>
            {hourList.map(hour => <AppointmentList
                                    key={hour}
                                    time={hour}
                                    reservedText=''
                                    />
                                    )}
            <TouchableOpacity style={styles.button} onPress={handleNavigate}>
                <Text style={styles.textButton}>Marque um horário</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {navigation.navigate('Settings')}}>
                <Text>Settings</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    welcomeText:{
        fontSize: 17,
        fontWeight: 'bold',
        alignSelf: 'center',
        backgroundColor: '#FFF',
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

    scrollView: {
        backgroundColor: '#FFF',
    },

    shimmer: {
        width: '100%',
    },

    headerButton: {
        marginRight: 10,
        backgroundColor: '#f05a5b',
    },

    headerText: {
        color: '#fff'
    },
});