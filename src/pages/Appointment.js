import React from 'react';
import {View, Text, StyleSheet, StatusBar, } from 'react-native';

export default function Appointment(){
    return(
        <View style={styles.view}>
            <View style={styles.viewStyle}>
                <Text style={styles.text}>Marque seu horário</Text>
            </View>
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
})