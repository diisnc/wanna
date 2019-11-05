import React, { Component } from 'react';
import {
	View,
	Text,
	StyleSheet,
	SafeAreaView,
	TextInput,
	Platform,
	ScrollView,
	Image,
	TouchableHighlight
} from 'react-native';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

class Add extends Component {
	state = {
		wishlistData: [],
		numPosts: 0,
		pickedImagesUri: []
	};

	componentDidMount() {
		this.startHeaderHeight = 80;
		if (Platform.OS == 'android') {
			this.startHeaderHeight = 60;
		}

		// get data from servers and save in state
		this.getWishlistDataFromApiAsync();
	}

	render() {
		return (
			/*
            Fazer View Englobadora da página
            onde o primeiro elemento é o header
            de pesquisa e o segundo elemento
            é o feed que contém as imagens.
            */
			// Safe Box for Iphone
			<SafeAreaView style={{ flex: 1 }}>
				{/* Full Page Box */}
				<View
					style={{
						flex: 1,
						flexDirection: 'column',
						justifyContent: 'flex-start',
						alignItems: 'stretch'
					}}>
					{this.buildHeader()}
					{this.buildForm()}
				</View>
			</SafeAreaView>
		);
	}

	// Builds header of the page
	buildHeader() {
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
					<Text style={{ flex: 1, textAlign: 'center' }}>NEW POST</Text>
				</View>
			</View>
		);
	}

	// Build space to pick image
	buildForm() {
		return (
			<ScrollView scrollEventThrottle={16}>
				<View style={{ flex: 1, backgroundColor: 'white', margin: 10 }}>
					{this.buildPickedImagesScroll()}
					{this.buildImagePicker()}
				</View>
			</ScrollView>
		);
	}

	// Builds lateral scroll for picked images
	buildPickedImagesScroll() {
		if (this.state.pickedImagesUri.length > 0) {
			return (
				<ScrollView 
					scrollEventThrottle={16} 
					horizontal={true}
					style={{ height: 100, backgroundColor: 'green', margin: 10 }}
				>
					{this.buildImages()}
				</ScrollView>
			);
		}
		return;
	}

	// build all the images
	buildImages() {
		const items = [];

		for (let index = 0; index < this.state.pickedImagesUri.length; index++) {
			let imageUri = this.state.pickedImagesUri[index]

			items.push(
				<View key={index} style={{width: 100, backgroundColor: "yellow", margin: 5}}>
					<Image
						key={index}
						source={{
							uri: imageUri
						}}
						style={{
							width: 'auto',
							height: '80%',
							aspectRatio: 1,
							overflow: 'hidden'
						}}
					/>
					<TouchableHighlight
						underlayColor = "#ffa456"
						onPress = {() => this.deleteImage(index)}
						style = {{ backgroundColor: '#fff', height: '20%'}}
					>
						<Text>Remover</Text>
					</TouchableHighlight>
				</View>
			);
		}

		return items;
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
					backgroundColor: 'pink'
				}}>
				{/* Take photo */}
				<MaterialCommunityIcons.Button
					name="camera"
					size={40}
					style={{ flex: 1 }}
					onPress={this.takePhoto}
				/>
				{/* Select from gallery */}
				<MaterialCommunityIcons.Button
					name="folder-image"
					size={40}
					style={{ flex: 1 }}
					onPress={this.pickImage}
				/>
			</View>
		);
	}

	// handle image result
	handleImagePicked(pickerResult) {
		{
			/* add image to rui list */
		}
		let pickedImagesUriCopy = [...this.state.pickedImagesUri];
		pickedImagesUriCopy.push(pickerResult.uri);
		this.setState({ pickedImagesUri: pickedImagesUriCopy });
		//console.log(pickedImagesUri)
	}

	// access camera and take photo
	takePhoto = async () => {
		let pickerResult = await ImagePicker.launchCameraAsync({
			allowsEditing: true,
			aspect: [4, 3],
			base64: true
		});

		this.handleImagePicked(pickerResult);
	};

	// access photo folder and pick
	pickImage = async () => {
		let pickerResult = await ImagePicker.launchImageLibraryAsync({
			allowsEditing: true,
			aspect: [16, 9],
			base64: true
		});

		this.handleImagePicked(pickerResult);
	};

	deleteImage(index) {
		console.log("apagar imagem selecionada, no index: " + index);
		// copia das imagens colocadas
		var pickedImagesUriCopy = [...this.state.pickedImagesUri];
		// remover elemento
		if (index > -1) {
			pickedImagesUriCopy.splice(index, 1);
		}
		// novo estado
		this.setState({ pickedImagesUri: pickedImagesUriCopy });
	}

	// Get Data to Build Feed and Transform it to Json Object
	getWishlistDataFromApiAsync() {
		/*
        return fetch('https://facebook.github.io/react-native/movies.json')// ONLINE GET
            .then(response => response.json())
            .then(responseJson => {
                this.setState({wishlistData: responseJson, numPosts: Object.keys(responseJson).length});
                //console.log(responseJson);
            })
            .catch(error => {
                console.error(error);
            });
        */

		const newState = require('./json/responseFeed');
		this.setState({ wishlistData: newState, numPosts: newState.length });

		return;
	}
}
export default Add;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center'
	}
});
