import React, { useState, useEffect, useCallback } from 'react';
import {TouchableOpacity, ScrollView, Text, AsyncStorage, StyleSheet, RefreshControl} from 'react-native';
import ShimmerPlaceHolder from 'react-native-shimmer-placeholder';

import AppointmentList from '../components/AppointmentList';

export default function Home({navigation}){

    const [name, setname] = useState('');
    const hourList = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24];
    const [visible, setVisible] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [switchValue, setSwitchValue] = useState(false);

    Home.navigationOptions = {
        headerRight: () => (
            <TouchableOpacity style={styles.headerButton} onPress={() => {navigation.navigate('Settings')}}>
               <Text style={styles.headerText}>Configurações</Text>
            </TouchableOpacity>
        )
    }

    useEffect(() => {
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
        AsyncStorage.getItem('name').then(name => setname(name));
        AsyncStorage.removeItem('hour');

        setTimeout(()=> {setVisible(true)}, 1000);
    }, []);

    const onRefresh =  useCallback(() => {
            setRefreshing(true);


            setTimeout(() => {setRefreshing(false), 2000})
       }, [refreshing]);

    return(
        <ScrollView style={switchValue ? styles.scrollViewDark : styles.scrollViewLight}>
            <ShimmerPlaceHolder style={styles.shimmer} autoRun={true} visible={visible}>
                <Text style={switchValue ? [styles.welcomeText, styles.welcomeDarkText] : [styles.welcomeText, styles.welcomeLightText]}>Olá, {name} estes são os horários de hoje</Text>
            </ShimmerPlaceHolder>
            {hourList.map(hour =>  <AppointmentList
                                        key={hour}
                                        time={hour}
                                        reservedText=''
                                        navigation={navigation}
                                        />
        )}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    scrollViewLight: {
        backgroundColor: '#FFF',
    },

    scrollViewDark: {
        backgroundColor: '#121212',
    },

    welcomeText:{
        fontSize: 17,
        fontWeight: 'bold',
        alignSelf: 'center',
    },

    welcomeLightText: {
        backgroundColor: '#FFF',
    },

    welcomeDarkText: {
        backgroundColor: '#121212',
        color: '#FFF',
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

    shimmer: {
        width: '100%',
    },

    headerButton: {
        marginRight: 10,
        backgroundColor: '#f05a5b',
    },

    headerText: {
        color: '#fff',
        marginVertical: 8,
    },
});