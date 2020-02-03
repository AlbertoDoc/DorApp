import React, { useState, useEffect } from 'react';
import {KeyboardAvoidingView, AsyncStorage, View, Text, StyleSheet, TextInput, TouchableOpacity} from 'react-native';

import api from '../services/api';

export default function Login({navigation}){
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')

    /*  useEffect tem como parametro uma função e depois um array de dependencias
        se este array for passado como vazio ele somente executara esta função
        uma vez no começo */
    useEffect(() => {
        AsyncStorage.getItem('user').then(user => {
            if(user){
                navigation.navigate('Home');
            }
        })
    }, []);

    async function handleSubmit(){
        const response = await api.post('/sessions', {
            name: name,
            email: email,
        });

        const { _id } = response.data;

        await AsyncStorage.setItem('user', _id);
        await AsyncStorage.setItem('name', name);
        // Aqui ele salva 'techs' tbm, n sei se tenho q passar mais alguma info aqui

        navigation.navigate('Home');
    }

    return(
        <KeyboardAvoidingView behavior="padding" style={styles.container}>    
            <Text style={styles.welcomeText}>Bem vindo a DorApp</Text>
            <View style={styles.form}>
                <Text style={styles.label}>SEU NOME *</Text>
                <TextInput
                style={styles.input}
                placeholder="Seu Nome"
                placeholderTextColor="#999"
                autoCorrect={false}
                autoCapitalize='words'
                value={name}
                onChangeText={text => setName(text)}
                />
                <Text style={styles.label}>SEU EMAIL *</Text>
                <TextInput
                style={styles.input}
                placeholder="Seu E-MAIL"
                placeholderTextColor="#999"
                keyboardType='email-address'
                autoCapitalize='none'
                value={email}
                onChangeText={text => setEmail(text)}
                />
                <TouchableOpacity onPress={handleSubmit} style={styles.button}>
                    <Text style={styles.buttonText}>Logar</Text>
            </TouchableOpacity>
            </View>
        </KeyboardAvoidingView> 
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f05a5b',
    },
    welcomeText: {
        fontSize: 19,
        color: '#fff',
    },
    form: {
        alignSelf: 'stretch',
        paddingHorizontal: 30,
        marginTop: 30,
    },
    label: {
        paddingRight: '30%',
        color: '#fff',
    },
    input: {
        borderWidth: 1,
        borderColor: '#fff',
        fontSize: 13,
        borderRadius: 25,
        marginBottom: 10,
        paddingHorizontal: 15,
        backgroundColor: '#fff',
        paddingVertical: 4,
        marginTop: 2,
    },
    button: {
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        height: 42,
        borderRadius: 25,
        marginTop: 8,
    },
    buttonText: {
        color: '#f05a5b',
        fontWeight: 'bold',
    },
});