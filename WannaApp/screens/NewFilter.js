import React, { Component } from 'react';
import {
	View,
	Text,
	StyleSheet,
	SafeAreaView,
	TextInput,
	Platform,
	ScrollView,
	Button,
	TouchableOpacity
} from 'react-native';
import { createFilter } from '../modules/filter/filter.api';
import { connect } from 'react-redux';
import ModalDropdown from 'react-native-modal-dropdown';
import { MaterialIcons } from '@expo/vector-icons';
global.Buffer = global.Buffer || require('buffer').Buffer;

const maleClothes = ['Camisa', 'Camisola', 'Sweat', 'T-shirt', 'Calças', 'Casaco', 'Outro'];
const femaleClothes = ['Top', 'Blusa', 'Vestido', 'Saia', 'Calças', 'Casaco', 'Outro'];
const colors = ['Azul', 'Vermelho', 'Preto', 'Branco', 'Outra'];
const sizes = ['XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL', 'Outro'];
const numSizes = ['32', '34', '36', '38', '40', '42', '44', '46', '48', '50', '52', '54', '56'];
const prices = [1, 2, 3, 4, 5, 10, 15, 30, 50, 100];

class NewFilter extends Component {
	state = {
		wishlistData: [],
		numPosts: 0,
		optionsGenre: ['Masculino', 'Feminino'],
		optionsClothes: [],
		optionsColors: [],
		optionsSizes: [],
		optionsPriceMin: [],
		optionsPriceMax: [],
		selectedGenre: null,
		selectedClothe: null,
		selectedColor: null,
		selectedSize: null,
		selectedMinPrice: 0,
		selectedMaxPrice: 9999,
		completed: false
	};

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
		this.setState({ optionsPriceMin: prices });
	}

	//onValueChange of the switch this function will be called
	handleMinPrice(newState) {
		//console.log("Cor selecionada: " + newState.selected);

		// save selected genre
		this.setState({ selectedMinPrice: newState.selected });

		// give options for next step
		this.setState({ optionsPriceMax: prices });
	}

	//onValueChange of the switch this function will be called
	handleMaxPrice(newState) {
		//console.log("Cor selecionada: " + newState.selected);

		// save selected genre
		this.setState({ selectedMaxPrice: newState.selected });

		// give options for next step
		this.setState({ completed: true });
	}

	componentDidMount() {
		this.startHeaderHeight = 80;
		if (Platform.OS == 'android') {
			this.startHeaderHeight = 60;
		}

		// get data from servers and save in state
		// this.getWishlistDataFromApiAsync();
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
					{/* this.buildWishlist() */}
					{this.buildFilterForm()}
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
				{/* Search Box */}
				<View
					style={{
						flexDirection: 'row',
						padding: 10,
						backgroundColor: 'white',
						marginHorizontal: 20,
						shadowOffset: { width: 0, height: 0 },
						shadowColor: 'black',
						shadowOpacity: 0.2,
						elevation: 1,
						justifyContent: 'flex-end'
					}}>
					<MaterialIcons name="search" size={20} style={{ marginRight: 10 }} />
					<TextInput
						underlineColorAndroid="transparent"
						placeholder="Try Camisola"
						placeholderTextColor="grey"
						style={{ flex: 1, fontWeight: '700', backgroundColor: 'white' }}
					/>
				</View>
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
						style={{ height: 80, flexDirection: 'row', backgroundColor: 'green' }}>
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
						style={{ height: 80, flexDirection: 'row', backgroundColor: 'green' }}>
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
						style={{ height: 80, flexDirection: 'row', backgroundColor: 'green' }}>
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
						style={{ height: 80, flexDirection: 'row', backgroundColor: 'green' }}>
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
					{/* preço minimo */}
					<View
						key={'minPrice'}
						style={{ height: 80, flexDirection: 'row', backgroundColor: 'green' }}>
						<ModalDropdown
							onSelect={(index, value) => {
								this.handleMinPrice({ selected: value });
							}}
							options={this.state.optionsPriceMin}
							defaultValue={'Mínimo'}
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
					{/* preço maximo */}
					<View
						key={'maxPrice'}
						style={{ height: 80, flexDirection: 'row', backgroundColor: 'green' }}>
						<ModalDropdown
							onSelect={(index, value) => {
								this.handleMaxPrice({ selected: value });
							}}
							options={this.state.optionsPriceMax}
							defaultValue={'Máximo'}
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
					{this.state.completed ? (
						<Button title="Adicionar" onPress={() => createFilter()} />
					) : null}

					<View style={styles.errorMessage}>
						<Text>{this.props.errorMessage}</Text>
					</View>
				</View>
			</ScrollView>
		);
	}

	// Get Data to Build Feed and Transform it to Json Object
	async createFilterAsync() {
		result = await createFilter(
			this.state.selectedGenre,
			this.state.selectedClothe,
			this.state.selectedColor,
			this.state.selectedSize,
			this.state.selectedMinPrice,
			this.state.selectedMaxPrice
		);

		if (result == 'OK') {
			this.props.navigation.navigate('Filters');
			ToastAndroid.show('Filter Created!', ToastAndroid.LONG);
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
	return {};
}
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(NewFilter);

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center'
	}
});
