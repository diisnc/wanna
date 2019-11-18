import React, { Component } from 'react';
import { View, StyleSheet, Image, Button } from 'react-native';
global.Buffer = global.Buffer || require('buffer').Buffer;
import { globalStyle, defaultNavigator } from './style';

class Wanna extends Component {
	render() {
		return (
			<View style={styles.container}>
				<Image style={styles.logo} source={require('../assets/logo.png')} />
			</View>
		);
	}
}

export default Wanna;

const styles = StyleSheet.create({
	container: {
		justifyContent: 'center',
		alignItems: 'center'
	},
	logo: {
		width: '50%',
		height: '50%'
	}
});
