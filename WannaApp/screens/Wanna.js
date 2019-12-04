import React, { Component } from 'react';
import { StyleSheet, Text, TextInput, View, Platform, TouchableOpacity, Dimensions, ScrollView, Keyboard } from 'react-native';
global.Buffer = global.Buffer || require('buffer').Buffer;
import { Button, theme } from '../galio';
import { globalStyle, defaultNavigator } from './style';

import Logo from '../components/Logo';

const { width } = Dimensions.get('screen');

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

				<Button shadowless 
					color='#3498DB' 
					style={[styles.button, styles.shadow]}
					onPress={() => this.props.navigation.navigate('Login')}>
					Login
				</Button>

				<Button shadowless 
					color='#3498DB' 
					style={[styles.button, styles.shadow]}
					onPress={() => this.props.navigation.navigate('Register')}>
					Registo
				</Button>

				<View style={styles.signupTextCont}>
					<Text style={styles.signupText}>Todos os direitos reservados ©</Text>
				</View>

			</View>
		);
	}
}

export default Wanna;

const styles = StyleSheet.create({
	container : {
		backgroundColor:'white',
		flex: 1,
		alignItems:'center',
		justifyContent :'center'
	  },
	shadow: {
		shadowColor: 'black',
		shadowOffset: { width: 0, height: 2 },
		shadowRadius: 4,
		shadowOpacity: 0.2,
		elevation: 2
	},
	button: {
		marginBottom: theme.SIZES.BASE,
		width: width - (theme.SIZES.BASE * 3.5),
		borderRadius: 25,
		paddingVertical: 13
	},
		signupTextCont : {
	  flexGrow: 1,
	  alignItems:'flex-end',
	  justifyContent :'center',
	  paddingVertical:16,
	  flexDirection:'row'
	},
	signupText: {
		color:'rgba(128,128,128, 0.7)',
		fontSize:16
	},
	signupButton: {
		color:'#3498DB',
		fontSize:16,
		fontWeight:'500'
	},
	signupTextCont : {
		flexGrow: 1,
		alignItems:'flex-end',
		justifyContent :'center',
		paddingVertical:16,
		flexDirection:'row'
	},
	signupText: {
		  color:'rgba(128,128,128, 0.7)',
		  fontSize:16
	},
	signupButton: {
		  color:'#3498DB',
		  fontSize:16,
		  fontWeight:'500'
	}
});