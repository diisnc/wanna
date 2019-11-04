import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

class Combine extends Component {
	render() {
		return (
			<View style={styles.container}>
				<Text>Combine</Text>
			</View>
		);
	}
}
export default Combine;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	}
});
