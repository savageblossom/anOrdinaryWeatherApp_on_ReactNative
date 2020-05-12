import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Button, Image, FlatList } from 'react-native';
import DataFetcher from './DataFetcher';

const CurrentWeather = () => {
    let [City, setCity]                             = useState(''),
        [cityInput, setCityInput]                   = useState('Simferopol'),
        // below states are from DataFetcher component
        [CurrentWeather, setCurrentWeather]         = useState(''),
        [HourlyForecast, setHourlyForecast]         = useState(''),
        [DailyForecat,   setDailyForecat]           = useState('')

    useEffect(() => {
        changeCity()
    }, [City])

    const transferCurrentWeather    = childData => setCurrentWeather(childData)
    const transferHourlyForecast    = childData => setHourlyForecast(childData)
    const transferDailyForecat      = childData => setDailyForecat(childData)

    const changeCity = () => setCity(cityInput)



    const weatherIcons = [
        require('../assets/icons/brokenclouds.png'),
        require('../assets/icons/clearsky.png'), 
        require('../assets/icons/cloud.png'),
        require('../assets/icons/fewclouds.png'), 
        require('../assets/icons/mist.png'),
        require('../assets/icons/rain.png'), 
        require('../assets/icons/snow.png'), 
        require('../assets/icons/thunderstorm.png'), 
    ]

    const weatherNames = conditions => {
        // const vocabulary = {
        //     'broken clouds ':   weatherIcons[0],
        //     'clear sky':        'clear sky',
        //     'few clouds ':      'few clouds',
        //     'scattered clouds': 'cloud',
        //     'shower rain':      'rain',
        //     'rain':             'rain',
        //     'thunderstorm':     'thunderstorm',
        //     'snow':             'snow',
        //     'mist':             'mist',
        // }
        // return `vocabulary[conditions]`;
        switch(conditions) {
            case 'broken clouds':    return weatherIcons[0]
            case 'clear sky':        return weatherIcons[1]
            case 'scattered clouds': return weatherIcons[2]
            case 'few clouds':       return weatherIcons[3]
            case 'mist':             return weatherIcons[4]
            case 'shower rain':      return weatherIcons[5]
            case 'rain':             return weatherIcons[5]
            case 'snow':             return weatherIcons[6]
            case 'thunderstorm':     return weatherIcons[7]
        }
    }    




    const Item = ({time, temp, weather}) => {
        return (
            <View style={styles.item}>
                <View>
                    <Text style={styles.itemTime}>
                        {time}
                    </Text>
                </View>
                <View>
                    <Text style={styles.itemTime}>
                        {temp}
                    </Text>
                </View>
                <View>
                    <Image
                        style={ styles.currentWeatherIcon }
                        source={ weatherNames(weather) }
                    />
                </View>
                
            </View>
        )
    }


    const listTest = [1, 2, 3, 4, 5]


    return (
        <View style={{ paddingTop: 30, flex: 1 }}>


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
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={styles.temp}>
                    { CurrentWeather[0] }
                    </Text>
                    <Image
                        style={ styles.currentWeatherIcon }
                        source={ weatherNames(CurrentWeather[1]) }
                    />
                </View>
            </View>


            <View>
                <FlatList
                    style={{ flexDirection: 'row' }}
                    horizontal={true}
                    data={HourlyForecast}
                    renderItem={({item}) => 
                                <Item 
                                    time={ item['time'] }
                                    temp={ item['temp']}
                                    weather={ item['weather']}
                                />
                        }
                />
            
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
        color: '#ccd6fc',
    },
    currentWeatherIcon: {
        width: 64, 
        height: 64, 
        marginRight: 60,
        position: "relative",
        bottom: 20
    },
    temp: {
        fontSize: 90,
        fontFamily: 'Ruda-Black',
        color: '#ccd6fc'
    },

    item: {
        backgroundColor: '#f9c2ff',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
        flexDirection: 'row'
    },
    itemTime: {
        fontSize: 32,
    }
})

export default CurrentWeather;