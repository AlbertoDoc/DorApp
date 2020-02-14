import React, { useState, useEffect } from 'react';
import { View, Text, Switch, StyleSheet, AsyncStorage } from 'react-native';

export default function Settings(){

    const [switchValue, setSwitchValue] = useState(false);

    useEffect(() => {
        async function verifyColorInAsync(){
            const temp = await AsyncStorage.getItem('colorValue')
            
            if(temp === 'true'){
                setSwitchValue(true);
            }
            else {
                setSwitchValue(false);
            }
        }
        verifyColorInAsync();

    }, []);

    async function handleSwitch(value){
        setSwitchValue(value);

        AsyncStorage.setItem('colorValue', value.toString());
    }

    return(
        <>
        <View style={switchValue ? styles.generalDarkView : styles.generalView}>
                <View style={switchValue ? styles.darkView : styles.containerSwitch}>
                    <Text style={switchValue ? styles.darkTextSwitch : styles.textSwitch}>Ativar modo escuro</Text>
                    <Switch
                    styles={styles.switcher}
                    value={switchValue}
                    onValueChange={(value) => handleSwitch(value)}
                    thumbColor={'#E83B3B'}
                    trackColor={{true: '#F17373'}}
                    />
                </View>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    generalView: {
        flex: 1,
    },

    generalDarkView: {
        flex: 1,
        backgroundColor: '#121212',
    },

    containerSwitch: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 8,
    },

    textSwitch: {
        fontSize: 20,
        paddingVertical: 12,
        paddingLeft: 3,
    },

    darkView: {
        backgroundColor: '#121212',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 8,
    },

    darkTextSwitch: {
        color: '#FFF',
        backgroundColor: '#121212',
        fontSize: 20,
        paddingVertical: 12,
        paddingLeft: 3,
    },
});