import React, { Component } from 'react';
import {
	View,
	Text,
	StyleSheet,
	SafeAreaView,
	TextInput,
	Platform,
	ScrollView,
	TouchableOpacity,
	ToastAndroid,
	Dimensions
} from 'react-native';
import { createFilter } from '../modules/filter/filter.api';
import { connect } from 'react-redux';
import ModalDropdown from 'react-native-modal-dropdown';
import { MaterialIcons } from '@expo/vector-icons';
global.Buffer = global.Buffer || require('buffer').Buffer;
import { addFilter } from '../modules/profile/profile.reducer';
import { Button, theme } from '../galio';

const maleClothes = [
	'Camisa',
	'Camisola',
	'Calçado',
	'Sweat',
	'T-shirt',
	'Calças',
	'Calções',
	'Casaco',
	'Outro'
];
const femaleClothes = ['Top', 'Blusa', 'Vestido', 'Saia', 'Calças', 'Calções', 'Calçado', 'Casaco', 'Outro'];
const colors = [
	'Azul',
	'Vermelho',
	'Rosa',
	'Verde',
	'Amarelo',
	'Bege',
	'Castanho',
	'Preto',
	'Cinzento',
	'Branco',
	'Laranja',
	'Roxo',
	'Dourado',
	'Outra'
];
const sizes = ['XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL', 'Outro'];
const numSizes = ['32', '34', '36', '38', '40', '42', '44', '46', '48', '50', '52', '54', '56', 'Outro'];
const prices = [1, 2, 3, 4, 5, 10, 15, 30, 50, 75, 100, 200, 400, 500];
const { width } = Dimensions.get('screen');

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
		completed: false,
		fontLoaded: false
	};

	async componentWillMount() {
		await Expo.Font.loadAsync({
			'run': require('../assets/fonts/run.ttf'),
		});
		this.setState({ fontLoaded: true });
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
					{this.buildFilterForm()}
				</View>
			</SafeAreaView>
		);
	}

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
					}}>
					<Text style={{
						flex: 1,
						textAlign: 'left',
						fontSize: 40,
						fontFamily: 'run'
						}}>
						NOVO FILTRO
					</Text>
				</View>
			</View>
		);}
	}

	// Builds list of filters
	buildFilterForm() {
		return (
			<ScrollView scrollEventThrottle={16}>
				<View style={styles.containerStyle}>
					{/* género */}
					<View
						key={'genre'}
						style={{ height: 65, flexDirection: 'row'}}>
						<ModalDropdown
							onSelect={(index, value) => {
								this.handleGenre({ selected: value });
							}}

							options={this.state.optionsGenre}

							style={{
								flex: 1,
								justifyContent: 'center',
							}}

							textStyle={{ fontSize: 20, margin: 10}}
							defaultValue={'Género'}

							dropdownTextStyle={{
								fontSize: 17,
							}} /*Style here*/
							dropdownStyle={{ width: '60%' }}
						/>
					</View>
					<View style = {{ borderBottomWidth: 0.5, marginHorizontal: 5, justifyContent: 'center', borderColor: '#ddd' }}></View>
					{/* tipo roupa */}
					<View
						key={'clothe'}
						style={{ height: 65, flexDirection: 'row'}}>
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
								justifyContent: 'center',
							}}
							textStyle={{ fontSize: 20, margin: 10}}
							dropdownStyle={{ width: '60%' }}
						/>
					</View>
					<View style = {{ borderBottomWidth: 0.5, marginHorizontal: 5, justifyContent: 'center', borderColor: '#ddd'  }}></View>
					{/* cor */}
					<View
						key={'color'}
						style={{ height: 65, flexDirection: 'row'}}>
						<ModalDropdown
							onSelect={(index, value) => {
								this.handleColor({ selected: value });
							}}
							options={this.state.optionsColors}
							defaultValue={'Cor'}
							dropdownTextStyle={{
								fontSize: 17
							}} /*Style here*/
							style={{
								flex: 1,
								justifyContent: 'center',
							}}
							textStyle={{ fontSize: 20, margin: 10}}
							dropdownStyle={{ width: '60%' }}
						/>
					</View>
					<View style = {{ borderBottomWidth: 0.5, marginHorizontal: 5, justifyContent: 'center', borderColor: '#ddd'  }}></View>
					{/* tamanhos */}
					<View
						key={'sizes'}
						style={{ height: 65, flexDirection: 'row'}}>
						<ModalDropdown
							onSelect={(index, value) => {
								this.handleSizes({ selected: value });
							}}
							options={this.state.optionsSizes}
							defaultValue={'Tamanho'}
							dropdownTextStyle={{
								fontSize: 17
							}} /*Style here*/
							style={{
								flex: 1,
								justifyContent: 'center',
							}}
							textStyle={{ fontSize: 20, margin: 10}}
							dropdownStyle={{ width: '60%' }}
						/>
					</View>
					<View style = {{ borderBottomWidth: 0.5, marginHorizontal: 5, justifyContent: 'center', borderColor: '#ddd'  }}></View>
					{/* preço minimo */}
					<View
						key={'minPrice'}
						style={{ height: 65, flexDirection: 'row'}}>
						<ModalDropdown
							onSelect={(index, value) => {
								this.handleMinPrice({ selected: value });
							}}
							options={this.state.optionsPriceMin}
							defaultValue={'Valor Mínimo'}
							dropdownTextStyle={{
								fontSize: 17
							}} /*Style here*/
							style={{
								flex: 1,
								justifyContent: 'center',
							}}
							textStyle={{ fontSize: 20, margin: 10}}
							dropdownStyle={{ width: '60%' }}
						/>
					</View>
					<View style = {{ borderBottomWidth: 0.5, marginHorizontal: 5, justifyContent: 'center', borderColor: '#ddd' }}></View>
					{/* preço maximo */}
					<View
						key={'maxPrice'}
						style={{ height: 65, flexDirection: 'row'}}>
						<ModalDropdown
							onSelect={(index, value) => {
								this.handleMaxPrice({ selected: value });
							}}
							options={this.state.optionsPriceMax}
							defaultValue={'Valor Máximo'}
							dropdownTextStyle={{
								fontSize: 17
							}} /*Style here*/
							style={{
								flex: 1,
								justifyContent: 'center',
							}}
							textStyle={{ fontSize: 20, margin: 10}}
							dropdownStyle={{ width: '60%' }}
						/>
					</View>
						
				</View>
			
				<View>
					{this.state.completed ? (
								<Button
									shadowless
									color='#3498DB' 
									style={[styles.button]}
									onPress={() => this.createFilter()}>
									Adicionar Filtro
								</Button>
							) : 
								<Button
									shadowless
									color= "#ddd"
									style={[styles.button]}>
									Adicionar Filtro
								</Button>
							}
				</View>		
			</ScrollView>

			
		);
	}

	// Get Data to Build Feed and Transform it to Json Object
	async createFilter() {
		result = await createFilter(
			this.state.selectedClothe,
			this.state.selectedColor,
			this.state.selectedSize,
			this.state.selectedMinPrice,
			this.state.selectedMaxPrice
		);

		if (result == 'OK') {
			this.props.dispatchAddFilter();
			this.props.navigation.navigate('Filters');
			ToastAndroid.show('Filtro Criado!', ToastAndroid.LONG);
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
		dispatchAddFilter: () => {
			dispatch(addFilter());
		}
	};
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
	},
	shadow: {
		shadowColor: 'black',
		shadowOffset: { width: 0, height: 2 },
		shadowRadius: 4,
		shadowOpacity: 0.2,
		elevation: 2
	},
	button: {
		marginTop: 6,
		alignSelf: 'center',
		marginBottom: theme.SIZES.BASE,
		width: width - theme.SIZES.BASE * 3.5,
		borderRadius: 25,
		paddingVertical: 13
	},
	containerStyle: {
		borderWidth: 1,
		borderRadius: 2,
		borderColor: '#ddd',
		borderBottomWidth: 0,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.8,
		shadowRadius: 2,
		elevation: 1,
		marginLeft: 5,
		marginRight: 5,
		marginTop: 10,
	  }
});
