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
	Switch,
	FlatList,
	ToastAndroid,
	TouchableHighlight,
	Dimensions
} from 'react-native';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
global.Buffer = global.Buffer || require('buffer').Buffer;

class Combine extends Component {
	state = {
		upperClothes: [],
		numUpperClothes: 0,
		selectedUpperClothe: null,
		lowerClothes: [],
		numLowerClothes: 0,
		selectedLowerClothe: null,
		width: 0
	};

	//onValueChange of the switch this function will be called
	toggleSwitch(newState) {
		//console.log("Antigo state: " + this.state.selectedFilters)

		// change toggle value
		let switchValuesCopy = [...this.state.switchValues];
		switchValuesCopy[newState.i] = newState.newValue;
		this.setState({ switchValues: switchValuesCopy });
		// add to selected filters
		var selectedFiltersCopy = [...this.state.selectedFilters];
		if (newState.newValue == true) {
			selectedFiltersCopy.push(newState.filterId);
		}
		// remove from selected filters
		else {
			let index = selectedFiltersCopy.indexOf(newState.filterId);
			if (index > -1) {
				selectedFiltersCopy.splice(index, 1);
			}
		}
		this.setState({ selectedFilters: selectedFiltersCopy });

		//console.log(newState.newValue)
		//console.log(newState.filterId)
	}

