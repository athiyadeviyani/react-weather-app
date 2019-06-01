import React from 'react';
import { StyleSheet, Text, View, Animated } from 'react-native';

// Gets weather data from OpenWeatherMap API
// import { API_KEY } from './utils/WeatherAPIKey';

// Gets the weather boilerplate from ./components/Weather.js
import Weather from './components/Weather';

import { DangerZone } from 'expo';
const { Lottie } = DangerZone;

const API_KEY = 'ef071deb3c1819ac2538b11ea90ec5c4';

export default class App extends React.Component {
  state = {
    isLoading: true,
    location: null,
    temperature: 0,
    weatherCondition: null,
    error: null
  };

  // Function that deals with the JSON object retrieved
  // We need two things from the JSON object
  // 1. Temperature
  // 2. Weather condition

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      position => {
        this.fetchWeather(position.coords.latitude, position.coords.longitude);
      },
      error => {
        this.setState({
          error: 'Error Getting Weather Condtions'
        });
      }
    );
  }

  // JSON FETCH
  fetchWeather(lat, lon) {
    fetch(
      `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&APPID=${API_KEY}&units=metric`
    )
    // curl GET http://api.openweathermap.org/data/2.5/weather?lat=25&lon=20&APPID=f912f47ecdb51b40d3cc18100c5ec865&units=metric
      .then(res => res.json())
      .then(json => {
        // console.log(json);
        this.setState({
          location: json.name,
          temperature: json.main.temp,
          weatherCondition: json.weather[0].main,
          isLoading: false
        });
      });
  }

  render() {
    const { isLoading, location, weatherCondition, temperature } = this.state;
    return (
      <View style={styles.container}>
        {isLoading ? (
          <View style={styles.loadingContainer}>
            <Text style={styles.loadingText}>Fetching The Weather</Text>
          </View>
        ) : (
          <Weather location={location} weather={weatherCondition} temperature={temperature} />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff'
  },
  loadingText: {
    fontSize: 30
  }
});