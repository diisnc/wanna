import App from './App'
import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View } from 'react-native';
import { registerRootComponent } from 'expo';

registerRootComponent(App);

AppRegistry.registerComponent('wanna', () => App);