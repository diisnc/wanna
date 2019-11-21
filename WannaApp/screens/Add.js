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
	Button,
	ToastAndroid
} from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown';
import { TextInputMask } from 'react-native-masked-text';
import { createPost } from '../modules/post/post.api';
import { connect } from 'react-redux';
import CheckBox from 'react-native-check-box';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import * as ImageManipulator from 'expo-image-manipulator';
import * as ImagePicker from 'expo-image-picker';
import { addPost } from '../modules/profile/profile.reducer';

const maleClothes = ['Camisa', 'Camisola', 'Sweat', 'T-shirt', 'Calças', 'Casaco', 'Outro'];
const femaleClothes = ['Top', 'Blusa', 'Vestido', 'Saia', 'Calças', 'Casaco', 'Outro'];
const colors = ['Azul', 'Vermelho', 'Preto', 'Branco', 'Outra'];
const sizes = ['XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL', 'Outro'];
const numSizes = ['32', '34', '36', '38', '40', '42', '44', '46', '48', '50', '52', '54', '56'];

class Add extends Component {
	state = {
		wishlistData: [],
		numPosts: 0,
		pickedImagesBase64: [],
		/* form */
		optionsGenre: ['Masculino', 'Feminino'],
		optionsClothes: [],
		optionsColors: [],
		optionsSizes: [],
		selectedGenre: null,
		selectedClothe: null,
		selectedColor: null,
		selectedSize: null,
		insertedBrand: null,
		insertedDescription: null,
		price: null,
		offerPostage: false,
		postagePrice: null,
		completed: false
	};

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
		if (this.state.pickedImagesBase64.length > 0) {
			return (
				<ScrollView
					scrollEventThrottle={16}
					horizontal={true}
					style={{ height: 100, backgroundColor: 'green', margin: 10 }}>
					{this.buildImages()}
				</ScrollView>
			);
		}
		return;
	}

	// build all the images
	buildImages() {
		const items = [];

		for (let index = 0; index < this.state.pickedImagesBase64.length; index++) {
			let imageUri = this.state.pickedImagesBase64[index];

			items.push(
				<View key={index} style={{ width: 100, backgroundColor: 'yellow', margin: 5 }}>
					<Image
						key={index}
						source={{
							uri: 'data:image/jpeg;base64,' + imageUri
						}}
						style={{
							width: 'auto',
							height: '80%',
							aspectRatio: 1,
							overflow: 'hidden'
						}}
					/>
					<TouchableHighlight
						underlayColor="#ffa456"
						onPress={() => this.deleteImage(index)}
						style={{ backgroundColor: '#fff', height: '20%' }}>
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
					{/* marca */}
					<View style={{ flex: 1, padding: 10 }}>
						<TextInput
							style={{ flex: 1 }}
							placeholder="Marca"
							onChangeText={text => this.setState({ insertedBrand: text })}
							value={this.state.insertedBrand}
						/>
					</View>
					{/* descrição */}
					<View style={{ flex: 1, padding: 10 }}>
						<TextInput
							style={{ flex: 1 }}
							placeholder="Descrição"
							onChangeText={text => this.setState({ insertedDescription: text })}
							value={this.state.insertedDescription}
						/>
					</View>
					{/* preço */}
					<TextInputMask
						type={'money'}
						options={{
							unit: '€'
						}}
						keyboardType={'numeric'}
						style={{ flex: 1, fontWeight: '700', backgroundColor: 'white' }}
						underlineColorAndroid="transparent"
						placeholder="Inserir preço"
						placeholderTextColor="grey"
						value={this.state.price}
						onChangeText={text => this.setState({ price: text })}
					/>
					{/* incluir portes? */}
					<CheckBox
						style={{ flex: 1, padding: 10 }}
						leftText={'Portes Grátis'}
						isChecked={this.state.offerPostage}
						onClick={() => {
							this.setState({ offerPostage: !this.state.offerPostage });
						}}
					/>
					{/* preço portes */}
					{!this.state.offerPostage ? (
						<TextInputMask
							type={'money'}
							options={{
								unit: '€'
							}}
							keyboardType={'numeric'}
							style={{ flex: 1, fontWeight: '700', backgroundColor: 'white' }}
							underlineColorAndroid="transparent"
							placeholder="Inserir portes"
							placeholderTextColor="grey"
							value={this.state.postagePrice}
							onChangeText={text => this.setState({ postagePrice: text })}
						/>
					) : null}
					{/* create post */}
					{this.state.completed ? (
						<Button title="Criar" onPress={() => this.createPhotoAsync()} />
					) : null}

					<View style={styles.errorMessage}>
						<Text>{this.props.errorMessage}</Text>
					</View>
				</View>
			</ScrollView>
		);
	}

	// handle image result
	handleImagePicked(pickerResult) {
		{
			/* add image to rui list */
		}
		let pickedImagesBase64Copy = [...this.state.pickedImagesBase64];
		pickedImagesBase64Copy.push(pickerResult);
		this.setState({ pickedImagesBase64: pickedImagesBase64Copy });
		// console.log(this.state.pickedImagesBase64);
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

		const manipResult = await ImageManipulator.manipulateAsync(
			pickerResult.uri,
			[{ resize: { width: 300, height: 300 } }],
			{ format: 'jpeg', base64: true }
		);

		this.handleImagePicked(manipResult.base64);
	};

	// access photo folder and pick
	pickImage = async () => {
		let pickerResult = await ImagePicker.launchImageLibraryAsync({
			allowsEditing: true,
			aspect: [4, 3],
			base64: true
		});

		const manipResult = await ImageManipulator.manipulateAsync(
			pickerResult.uri,
			[{ resize: { width: 300, height: 300 } }],
			{ format: 'jpeg', base64: true }
		);

		this.handleImagePicked(manipResult.base64);
	};

	deleteImage(index) {
		console.log('apagar imagem selecionada, no index: ' + index);
		// copia das imagens colocadas
		var pickedImagesBase64Copy = [...this.state.pickedImagesBase64];
		// remover elemento
		if (index > -1) {
			pickedImagesBase64Copy.splice(index, 1);
		}
		// novo estado
		this.setState({ pickedImagesBase64: pickedImagesBase64Copy });
	}

	async createPhotoAsync() {
		result = await createPost(
			this.state.selectedGenre,
			this.state.selectedClothe,
			this.state.selectedColor,
			this.state.insertedBrand,
			this.state.selectedSize,
			this.state.price,
			this.state.pickedImagesBase64,
			this.state.insertedDescription
		);

		if (result == 'OK') {
			this.props.navigation.navigate('Inspire');
			ToastAndroid.show('Post created!', ToastAndroid.LONG);
			this.props.addPostDispatch();
		}

		return;
	}
}
function mapStateToProps(store, ownProps) {
	return {
		errorMessage: store.error.errorMessage
	};
}
function mapDispatchToProps(dispatch) {
	return {
		addPostDispatch: () => {
			dispatch(addPost());
		}
	};
}
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Add);

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center'
	}
});
