import React, { Component } from 'react';
import { StyleSheet, Text, TextInput, View, BackHandler, SafeAreaView, Platform } from 'react-native';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { Input, Button } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';

import { register } from '../modules/auth/auth.api';

import { globalStyle, defaultNavigator } from './style';

class EditPost extends Component {
	state = {
		insertedDescription: null,
		insertedPrice: null,
		insertedCategory: null,
		insertedColor: null,
		insertedSize: null,
		insertedBrand: null,
		postLoaded: [],
		fontLoaded: false
	};

	componentDidMount() {
		this.loadPost();
	}

	async componentWillMount() {
		await Expo.Font.loadAsync({
			'run': require('../assets/fonts/run.ttf'),
		});
		this.setState({ fontLoaded: true });
	}

	async loadPost() {
		let postPassed;
		postPassed = this.props.navigation.getParam('post', 'no');

		if (postPassed != null) {
			await this.setState({
				postLoaded: postPassed
			});
		}
	}

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
						backgroundColor: 'blue'
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
		return (
			<View>
				{/* descrição */}
				<View style={{ flex: 1, padding: 10 }}>
					<TextInput
						style={{ flex: 1 }}
						placeholder="Descrição"
						onChangeText={text => this.setState({ insertedBrand: text })}
						value={this.state.insertedBrand}
					/>
				</View>
				{/* preço */}
				<View style={{ flex: 1, padding: 10 }}>
					<TextInput
						style={{ flex: 1 }}
						placeholder="Preço"
						onChangeText={text => this.setState({ insertedDescription: text })}
						value={this.state.insertedDescription}
					/>
				</View>
				{/* Categoria */}
				<View style={{ flex: 1, padding: 10 }}>
					<TextInput
						style={{ flex: 1 }}
						placeholder="Categoria"
						onChangeText={text => this.setState({ insertedDescription: text })}
						value={this.state.insertedDescription}
					/>
				</View>
				{/* Cor */}
				<View style={{ flex: 1, padding: 10 }}>
					<TextInput
						style={{ flex: 1 }}
						placeholder="Cor"
						onChangeText={text => this.setState({ insertedDescription: text })}
						value={this.state.insertedDescription}
					/>
				</View>
				{/* Tamanho */}
				<View style={{ flex: 1, padding: 10 }}>
					<TextInput
						style={{ flex: 1 }}
						placeholder="Tamanho"
						onChangeText={text => this.setState({ insertedDescription: text })}
						value={this.state.insertedDescription}
					/>
				</View>
				{/* Marca */}
				<View style={{ flex: 1, padding: 10 }}>
					<TextInput
						style={{ flex: 1 }}
						placeholder="Tamanho"
						onChangeText={text => this.setState({ insertedDescription: text })}
						value={this.state.insertedDescription}
					/>
				</View>

				<Button
					onPress={handleSubmit(submitForm)}
					buttonStyle={[globalStyle.btn]}
					titleStyle={globalStyle.btnText}
					title={'Editar Post'}
				/>
			</View>
		);
	}
}

function mapStateToProps(store, ownProps) {
	return {
		errorMessage: store.auth.regError
	};
}
function mapDispatchToProps(dispatch) {}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(EditPost);

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
		width: '100%',
		margin: 10
	},
	placeholder: {
		fontSize: 12
	},
	submitButton: {
		backgroundColor: '#000000',
		borderRadius: 10,
		marginTop: 20,
		borderWidth: 1,
		borderColor: '#666666',
		margin: 10
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
