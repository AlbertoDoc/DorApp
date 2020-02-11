import React, { useState } from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';

export default function Settings(){

    const [switchValue, setSwitchValue] = useState(false);

    return(
        <>
            <View style={styles.containerSwitch}>
                <Text style={styles.textSwitch}>Ativar modo escuro</Text>
                <Switch
                value={switchValue}
                onValueChange={setSwitchValue}
                thumbColor={'#E83B3B'}
                trackColor={{true: '#F17373'}}
                />
            </View>
        </>
    );
}

const styles = StyleSheet.create({
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
});