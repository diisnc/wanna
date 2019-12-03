import React, { Component } from 'react';
import { StyleSheet, Text, TextInput, View, Platform, TouchableOpacity, Dimensions, ScrollView, Keyboard } from 'react-native';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { Button, theme } from '../galio';
import { login } from '../modules/auth/auth.api';
import { Ionicons, FontAwesome } from '@expo/vector-icons'

import Logo from '../components/Logo';

const { width } = Dimensions.get('screen');

class Login extends Component {
	constructor(props) {
		super(props);
	}

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
		const { handleSubmit } = this.props;
		const submitForm = e => {
			this.props.login(e.email, e.password);
		};
		
		// SCROLLVIEW EXPLANATION
		// 		'keyboardShouldPersistTaps' property allows to click the login bth with the keyboard opened. If removed, u have to click twice
		// 		
		// 		'keyboardDismissMode' is so the keyboard closes when u drag - does not work on android yet...
		// 		 https://github.com/facebook/react-native/issues/20540  Read this 
		//  	 Shitty workaround: onScrollBeginDrag={Keyboard.dismiss} - i think its better without this
		//
		//		'showsVerticalScrollIndicator' hide the ugly blackish bar
		return (
			<View style={styles.container}>
				<ScrollView keyboardShouldPersistTaps='always'
					showsVerticalScrollIndicator={false} 
					contentContainerStyle={{ flexGrow: 1, justifyContent: 'space-between' }}>
					
					{this.buildHeader()}
					
					<Logo />

					<Field name="email" component={renderEmail} />
					<Field name="password" component={renderPassword} />

					<Button shadowless 
						color='#3498DB' 
						style={[styles.button, styles.shadow]}
						onPress={handleSubmit(submitForm)}>
						Login
					</Button>

					<View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
						<Ionicons name="logo-facebook" onPress={() => alert('Login com Facebook')} style={{ padding: 7 }} size={32} color="#3b5998" />
						<Ionicons name="logo-twitter" onPress={() => alert('Login com Twitter')} style={{ padding: 7 }} size={31} color="#1dcaff" />
						<FontAwesome name="google" onPress={() => alert('Login com Google')} style={{ padding: 7 }} size={29} color="#DB4437" />
					</View>

					<View style={styles.errorMessage}>
						<Text>{this.props.errorMessage}</Text>
					</View>

					<View style={styles.signupTextCont}>
						<Text style={styles.signupText}>Ainda não tens conta?</Text>
						<TouchableOpacity onPress={() => this.props.navigation.navigate('Wanna')}><
							Text style={styles.signupButton}> Regista-te!</Text>
						</TouchableOpacity>
					</View>

				</ScrollView>
			</View>
		);
	}
}

//must be rendered outside of the render method - from Redux Form docs
const renderEmail = ({ input: { onChange, ...restInput } }) => {
	return (
			<TextInput style={styles.inputBox} 
				name='email'
				placeholder="E-mail"
				placeholderTextColor = "rgba(128,128,128, 0.8)"
				selectionColor="#fff"
				keyboardType="email-address"
				onChangeText={onChange}
				{...restInput}
		/>
	);
};
const renderPassword = ({ input: { onChange, ...restInput } }) => {
	return (
			<TextInput style={styles.inputBox} 
				name='password'
				placeholder="Palavra-passe"
				secureTextEntry={true}
				placeholderTextColor = "rgba(128,128,128, 0.8)"
				onChangeText={onChange}
				{...restInput}
		/>  
	);
};

function mapStateToProps(store, ownProps) {
	return {
		errorMessage: store.auth.loginError,
		loggedIn: store.auth.loggedIn,
		authToken: store.auth.authToken
	};
}
function mapDispatchToProps(dispatch) {
	return {
		login: (email, password) => {
			dispatch(login(email, password));
		}
	};
}
let LoginConnect = connect(
	mapStateToProps,
	mapDispatchToProps
)(Login);
export default reduxForm({
	form: 'loginForm'
})(LoginConnect);

const styles = StyleSheet.create({
	container : {
		backgroundColor:'white',
		flex: 1,
		alignItems:'center',
		justifyContent :'center'
	  },
	inputBox: {
		width: width - (theme.SIZES.BASE * 3.5),
        backgroundColor:'rgba(128,128,128, 0.2)',
        borderRadius: 25,
        paddingHorizontal:16,
        fontSize:16,
        color:'#000000', //not the color of the placeholder, but the color when u write
		marginVertical: 10,
		height: '6%'
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
	errorMessage: {
		marginTop: 40
	},
	loggedInDesc: {
		marginTop: 40
	}
});
