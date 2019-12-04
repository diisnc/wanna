import React, { Component } from 'react';
import { View, StyleSheet, Image, Button, Dimensions, ActivityIndicator } from 'react-native';
global.Buffer = global.Buffer || require('buffer').Buffer;
import { globalStyle, defaultNavigator } from './style';
import { HitTestResultTypes } from 'expo/build/AR';
const { width, height } = Dimensions.get('window');

class Wanna extends Component {
	render() {
		return (
			<View style={styles.container}>
				<Image
					style={styles.logo}
					resizeMode="contain"
					source={require('../assets/full_logo.png')}
				/>
				<ActivityIndicator size="large" color="#3498DB" />
			</View>
		);
	}
}

export default Wanna;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-around',
		alignItems:'center'
	},
	logo: {
        width: 150,
        height: 150
	}
});
