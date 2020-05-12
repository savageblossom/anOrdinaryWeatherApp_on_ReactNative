import React from 'react';
import { View, Text, StyleSheet, ImageBackground, ScrollView } from 'react-native';
import Header from './components/Header';
import CurrentWeather from './components/CurrentWeather';

const App = () => {
  return (
      <ScrollView style={ styles.container }>
        <Header />
        <CurrentWeather />
      </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#4d70f2',
    flex: 1,
    paddingTop: 20,
    paddingRight: 20,
    paddingBottom: 50,
    paddingLeft: 20
  },
})

export default App;
