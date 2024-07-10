import React, { useEffect } from 'react';
import { View, } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { getCurrentPosition } from '@core/services/geolocationService';


interface Props {
  navigation: any
}

const LoadingScreen: React.FC<Props> = (props) => {
  useEffect(() => {

    const _bootstrapAsync = async () => {      
      const token = await AsyncStorage.getItem('token');
      if (token) {
        getCurrentPosition().then((position) => {
          AsyncStorage.setItem('position', JSON.stringify(position))
        })
      }
      console.log('token', token)
      props.navigation.replace(token ? 'App' : 'Auth');
    };
    _bootstrapAsync()
  }, [])
  return (<View></View>);
}

export default LoadingScreen