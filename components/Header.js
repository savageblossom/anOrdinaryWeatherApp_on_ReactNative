import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const getTime = () => {
    let DATE = new Date(),
        dayWeekWord, dayDate;

    let dayNames = {
      0: 'Sunday',
      1: 'Monday',
      2: 'Tuesday',
      3: 'Wednesday',
      4: 'Thursday',
      5: 'Friday',
      6: 'Saturday'
    }

    dayWeekWord   = dayNames[DATE.getDay()];
    dayDate       = DATE.getDate();

    return `${dayWeekWord}, ${dayDate}`;
}

const Header = () => {
    return (
        <View style={{alignItems: 'center'}}>
            <Text style={ styles.getTime }>
                { getTime() }
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    getTime: {
        color: '#ccd6fc',
        fontSize: 24,
        fontFamily: 'Comfortaa_VariableFont',
        fontWeight: '300'
    }
})

export default Header;