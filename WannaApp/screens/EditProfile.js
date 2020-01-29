import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { Input } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import * as ImageManipulator from 'expo-image-manipulator';
import * as ImagePicker from 'expo-image-picker';
import { EvilIcons, MaterialIcons, MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons';
import Loading from './Loading';
import { editProfile } from '../modules/profile/profile.api';
import { notEditProfile } from '../modules/profile/profile.reducer';

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
	SafeAreaView,
	ToastAndroid
} from 'react-native';
import { Button, theme } from '../galio';
import { getMyProfile } from '../modules/profile/profile.api';
import { black } from 'ansi-colors';

const { width } = Dimensions.get('screen');

class EditProfile extends Component {
	state = {
		avatarData: null,
		location: null,
		password: null,
		loading: true,
		completed: false,
		fontLoaded: false
	};
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		this.getProfileToShow();
	}

	async componentWillMount() {
		await Expo.Font.loadAsync({
			'run': require('../assets/fonts/run.ttf'),
		});
		this.setState({ fontLoaded: true });
	}

	getProfileToShow() {
		let locationPassed;
		locationPassed = this.props.navigation.getParam('location', 'local');

		if (locationPassed !== 'local') {
			this.setState({ location: locationPassed, loading: false });
		}
	}

	render() {
		if (this.state.loading == false) {
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
		} else return <Loading />;
	}

	// Builds header of the page
	buildHeader() {
		this.startHeaderHeight = 80;
		if (Platform.OS == 'android') {
			this.startHeaderHeight = 60;
		}
		if (this.state.fontLoaded){
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
					<Text style={{
						flex: 1,
						textAlign: 'left',
						fontSize: 40,
						fontFamily: 'run'
						}}>
						EDITAR
					</Text>
				</View>
			</View>
		);}
	}

	renderForm() {
		const { handleSubmit } = this.props;
		const submitForm = e => {
			this.editProfile(e.location, e.password, this.state.avatarData);
			this.setState({ location: e.location, password: e.password, loading: false });
		};

		return (
			<View style={styles.container}>
				<ScrollView
					keyboardShouldPersistTaps="always"
					showsVerticalScrollIndicator={false}
					contentContainerStyle={{
					}}>

					<Text style={{ fontSize: 16, marginTop: 10 }}>Mudar Foto de Perfil:</Text>
					{this.buildImagePicker()}

					<Text style={{ fontSize: 16}}>Localização:</Text>
					<Field style={{ padding: 10000 }}
						name="location"
						placeholder={this.state.location}
						component={renderInput}
					/>

					<Text style={{ fontSize: 16, marginTop: 10, marginBottom: 10 }}>Palavra-passe:</Text>
					<Field 
						name="password" 
						placeholder="Palavra-passe"
						component={renderPassword} 
					/>

					<Button
						shadowless
						color="#3498DB"
						style={[styles.button, styles.shadow]}
						onPress={handleSubmit(submitForm)}>
						Confirmar Alterações
					</Button>

					{this.props.registered ? (
						<Text style={styles.loggedInDesc}>Register was successfull</Text>
					) : null}
				</ScrollView>
			</View>
		);
	}

	// Build space to pick image
	buildImagePicker() {
		return (
			<View
				style={{
					height: 100,
					flexDirection: 'row',
					padding: 10,
					justifyContent: 'center',
					alignItems: 'center',
				}}>
				{/* Take photo */}
				<EvilIcons.Button
					name="camera"
					color= 'black'
					backgroundColor= 'white'
					size={60}
					style={{ flex: 1 }}
					onPress={this.takePhoto}
				/>
				{/* Select from gallery */}
				<EvilIcons.Button
					name="image"
					color= 'black'
					backgroundColor= 'white'					
					size={60}
					style={{ flex: 1 }}
					onPress={this.pickImage}
				/>
			</View>
		);
	}

	// access camera and take photo
	takePhoto = async () => {
		let pickerResult = await ImagePicker.launchCameraAsync({
			allowsEditing: true,
			aspect: [4, 3],
			base64: true
		});

		if (pickerResult.uri != null) {
			const manipResult = await ImageManipulator.manipulateAsync(
				pickerResult.uri,
				[{ resize: { width: 100, height: 100 } }],
				{ format: 'jpeg', base64: true }
			);

			this.handleImagePicked(manipResult.base64);
		}
	};

	// access photo folder and pick
	pickImage = async () => {
		let pickerResult = await ImagePicker.launchImageLibraryAsync({
			allowsEditing: true,
			aspect: [1, 1],
			base64: true
		});

		if (pickerResult.uri != null) {
			const manipResult = await ImageManipulator.manipulateAsync(
				pickerResult.uri,
				[{ resize: { width: 100, height: 100 } }],
				{ format: 'jpeg', base64: true }
			);

			this.handleImagePicked(manipResult.base64);
		}
	};

	handleImagePicked(pickerResult) {
		this.setState({ avatarData: pickerResult });
	}

	async editProfile(location, password, avatar) {
		result = await editProfile(location, password, avatar);

		if (result == 'OK') {
			this.props.exitedEdit();
			this.props.navigation.navigate('MyProfile');
			ToastAndroid.show('Perfil Editado!', ToastAndroid.LONG);
		}

		return;
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
		loggedUsername: store.auth.loggedUsername,
		authToken: store.auth.authToken
	};
}
function mapDispatchToProps(dispatch) {
	return {
		exitedEdit: () => {
			dispatch(notEditProfile());
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
		marginTop: 15,
		alignSelf: 'center',
		marginBottom: theme.SIZES.BASE,
		width: width - theme.SIZES.BASE * 3.5,
		borderRadius: 25,
		paddingVertical: 13,
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
