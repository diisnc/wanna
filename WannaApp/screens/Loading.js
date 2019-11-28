import React, { Component } from 'react';
import { View, StyleSheet, Image, Button, Dimensions } from 'react-native';
global.Buffer = global.Buffer || require('buffer').Buffer;
import { globalStyle, defaultNavigator } from './style';
const { width, height } = Dimensions.get('window');

class Wanna extends Component {
	render() {
		return (
			<View>
				<Image
					style={styles.logo}
					resizeMode="contain"
					source={require('../assets/logo.png')}
				/>
			</View>
		);
	}
}

export default Wanna;

const styles = StyleSheet.create({
	logo: {
		maxHeight: height,
		maxWidth: width
	}
});
