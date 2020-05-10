import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const CurrentWeather = () => {
    let [isLoading, setLoading] = useState(true),
        [Temp, setTemp]         = useState(null),
        [City, setCity]         = useState(null)

    useEffect(() => {
        fetch('http://api.openweathermap.org/data/2.5/weather?q=Simferopol&appid=499bd0871b9c479cd64981e4b4a8f249')
            .then((response) => response.json())
            .then((json) => {

                const temp = Math.round(json.main.temp - 273.15)
                const responseTemp = temp > 0 ? '+' + temp + '°' : temp + '°'


                const responseCity = json.name
                setLoading(false);
                setTemp(responseTemp)
                setCity(responseCity)
            })
    })

    const renderData = data => {
        return (
            data
        )
    }

    return (
        <View style={{ paddingTop: 30 }}>
            <Text style={styles.city}>
                { isLoading ? "Loading" : renderData(City) }
            </Text>
            <Text style={styles.temp}>
                { isLoading ? "Loading" : renderData(Temp) }
            </Text>
            
            <Text> 
                {} 
            </Text>
            <Button
                title="Click!"
                color="#841584"
                accessibilityLabel="Learn more about this purple button"
            />
        </View>
    )
}

const styles = StyleSheet.create({
    city: {
        fontSize: 45,
        fontFamily: 'Ruda-Black',
        color: '#ccd6fc'
    },
    temp: {
        fontSize: 90,
        fontFamily: 'Ruda-Black',
        color: '#ccd6fc'
    }
})

export default CurrentWeather;