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
import { upperitemsCombine, loweritemsCombine } from '../modules/post/post.api';
import Loading from './Loading';

class Combine extends Component {
	state = {
		upperClothes: [],
		numUpperClothes: 0,
		selectedUpperClothe: null,
		lowerClothes: [],
		numLowerClothes: 0,
		selectedLowerClothe: null,
		width: 0,
		loading: true,
		completed: false,
		fontLoaded: false
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
		// get width for carousel purposes
		this.setState({ width: Dimensions.get('window').width * 0.75 });
		// get data from servers and save in state
		this.getFeedDataFromApiAsync();
	}

	componentDidUpdate(prevProps) {
		// console.log('mudou');
		const hasAChanged = this.props.loggedIn !== prevProps.loggedIn;
		const hasBChanged = this.props.tokenValid !== prevProps.tokenValid;
		if (
			(hasAChanged || hasBChanged) &&
			this.props.tokenValid == true &&
			this.props.loggedIn == true
		) {
			// console.log('vai pintar');
			this.getFeedDataFromApiAsync();
		}
	}

	async getFeedDataFromApiAsync() {
		// const newState = require('./json/responseFeed');
		const newStateA = await upperitemsCombine();
		const newStateB = await loweritemsCombine();
		// console.log(newState);
		if (newStateA != null && newStateB != null) {
			this.setState({
				upperClothes: newStateA,
				numUpperClothes: newStateA.length,
				lowerClothes: newStateB,
				numLowerClothes: newStateB.length,
				loading: false
			});
		}
		// this.setState({ loading: false });

		return;
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

	async componentWillMount() {
		await Expo.Font.loadAsync({
			'run': require('../assets/fonts/run.ttf'),
		});
		this.setState({ fontLoaded: true });
	}

	// Builds header of the page
	buildHeader() {
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
						COMBINAR
					</Text>
					<View style={{
						width: '50%',
						height: '100%',
						justifyContent: 'flex-end',
						alignItems: 'flex-end'
					}}>
						<Image
							source={require('../assets/round_add.png')}
							style={{
								height: '90%',
								aspectRatio: 1,
								overflow: 'hidden'
							}}
							resizeMode="contain"
							onPress={() => this.props.navigation.navigate('NewFilter')}
						/>
					
					
					</View>
				</View>
			</View>
			);
		}
	}

	// Builds list of filters
	buildCombination() {
		if (this.state.loading == true) return <Loading />;
		else {
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
						source={{uri: this.state.upperClothes[post].photoData}}
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
						source={{uri: this.state.lowerClothes[post].photoData}}
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
