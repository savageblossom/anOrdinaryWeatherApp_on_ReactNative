import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Button } from 'react-native';
import DataFetcher from './DataFetcher';

const CurrentWeather = () => {
    let [City, setCity]                             = useState('Kyiv'),
        [cityInput, setCityInput]                   = useState('Simferopol'),
        // below states are from DataFetcher component
        [CurrentWeather, setCurrentWeather]         = useState(''),
        [DailyForecat,   setDailyForecat]           = useState(''),
        [HourlyForecast, setHourlyForecast]         = useState('')

    useEffect(() => {
        changeCity()
    }, [City])

    const transferCurrentWeather    = childData => setCurrentWeather(childData)
    const transferDailyForecat      = childData => setDailyForecat(childData)
    const transferHourlyForecast    = childData => setHourlyForecast(childData)

    const changeCity = () => setCity(cityInput)

    return (
        <View style={{ paddingTop: 30 }}>
            <DataFetcher 
                        currentCity = { City }
                        transferCurrentWeather  = { transferCurrentWeather }
                        transferDailyForecat    = { transferDailyForecat   }
                        transferHourlyForecast  = { transferHourlyForecast }
                    />
            <View>
                <Text style={styles.city}>
                    { City }
                </Text>
                <Text style={styles.temp}>
                { CurrentWeather[0] }
                </Text>
            </View>
            <TextInput
                style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginTop: 45 }}
                placeholder="Type your city"
                onChangeText={cityInput => setCityInput(cityInput)}
                defaultValue={cityInput}
            />
            <Button
                onPress={ () => { changeCity() } }
                title="change city"
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