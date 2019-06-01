// Boilerplate for every weather condition will be the same
// Divided into two views: header and body
// header will show the weather condition icon and temperature
// body will display the text associated with the weather condition

// Define two containers inside the main container: headerContainer and bodyContainer
// Note: define Weather component not as a class but as a function, in order to receive props and since it won't be managing a state

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import PropTypes from 'prop-types';
import { weatherConditions } from '../utils/WeatherConditions';

const Weather = ({ location, weather, temperature }) => {
  return (
    <View
      style={[
        styles.weatherContainer,
        { backgroundColor: weatherConditions[weather].color },
      ]}>
      <View style={styles.tempgrp}>
        <View style={styles.headerContainer}>
          <MaterialCommunityIcons
            size={72}
            name={weatherConditions[weather].icon}
            color={'#fff'}
          />

          <Text style={styles.tempText}>{temperature}˚</Text>
        </View>
        <Text style={styles.loc}>{location}</Text>
      </View>

      <View style={styles.bodyContainer}>
        <Text style={styles.title}>{weatherConditions[weather].title}</Text>
        <Text style={styles.subtitle}>
          {weatherConditions[weather].subtitle}
        </Text>
      </View>
    </View>
  );
};

Weather.PropTypes = {
  temperature: PropTypes.number.isRequired,
  weather: PropTypes.string,
};

const styles = StyleSheet.create({
  weatherContainer: {
    flex: 1,
  },
  headerContainer: {
    flex: 1,  
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',  
  },
  tempgrp: {
    flex: 0.5,
    paddingTop: 50,
    flexDirection: 'column',
  },
  tempText: {
    fontSize: 72,
    color: '#fff',
  },
  bodyContainer: {
    flex: 2,
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
    paddingLeft: 25,
    marginBottom: 40,
  },
  title: {
    fontSize: 60,
    color: '#fff',
  },
  loc: {
    fontSize: 25,
    color: '#fff',
    textAlign: 'center', // <-- the magic
  },
  subtitle: {
    fontSize: 24,
    color: '#fff',
  },
});

export default Weather;
