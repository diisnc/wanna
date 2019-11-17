import React, { Component } from 'react';
import { StyleSheet, Text, TextInput, View, BackHandler, SafeAreaView, Platform } from 'react-native';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { Input, Button } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';

import { register } from '../modules/auth/auth.api';

import { globalStyle, defaultNavigator } from './style';

class EditProfile extends Component {
	constructor(props) {
		super(props);
		BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
	}

	componentDidMount() {}

	handleBackPress = () => {
		this.props.navigation.navigate('OtherProfile');
		return true;
	};

	render() {
		return (
			<SafeAreaView style={{ flex: 1 }}>
				<View
					style={{
						flex: 1,
						flexDirection: 'column',
						justifyContent: 'flex-start',
						alignItems: 'stretch'
					}}>
					{this.buildHeader()}
					{this.renderForm()}
				</View>
			</SafeAreaView>
		);
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
					<Text style={{ flex: 3, textAlign: 'center' }}>Editar Perfil</Text>
				</View>
			</View>
		);
	}

	renderForm() {
		const { handleSubmit } = this.props;
		const submitForm = e => {
			this.props.register(e.user, e.first, e.last, e.email, e.password);
		};
		return (
			<View>
				<Field name="user" placeholder="Username" component={renderInput} />
				<Field name="first" placeholder="First name" component={renderInput} />
				<Field name="last" placeholder="Last name" component={renderInput} />
				<Field name="email" placeholder="Email" component={renderInput} />
				<Field name="password" placeholder="Password" component={renderPassword} />
				<View style={styles.errorMessage}>
					<Text>{this.props.errorMessage}</Text>
				</View>

				<Button
					onPress={handleSubmit(submitForm)}
					buttonStyle={[globalStyle.btn]}
					titleStyle={globalStyle.btnText}
					title={'Register'}
				/>
				{this.props.registered ? (
					<Text style={styles.loggedInDesc}>Register was successfull</Text>
				) : null}
			</View>
		);
	}
}

//must be rendered outside of the render method as this will cause it to re-render each time the props change
const renderInput = ({ input: { onChange, ...restInput }, placeholder }) => {
	return (
		<Input
			inputContainerStyle={styles.input}
			inputStyle={styles.placeholder}
			onChangeText={onChange}
			placeholder={placeholder}
			{...restInput}
		/>
	);
};
const renderPassword = ({ input: { onChange, ...restInput }, placeholder }) => {
	return (
		<Input
			inputContainerStyle={styles.input}
			inputStyle={styles.placeholder}
			onChangeText={onChange}
			placeholder={placeholder}
			{...restInput}
			secureTextEntry={true}
		/>
	);
};

function mapStateToProps(store, ownProps) {
	return {
		errorMessage: store.auth.regError,
		registered: store.auth.registered,
		authToken: store.auth.authToken
	};
}
function mapDispatchToProps(dispatch) {
	return {
		register: (username, first, last, email, password) => {
			dispatch(register(username, first, last, email, password));
		}
	};
}
let editConnect = connect(
	mapStateToProps,
	mapDispatchToProps
)(EditProfile);
export default reduxForm({
	form: 'registerForm'
})(editConnect);

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center'
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
	submitButton: {
		backgroundColor: '#000000',
		borderRadius: 10,
		marginTop: 20,
		borderWidth: 1,
		borderColor: '#666666'
	},
	submitButtonText: {
		textAlign: 'center',
		color: '#444'
	},
	errorMessage: {
		marginTop: 40
	},
	loggedInDesc: {
		marginTop: 40
	}
});
