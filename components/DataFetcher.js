import React, { useState, useEffect } from 'react';
import {Text} from 'react-native';

const DataFetcher = ({ transferCurrentWeather, transferHourlyForecast, transferDailyForecat, currentCity }) => {
    const kelvinToCelsius = K    => Math.round(K - 273.15)
    const tempFancify     = temp => temp > 0 ? '+' + temp + '°' : temp + '°'
    const Fancify = {
        temp:       value => value > 0 ? '+' + value + '°' : value + '°',
        humid:      value => value + '%',
        pressure:   value => value + ' mm',
        speed:      value => value + ' m/s',
        deg:        value => value + '°'
    }

    //
    // Fetching daily forecast (up to 5 days)
    //
    const fetchDailyForecast = () => {
        const urlToFetch = `https://api.openweathermap.org/data/2.5/forecast?q=${ currentCity }&appid=499bd0871b9c479cd64981e4b4a8f249`;
        fetch(urlToFetch)
            .then((response) => response.json())
            .then((json) => {
                const responseList = []
                let time, listElement  = {}
                for(let i = 0; i <= (json.list).length-1; i++) {
                    time = (json.list[i].dt_txt).slice(11, 16)
                    if(time=="00:00") {
                        listElement = {}
                        listElement.date       = (json.list[i].dt_txt).slice(0, 10)
                        listElement.weather    = json.list[i].weather[0].description
                        listElement.minTemp    = Fancify.temp( kelvinToCelsius(json.list[i].main.temp_min) )
                        listElement.maxTemp    = Fancify.temp( kelvinToCelsius(json.list[i].main.temp_max) )
                        responseList.push(listElement)
                    }
                }
                transferDailyForecat(responseList)
                // console.log(responseList)
            }).catch((e) => console.log(e))
    }



    //
    // Fetching hourly forecast
    // Almost as same as previous fetcher, but it takes only first 4 elements
    // instead of every element with time "00:00"
    //
    const fetchHourlyForecast = () => {
        const urlToFetch = `https://api.openweathermap.org/data/2.5/forecast?q=${ currentCity }&appid=499bd0871b9c479cd64981e4b4a8f249`;
        fetch(urlToFetch)
            .then((response) => response.json())
            .then((json) => {
                const responseList = []
                let listElement = {}
                for(let i = 0; i <= 3; i++) {
                    listElement = {}
                    listElement.time    = (json.list[i].dt_txt).slice(11, 16)
                    listElement.weather = json.list[i].weather[0].description
                    listElement.temp    = Fancify.temp( kelvinToCelsius(json.list[i].main.temp) )
                    responseList.push(listElement)
                }
                transferHourlyForecast(responseList)
            }).catch((e) => console.log(e))
    }


    // 
    // Fetching current weather
    // 
    const fetchCurrentWeather = () => {
        const urlToFetch = `https://api.openweathermap.org/data/2.5/weather?q=${ currentCity }&appid=499bd0871b9c479cd64981e4b4a8f249`
        fetch(urlToFetch)
            .then((response) => response.json())
            .then((json) => {
                const jsonResponse = [
                    Fancify.temp(kelvinToCelsius(json.main.temp)), json.weather[0].description,// temperature, weather conditions 0, 1
                    Fancify.humid(json.main.humidity), Fancify.pressure(json.main.pressure),   // humidity, pressure              2, 3
                    Fancify.speed(json.wind.speed),    Fancify.deg(json.wind.deg)              // wind speed, wind degree         4, 5
                ]
                transferCurrentWeather(jsonResponse)
            }).catch((e) => console.log(e))
    }

    useEffect(() => {
        fetchCurrentWeather()
        fetchHourlyForecast()
        fetchDailyForecast()
    }, [currentCity])

    return (
        null
    )
}

export default DataFetcher;