import React, { useState, useEffect } from 'react';
import Loading from "./Loading";
import {Alert} from "react-native";
import * as Location from "expo-location";
import axios from "axios";

const API_KEY = "68f19769fc7102f8863dfbf22a5d9787";

export default class extends React.Component{
  state = {
    isLoading : true
  };
  getWeather = async(latitude,longitude) => {
    const {
      data : {
        main: { temp },
        weather
      }
    } = await axios.get(
      `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`);
      console.log(data);
  this.setState({
    isLoading : false,
  })
}
  getLocation = async() => {
    try {
      await Location.requestPermissionsAsync();
      const{
        coords : {latitude, longitude}
      } = await Location.getCurrentPositionAsync();
      this.getWeather(latitude, longitude);
    } catch (error) {
      Alert.alert("Can't find you.", "So sad");
    }
  };
  componentDidMount() {
    this.getLocation();
  }
  render(){
    const {isLoading, temp, condition} = this.state;
    return isLoading ? <Loading /> : null
  }
}