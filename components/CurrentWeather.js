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
            case 'broken clouds':                return weatherIcons[0]
            case 'clear sky':                    return weatherIcons[1]
            case 'scattered clouds':             return weatherIcons[2]
            case 'overcast clouds':              return weatherIcons[2]
            case 'few clouds':                   return weatherIcons[3]
            case 'mist':                         return weatherIcons[4]
            case 'shower rain':                  return weatherIcons[5]
            case 'rain':                         return weatherIcons[5]
            case 'light rain':                   return weatherIcons[5]
            case 'light intensity shower rain':  return weatherIcons[5]
            case 'snow':                         return weatherIcons[6]
            case 'thunderstorm':                 return weatherIcons[7]
        }
    }    




    const ItemHourlyForecast = ({time, temp, weather}) => {
        return (
            <View style={styles.itemHourlyForecast}>
                <View style={{ flexDirection: 'column'}}>
                    <View>
                        <Text style={styles.itemHourlyForecastTime}>
                            {time}
                        </Text>
                    </View>
                    <View>
                        <Text style={styles.itemHourlyForecastTemp}>
                            {temp}
                        </Text>
                    </View>
                    <View>
                        <Image
                            style={ styles.itemHourlyForecastIcon }
                            source={ weatherNames(weather) }
                        />
                    </View>
                </View>
            </View>
        )
    }


    // DAILY DAILY DAILY DAILY DAILY DAILY DAILY DAILY DAILY DAILY DAILY DAILY DAILY DAILY DAILY

    const ItemDailyForecast = ({date, minTemp, maxTemp, weather}) => {
        return (
            <View style={styles.itemDailyForecast}>
                <View style={{ flexDirection: 'row'}}>

                    <View style={{ justifyContent: 'center', marginRight: 150}}>
                        <Text style={styles.itemDailyForecastTime}>
                            {date}
                        </Text>
                    </View>

                    <View style={styles.itemTempBox}>
                        <View>
                            <Image
                                style={ styles.itemDailyForecastIcon }
                                source={ weatherNames(weather) }
                            />
                        </View>
                        <View>
                            <Text style={styles.itemDailyForecastTemp}>
                                {minTemp}
                            </Text>
                        </View>
                        <View>
                            <Text style={styles.itemDailyForecastTime}>
                                {maxTemp}
                            </Text>
                        </View>
                    </View>
                </View>
            </View>
        )
    }

    // 


    return (
        <View style={{ backgroundColor: '#4d70f2' }}>
            <DataFetcher 
                        currentCity = { City }
                        transferCurrentWeather  = { transferCurrentWeather }
                        transferDailyForecat    = { transferDailyForecat   }
                        transferHourlyForecast  = { transferHourlyForecast }
                    />
            <View style={{backgroundColor: '#4d70f2', padding: 20, paddingTop: 0}}>
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
                    // showsHorizontalScrollIndicator={false}
                    data={HourlyForecast}
                    renderItem={({item}) => 
                                    <ItemHourlyForecast 
                                        time={ item['time'] }
                                        temp={ item['temp']}
                                        weather={ item['weather']}
                                    />
                                }   
                />
            
            </View>

            

            <View style={styles.itemMiscWeather}>
                <View style={styles.itemMiscColumn}>
                    <Text style={styles.itemMiscWeatherTime}>Humidity</Text>
                    <Text style={styles.itemMiscWeatherTemp}>{CurrentWeather[2]}</Text>
                </View>
                <View style={styles.itemMiscColumn}>
                    <Text style={styles.itemMiscWeatherTime}>Air Pressure</Text>
                    <Text style={styles.itemMiscWeatherTemp}>{CurrentWeather[3]}</Text>
                </View>
                <View style={styles.itemMiscColumn}>
                    <Text style={styles.itemMiscWeatherTime}>Wind Speed</Text>
                    <Text style={styles.itemMiscWeatherTemp}>{CurrentWeather[4]}</Text>
                </View>
                <View style={styles.itemMiscColumn}>
                    <Text style={styles.itemMiscWeatherTime}>Wind Degree</Text>
                    <Text style={styles.itemMiscWeatherTemp}>{CurrentWeather[5]}</Text>
                </View>
            </View>
                                
            


            <View style={{backgroundColor: '#708df3', marginTop: 50, paddingLeft: 20, paddingRight: 20, paddingBottom: 15, borderRadius: 25}}>
                <FlatList
                    style={{ flexDirection: 'row' }}
                    data={DailyForecat}
                    renderItem={({item}) => 
                                <ItemDailyForecast 
                                    date={ item['date'] }
                                    weather={ item['weather']}
                                    minTemp={ item['minTemp'] }
                                    maxTemp={ item['maxTemp']}
                                />
                        }
                />
            
            </View>


            <View style={{padding: 20}}>
                <TextInput
                    style={{ height: 40, color: '#fff', borderColor: 'gray', borderWidth: 1, marginTop: 45, backgroundColor: '#708df3', textAlign:'center' }}
                    placeholder="Type your city"
                    onChangeText={cityInput => setCityInput(cityInput)}
                    defaultValue={cityInput}
                />
                <Button
                    onPress={ () => { changeCity() } }
                    title="change city"
                    color="#333d5e"
                    accessibilityLabel="Learn more about this purple button"
                />
            </View>
            
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


    //
    // itemHourlyforecast 
    //
    itemHourlyForecast: {
        // marginRight: -25,
        flexDirection: 'row',
        width: 105,
        height: 120,
        padding: 20,
        backgroundColor: '#4d70f2'
    },
    itemHourlyForecastTime: {
        color: '#fff',
        fontSize: 16,
        fontFamily: 'Comfortaa_VariableFont',
        fontWeight: '300'
    },
    itemHourlyForecastTemp: {
        color: '#fff',
        fontSize: 16,
        fontFamily: 'Comfortaa_VariableFont',
        fontWeight: 'bold'
    },
    itemHourlyForecastIcon: {
        marginTop: 5,
        width: 46,
        height: 46
    },


    // itemMiscCurrentWeather
    itemMiscWeather: {
        // marginRight: -25,
        flexDirection: 'row',
        width: 150,
        height: 40,
        paddingTop: 15,
        paddingLeft: 20
    },
    itemMiscWeatherTime: {
        color: '#fff',
        fontSize: 14,
        fontFamily: 'Comfortaa_VariableFont',
        fontWeight: '300'
    },
    itemMiscWeatherTemp: {
        color: '#fff',
        fontSize: 16,
        fontFamily: 'Comfortaa_VariableFont',
        fontWeight: 'bold'
    },
    itemMiscWeatherIcon: {
        marginTop: 5,
        width: 46,
        height: 46
    },
    itemMiscColumn: {
        marginRight: 12
    },

    // itemDailyForecast
    itemDailyForecast: {
        flex: 3,
        flexDirection: 'row',
        alignItems: 'stretch',
        marginTop: 15,
        marginBottom: 15
    },
    itemDailyForecastTime: {
        color: '#fff',
        fontSize: 16,
        fontFamily: 'Comfortaa_VariableFont',
        fontWeight: '300',
        
    },
    itemDailyForecastTemp: {
        color: '#fff',
        fontSize: 16,
        fontFamily: 'Comfortaa_VariableFont',
        fontWeight: 'bold',
        marginRight: 10
    },
    itemDailyForecastIcon: {
        marginTop: 5,
        width: 32,
        height: 32,
        marginRight: 10
    },
    itemDayBox: {

    },
    itemTempBox: {
        flexDirection: 'row',
        alignItems: 'center',
    }

})

export default CurrentWeather;