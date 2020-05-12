import React from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';
import Header from './components/Header';
import CurrentWeather from './components/CurrentWeather';

const App = () => {
  return (
      <View style={ styles.container }>
        <Header />
        <CurrentWeather />
      </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#4d70f2',
    flex: 3,
    padding: 20
  },
})

export default App;
