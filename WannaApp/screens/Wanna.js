import React, { Component } from 'react';
import { StyleSheet, View, Platform, Button } from 'react-native';
global.Buffer = global.Buffer || require('buffer').Buffer;
import { globalStyle, defaultNavigator } from './style';

import Logo from '../components/Logo';

class Wanna extends Component {
	
	// Builds header of the page
	buildHeader() {
		this.startHeaderHeight = 80;
		if (Platform.OS == 'android') {
			this.startHeaderHeight = 60;
		}
		return (
			// Safe Box for Android
			<View
				style={{
					height: this.startHeaderHeight,
					backgroundColor: 'white'
				}}>
				<View
					style={{
						height: '95%',
						flexDirection: 'row',
						justifyContent: 'center',
						alignItems: 'center',
						backgroundColor: 'white'
					}}>
				</View>
			</View>
		);
	}	

	render() {
		return (
			<View style={styles.container}>

				{this.buildHeader()}
				
				<Logo />

				<View style={styles.authBtnWrap}>
					<Button
						onPress={() => this.props.navigation.navigate('Login')}
						buttonStyle={[globalStyle.btn, styles.authBtn]}
						titleStyle={globalStyle.btnText}
						title="Login"
					/>
					<Button
						onPress={() => this.props.navigation.navigate('Register')}
						buttonStyle={[globalStyle.btn, styles.authBtn]}
						titleStyle={globalStyle.btnText}
						title={'Registo'}
					/>
					<Button
						onPress={() => this.props.navigation.navigate('Main')}
						buttonStyle={[globalStyle.btn, styles.authBtn]}
						titleStyle={globalStyle.btnText}
						title={'Mudar'}
					/>

				</View>
			</View>
		);
	}
}

export default Wanna;

const styles = StyleSheet.create({
	container: {
		backgroundColor:'white',
		justifyContent: 'center',
		alignItems: 'center'
	},
	authBtnWrap: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		width: '100%',
		paddingHorizontal: 15
	},
	authBtn: {
		marginHorizontal: 0,
		marginVertical: 18,
		width: '80%',
		alignSelf: 'center',
		backgroundColor: '#000000'
	}
});