	componentDidMount() {
		this.startHeaderHeight = 80;
		if (Platform.OS == 'android') {
			this.startHeaderHeight = 60;
		}

		// get data from servers and save in state
		this.getWishlistDataFromApiAsync();

		// get width for carousel purposes
		this.setState({ width: Dimensions.get('window').width * 0.75 });
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
					{this.buildCombination()}
					{this.checkout()}
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
					<Text style={{ flex: 3, textAlign: 'center' }}>NEW FILTER</Text>
					<MaterialCommunityIcons.Button
						name="plus"
						size={40}
						style={{ flex: 1 }}
						onPress={() => this.props.navigation.navigate('NewFilter')}
					/>
				</View>
			</View>
		);
	}

	// Builds list of filters
	buildCombination() {
		return (
			<View
				style={{
					flex: 8,
					backgroundColor: 'black',
					justifyContent: 'space-around',
					alignItems: 'center'
				}}>
				{/* Upper clothes selector */}
				{this.buildUpperClothesSlider()}
				{/* Lower clothes selector */}
				{this.buildLowerClothesSlider()}
			</View>
		);
	}

	// Build Upper Clothes selection slider and zoom
	buildUpperClothesSlider() {
		return (
			<View
				style={{
					flex: 1,
					width: this.state.width,
					backgroundColor: 'green',
					margin: 10,
					justifyContent: 'space-around',
					alignItems: 'center'
				}}>
				{/* upper selector */}
				<FlatList
					horizontal
					data={this.state.upperClothes}
					renderItem={({ index }) =>
						this.buildUpperImages(index, this.state.selectedUpperClothe)
					}
					keyExtractor={item => item.id.toString()}
					onEndReached={this.onEndReachedUpper.bind(this)}
					pagingEnabled
					decelerationRate={0}
					snapToInterval={this.state.width}
					snapToAlignment={'center'}
				/>
			</View>
		);
	}

	// Build Lower Clothes selection slider and zoom
	buildLowerClothesSlider() {
		return (
			<View
				style={{
					flex: 1,
					width: this.state.width,
					backgroundColor: 'green',
					margin: 10,
					justifyContent: 'space-around',
					alignItems: 'center'
				}}>
				{/* upper selector */}
				<FlatList
					horizontal
					data={this.state.lowerClothes}
					renderItem={({ index }) =>
						this.buildLowerImages(index, this.state.selectedLowerClothe)
					}
					keyExtractor={item => item.id.toString()}
					onEndReached={this.onEndReachedLower.bind(this)}
					pagingEnabled
					decelerationRate={0}
					snapToInterval={this.state.width}
					snapToAlignment={'center'}
				/>
			</View>
		);
	}

	// Build Checkout
	checkout() {
		var lowerIndex = this.state.selectedLowerClothe;
		if (lowerIndex != null) {
			var lowerPrice = parseInt(this.state.lowerClothes[lowerIndex].price);
		} else {
			var lowerPrice = 0;
		}

		var upperIndex = this.state.selectedUpperClothe;
		if (upperIndex != null) {
			var upperPrice = parseInt(this.state.upperClothes[upperIndex].price);
		} else {
			var upperPrice = 0;
		}

		var sum = lowerPrice + upperPrice;

		return (
			<View style={{ flex: 1, backgroundColor: 'green', margin: 10 }}>
				{/* upper selector */}
				<Text>{sum} €</Text>
			</View>
		);
	}

	// Build images on upper scroll view
	buildUpperImages(post, selectedUpper) {
		id = 'id= ' + JSON.stringify(this.state.upperClothes[post].id);
		objJsonB64 = new Buffer(this.state.upperClothes[post].photoData1).toString('base64');

		return (
			<TouchableHighlight onPress={() => this.onPressUpperClothe(post)}>
				<View
					key={id}
					style={{
						width: this.state.width,
						height: '100%',
						backgroundColor: 'yellow',
						justifyContent: 'space-around',
						alignItems: 'center'
					}}>
					<Image
						source={{
							uri:
								'data:' +
								this.state.upperClothes[post].photoType1 +
								';base64,' +
								objJsonB64 +
								''
						}}
						style={{
							height: '90%',
							aspectRatio: 1,
							overflow: 'hidden'
						}}
						resizeMode="contain"
					/>
					{selectedUpper == post ? <Text style={{ flex: 1 }}>Selecionada</Text> : null}
				</View>
			</TouchableHighlight>
		);
	}

	// Build images on upper scroll view
	buildLowerImages(post, selectedLower) {
		id = 'id= ' + JSON.stringify(this.state.lowerClothes[post].id);
		objJsonB64 = new Buffer(this.state.lowerClothes[post].photoData1).toString('base64');

		return (
			<TouchableHighlight onPress={() => this.onPressLowerClothe(post)}>
				<View
					key={id}
					style={{
						width: this.state.width,
						height: '100%',
						backgroundColor: 'yellow',
						justifyContent: 'space-around',
						alignItems: 'center'
					}}>
					<Image
						source={{
							uri:
								'data:' +
								this.state.lowerClothes[post].photoType1 +
								';base64,' +
								objJsonB64 +
								''
						}}
						style={{
							height: '90%',
							aspectRatio: 1,
							overflow: 'hidden'
						}}
						resizeMode="contain"
					/>
					{selectedLower == post ? <Text>Selecionada</Text> : null}
				</View>
			</TouchableHighlight>
		);
	}

	// Save selected upper clothe
	onPressUpperClothe(index) {
		// if no clothes have been selected yet
		if (this.state.selectedUpperClothe == null) {
			this.setState({ selectedUpperClothe: index });
			ToastAndroid.show('Upper clothe added to cart', ToastAndroid.SHORT);
		}
		// if the same clothe is selected, we remove the selection
		else if (this.state.selectedUpperClothe == index) {
			this.setState({ selectedUpperClothe: null });
			ToastAndroid.show('Upper clothe removed from cart', ToastAndroid.SHORT);
		}
		// if a different clothe is chosen, replace the previous
		else {
			this.setState({ selectedUpperClothe: index });
			ToastAndroid.show('Upper clothe replaced on cart', ToastAndroid.SHORT);
		}
	}

	// Save selected upper clothe
	onPressLowerClothe(index) {
		// if no clothes have been selected yet
		if (this.state.selectedLowerClothe == null) {
			this.setState({ selectedLowerClothe: index });
			ToastAndroid.show('Lower clothe added to cart', ToastAndroid.SHORT);
		}
		// if the same clothe is selected, we remove the selection
		else if (this.state.selectedLowerClothe == index) {
			this.setState({ selectedLowerClothe: null });
			ToastAndroid.show('Lower clothe removed from cart', ToastAndroid.SHORT);
		}
		// if a different clothe is chosen, replace the previous
		else {
			this.setState({ selectedLowerClothe: index });
			ToastAndroid.show('Lower clothe replaced on cart', ToastAndroid.SHORT);
		}
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
		this.setState({
			upperClothes: newState,
			lowerClothes: newState,
			numUpperClothes: newState.length,
			numLowerClothes: newState.length
		});

		return;
	}

	// Get extra content to Upper Clothes
	async onEndReachedUpper() {
		// inserir métodos de fetch assincronos
		// adicionar objetos ao estado upper clothes
	}

	// Get extra content to Lower Clothes
	async onEndReachedLower() {
		// inserir métodos de fetch assincronos
		// adicionar objetos ao estado lower clothes
	}
}
export default Combine;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center'
	}
});
