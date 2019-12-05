import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { Input } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';

import { register } from '../modules/auth/auth.api';

import { globalStyle, defaultNavigator } from './style';
import {
	StyleSheet,
	Text,
	TextInput,
	View,
	Platform,
	TouchableOpacity,
	Dimensions,
	ScrollView,
	Keyboard,
	SafeAreaView
} from 'react-native';
import { Button, theme } from '../galio';

const { width } = Dimensions.get('screen');

class EditProfile extends Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {}

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
						backgroundColor: 'white'
					}}>
					<Text style={{ flex: 3, textAlign: 'center' }}>EDITAR PERFIL</Text>
				</View>
			</View>
		);
	}

	renderForm() {
		const { handleSubmit } = this.props;
		const submitForm = e => {
			this.props.register(e.user, e.first, e.last, e.location, e.email, e.password);
		};

		return (
			<View style={styles.container}>
				<ScrollView
					keyboardShouldPersistTaps="always"
					showsVerticalScrollIndicator={false}
					contentContainerStyle={{
						flexGrow: 1,
						justifyContent: 'space-between',
						paddingBottom: 89
					}}>
					<Field name="location" placeholder="Localização" component={renderInput} />
					<Field name="email" placeholder="E-mail" component={renderInput} />
					<Field name="password" placeholder="Palavra-passe" component={renderPassword} />

					<Button
						shadowless
						color="#3498DB"
						style={[styles.button, styles.shadow]}
						onPress={handleSubmit(submitForm)}>
						Registar
					</Button>

					<View style={styles.errorMessage}>
						<Text>{this.props.errorMessage}</Text>
					</View>

					{this.props.registered ? (
						<Text style={styles.loggedInDesc}>Register was successfull</Text>
					) : null}
				</ScrollView>
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
		backgroundColor: 'white',
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center'
	},
	inputBox: {
		width: width - theme.SIZES.BASE * 3.5,
		backgroundColor: 'rgba(128,128,128, 0.2)',
		borderRadius: 25,
		paddingHorizontal: 16,
		fontSize: 16,
		color: '#000000', //not the color of the placeholder, but the color when u write
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
		width: width - theme.SIZES.BASE * 3.5,
		borderRadius: 25,
		paddingVertical: 13
	},
	signinTextCont: {
		flexGrow: 1,
		alignItems: 'flex-end',
		justifyContent: 'center',
		paddingVertical: 16,
		flexDirection: 'row'
	},
	signinText: {
		color: 'rgba(128,128,128, 0.7)',
		fontSize: 16
	},
	signinButton: {
		color: '#3498DB',
		fontSize: 16,
		fontWeight: '500'
	},
	errorMessage: {
		marginTop: 40
	},
	loggedInDesc: {
		marginTop: 40
	}
});
