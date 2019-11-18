import React, { Component } from 'react';
import { StyleSheet, Text, TextInput, View, Platform } from 'react-native';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { Input, Button } from 'react-native-elements';
import { login } from '../modules/auth/auth.api';

import { globalStyle, defaultNavigator } from './style';

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
					backgroundColor: 'white',
					borderBottomWidth: 1,
					borderBottomColor: '#dddddd'
				}}>
				<View
					style={{
						height: '90%',
						flexDirection: 'row',
						padding: 10,
						justifyContent: 'center',
						alignItems: 'center',
						backgroundColor: 'blue'
					}}>
					<Text style={{ flex: 3, textAlign: 'center' }}>LOGIN</Text>
				</View>
			</View>
		);
	}

	render() {
		const { handleSubmit } = this.props;
		const submitForm = e => {
			this.props.login(e.email, e.password);
		};

		return (
			<View>
				{this.buildHeader()}
				<Field name="email" component={renderEmail} />
				<Field name="password" component={renderPassword} />

				<View style={styles.errorMessage}>
					<Text>{this.props.errorMessage}</Text>
				</View>

				<View style={styles.authBtnWrap}>
					<Button
						onPress={handleSubmit(submitForm)}
						buttonStyle={[globalStyle.btn, styles.authBtn]}
						titleStyle={globalStyle.btnText}
						title="Log in"
					/>
					<Button
						onPress={() => this.props.navigation.navigate('Wanna')}
						buttonStyle={[globalStyle.btn, styles.authBtn]}
						titleStyle={globalStyle.btnText}
						title={'Voltar'}
					/>
				</View>
			</View>
		);
	}
}

//must be rendered outside of the render method - from Redux Form docs
const renderEmail = ({ input: { onChange, ...restInput } }) => {
	return (
		<Input
			placeholder="Email"
			inputContainerStyle={styles.input}
			inputStyle={styles.placeholder}
			onChangeText={onChange}
			{...restInput}
		/>
	);
};
const renderPassword = ({ input: { onChange, ...restInput } }) => {
	return (
		<Input
			placeholder="Password"
			name="password"
			inputContainerStyle={styles.input}
			inputStyle={styles.placeholder}
			onChangeText={onChange}
			secureTextEntry={true}
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
	container: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		padding: 10
	},
	input: {
		backgroundColor: '#ffffff',
		borderBottomWidth: 0,
		marginBottom: 10,
		borderRadius: 2,
		paddingVertical: 5,
		width: '100%'
	},
	placeholder: {
		fontSize: 12
	},
	errorMessage: {
		marginTop: 40
	},
	loggedInDesc: {
		marginTop: 40
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
	},
	accessBtn: {
		marginHorizontal: 0,
		marginVertical: 30,
		width: '100%',
		alignSelf: 'center'
	}
});
