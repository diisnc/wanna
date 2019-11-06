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
	TouchableHighlight,
	Button
} from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown';
import { TextInputMask } from 'react-native-masked-text';
import { CheckBox } from 'react-native-elements';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

const maleClothes = ['Camisa', 'Camisola', 'Sweat', 'T-shirt', 'Calças', 'Casaco', 'Outro'];
const femaleClothes = ['Top', 'Blusa', 'Vestido', 'Saia', 'Calças', 'Casaco', 'Outro'];
const colors = ['Azul', 'Vermelho', 'Preto', 'Branco', 'Outra'];
const sizes = ['XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL', 'Outro'];
const numSizes = ['32', '34', '36', '38', '40', '42', '44', '46', '48', '50', '52', '54', '56'];

class Add extends Component {
	state = {
		wishlistData: [],
		numPosts: 0,
		pickedImagesUri: [],
		/* form */
		optionsGenre: ['Masculino', 'Feminino'],
		optionsClothes: [],
		optionsColors: [],
		optionsSizes: [],
		selectedGenre: null,
		selectedClothe: null,
		selectedColor: null,
		selectedSize: null,
		price: null,
		offerPostage: false,
		postagePrice: null,
		completed: false
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
					{this.buildFilterForm()}
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

	// Builds list of filters
	buildFilterForm() {
		return (
			<ScrollView scrollEventThrottle={16}>
				<View style={{ flex: 1, backgroundColor: 'white', margin: 10 }}>
					{/* género */}
					<View
						key={'genre'}
						style={{ height: 50, flexDirection: 'row', backgroundColor: 'green' }}>
						<ModalDropdown
							onSelect={(index, value) => {
								this.handleGenre({ selected: value });
							}}
							options={this.state.optionsGenre}
							defaultValue={'Género'}
							dropdownTextStyle={{
								backgroundColor: '#fff',
								fontSize: 17
							}} /*Style here*/
							style={{
								flex: 1,
								backgroundColor: '#fff',
								borderRadius: 30,
								backgroundColor: 'rgb(19, 119, 237)'
							}}
							textStyle={{ fontSize: 20, margin: 10, color: 'white' }}
							dropdownStyle={{ width: '60%' }}
						/>
					</View>
					{/* tipo roupa */}
					<View
						key={'clothe'}
						style={{ height: 50, flexDirection: 'row', backgroundColor: 'green' }}>
						<ModalDropdown
							onSelect={(index, value) => {
								this.handleClothe({ selected: value });
							}}
							options={this.state.optionsClothes}
							defaultValue={'Peça'}
							dropdownTextStyle={{
								backgroundColor: '#fff',
								fontSize: 17
							}} /*Style here*/
							style={{
								flex: 1,
								backgroundColor: '#fff',
								borderRadius: 30,
								backgroundColor: 'rgb(19, 119, 237)'
							}}
							textStyle={{ fontSize: 20, margin: 10, color: 'white' }}
							dropdownStyle={{ width: '60%' }}
						/>
					</View>
					{/* cor */}
					<View
						key={'color'}
						style={{ height: 50, flexDirection: 'row', backgroundColor: 'green' }}>
						<ModalDropdown
							onSelect={(index, value) => {
								this.handleColor({ selected: value });
							}}
							options={this.state.optionsColors}
							defaultValue={'Cor'}
							dropdownTextStyle={{
								backgroundColor: '#fff',
								fontSize: 17
							}} /*Style here*/
							style={{
								flex: 1,
								backgroundColor: '#fff',
								borderRadius: 30,
								backgroundColor: 'rgb(19, 119, 237)'
							}}
							textStyle={{ fontSize: 20, margin: 10, color: 'white' }}
							dropdownStyle={{ width: '60%' }}
						/>
					</View>
					{/* tamanhos */}
					<View
						key={'sizes'}
						style={{ height: 50, flexDirection: 'row', backgroundColor: 'green' }}>
						<ModalDropdown
							onSelect={(index, value) => {
								this.handleSizes({ selected: value });
							}}
							options={this.state.optionsSizes}
							defaultValue={'Tamanho'}
							dropdownTextStyle={{
								backgroundColor: '#fff',
								fontSize: 17
							}} /*Style here*/
							style={{
								flex: 1,
								backgroundColor: '#fff',
								borderRadius: 30,
								backgroundColor: 'rgb(19, 119, 237)'
							}}
							textStyle={{ fontSize: 20, margin: 10, color: 'white' }}
							dropdownStyle={{ width: '60%' }}
						/>
					</View>
					{/* preço */}
					<TextInputMask
						type={'money'}
						options={{
							unit: "€"
						}}
						keyboardType={'numeric'}
						style={{ flex: 1, fontWeight: '700', backgroundColor: 'white' }}
						underlineColorAndroid="transparent"
						placeholder="Inserir preço"
						placeholderTextColor="grey"
						value={this.state.price}
						onChangeText={text => this.setState({price: text})}
					/>
					{/* incluir portes? */}
					<CheckBox
						title='Portes grátis'
						iconType='material-community'
						checked={this.state.offerPostage}
						onPress={() => this.setState({offerPostage: !this.state.offerPostage})}
					/>
					{/* preço portes */}
					{!this.state.offerPostage ? (
						<TextInputMask
							type={'money'}
							options={{
								unit: "€"
							}}
							keyboardType={'numeric'}
							style={{ flex: 1, fontWeight: '700', backgroundColor: 'white' }}
							underlineColorAndroid="transparent"
							placeholder="Inserir portes"
							placeholderTextColor="grey"
							value={this.state.postagePrice}
							onChangeText={text => this.setState({postagePrice: text})}
						/>
					) : null}
					{/* create post */}
					{this.state.completed ? (
						<Button
							title="Criar"
							onPress={console.log(
								'Submit: ' +
									this.state.selectedGenre +
									', ' +
									this.state.selectedClothe +
									', ' +
									this.state.selectedColor +
									', ' +
									this.state.selectedSize +
									', ' +
									this.state.selectedMinPrice +
									', ' +
									this.state.selectedMaxPrice
							)}
						/>
					) : null}
				</View>
			</ScrollView>
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

	//onValueChange of the switch this function will be called
	handleGenre(newState) {
		//console.log("Genre selecionado: " + newState.selected);

		// save selected genre
		this.setState({ selectedGenre: newState.selected });

		// give options for next step
		if (newState.selected == 'Masculino') {
			this.setState({ optionsClothes: maleClothes });
		} else {
			this.setState({ optionsClothes: femaleClothes });
		}
	}

	//onValueChange of the switch this function will be called
	handleClothe(newState) {
		//console.log("Clothe selecionada: " + newState.selected);

		// save selected genre
		this.setState({ selectedClothe: newState.selected });

		// give options for next step
		this.setState({ optionsColors: colors });
	}

	//onValueChange of the switch this function will be called
	handleColor(newState) {
		//console.log("Cor selecionada: " + newState.selected);

		// save selected genre
		this.setState({ selectedColor: newState.selected });

		// give options for next step
		this.setState({ optionsSizes: sizes });
	}

	//onValueChange of the switch this function will be called
	handleSizes(newState) {
		//console.log("Cor selecionada: " + newState.selected);

		// save selected genre
		this.setState({ selectedSize: newState.selected });

		// give options for next step
		this.setState({ completed: true });
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
