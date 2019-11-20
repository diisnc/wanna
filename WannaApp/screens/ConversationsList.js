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
	TouchableOpacity,
	TouchableHighlight,
	FlatList
} from 'react-native';
import { createFilter } from '../modules/filter/filter.api';
import { connect } from 'react-redux';
import ModalDropdown from 'react-native-modal-dropdown';
import { MaterialIcons } from '@expo/vector-icons';
import { enteringOnChat } from '../modules/chat/chat.reducer';
global.Buffer = global.Buffer || require('buffer').Buffer;

const maleClothes = ['Camisa', 'Camisola', 'Sweat', 'T-shirt', 'Calças', 'Casaco', 'Outro'];
const femaleClothes = ['Top', 'Blusa', 'Vestido', 'Saia', 'Calças', 'Casaco', 'Outro'];
const colors = ['Azul', 'Vermelho', 'Preto', 'Branco', 'Outra'];
const sizes = ['XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL', 'Outro'];
const numSizes = ['32', '34', '36', '38', '40', '42', '44', '46', '48', '50', '52', '54', '56'];
const prices = [1, 2, 3, 4, 5, 10, 15, 30, 50, 100];

class ConversationsList extends Component {
	constructor(props) {
		super(props);
	}

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

	componentDidMount() {
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
					<Text style={{ flex: 3, textAlign: 'center' }}>Conversas</Text>
				</View>
			</View>
		);
	}

	// Builds list of filters
	buildFilterForm() {
		data = [
			{
				id: 1,
				idPost: 31,
				contact: 'tarraxa',
				avatarContact: null
			},
			{
				id: 2,
				idPost: 32,
				contact: 'tarraxa Bonita',
				avatarContact: null
			}
		];
		return (
			<ScrollView scrollEventThrottle={16}>
				<View style={{ flex: 1, backgroundColor: 'white', margin: 10 }}>
					<FlatList
						data={data}
						renderItem={({ item }) => (
							<TouchableHighlight
								onPress={() =>
									this.props.enterChat(
										item.contact,
										item.avatarContact,
										item.idPost
									)
								}>
								<View style={{ backgroundColor: 'red', marginBottom: 5 }}>
									<Text>{item.idPost}</Text>
									<Text>{item.contact}</Text>
								</View>
							</TouchableHighlight>
						)}
						keyExtractor={item => item.id.toString()}
					/>
				</View>
			</ScrollView>
		);
	}

	// Get Data to Build Feed and Transform it to Json Object
	async createFilterAsync() {
		await createFilter(
			this.state.selectedGenre,
			this.state.selectedClothe,
			this.state.selectedColor,
			this.state.selectedSize,
			this.state.selectedMinPrice,
			this.state.selectedMaxPrice
		);

		return;
	}
}
function mapStateToProps(store, ownProps) {
	return {};
}
function mapDispatchToProps(dispatch) {
	return {
		enterChat: (contact, avatarContact, idPost) => {
			dispatch(enteringOnChat(contact, avatarContact, idPost));
		}
	};
}
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ConversationsList);

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center'
	}
});
