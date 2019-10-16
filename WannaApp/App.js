import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

import { createBottomTabNavigator } from 'react-navigation'
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import Inspire from './screens/Inspire'
import Wanted from './screens/Wanted'
import Combine from './screens/Combine'
import Add from './screens/Add'
import Profile from './screens/Profile'


export default createBottomTabNavigator({
  Inspire: {
    screen: Inspire,
    navigationOptions: {
      tabBarLabel: 'INSPIRE',
      tabBarIcon: ({ tintColor }) => (
        <MaterialCommunityIcons name="home-outline" color={tintColor} size={24} />
      )
    }
  },
  Wanted: {
    screen: Wanted,
    navigationOptions: {
      tabBarLabel: 'WANTED',
      tabBarIcon: ({ tintColor }) => (
        <MaterialCommunityIcons name="heart-outline" color={tintColor} size={24} />
      )
    }
  },
  Add: {
    screen: Add,
    navigationOptions: {
      tabBarLabel: 'ADD',
      tabBarIcon: ({ tintColor }) => (
        <Image source={require('./assets/logo64.png')} style={{ height: 24, width: 24}} />
      )
    }
  },
  Combine: {
    screen: Combine,
    navigationOptions: {
      tabBarLabel: 'COMBINE',
      tabBarIcon: ({ tintColor }) => (
        <MaterialCommunityIcons name="vector-combine" color={tintColor} size={24} />
      )
    }
  },
  Profile: {
    screen: Profile,
    navigationOptions: {
      tabBarLabel: 'PROFILE',
      tabBarIcon: ({ tintColor }) => (
        <MaterialIcons name="person-outline" color={tintColor} size={24} />
      )
    }
  }
}, {
    tabBarOptions: {
      activeTintColor: 'red',
      inactiveTintColor: 'grey',
      style: {
        backgroundColor: 'white',
        borderTopWidth: 0,
        shadowOffset: { width: 5, height: 3 },
        shadowColor: 'black',
        shadowOpacity: 0.5,
        elevation: 5
      }
    }
  })

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
