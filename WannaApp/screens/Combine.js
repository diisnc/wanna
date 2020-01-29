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
import { Feather, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
global.Buffer = global.Buffer || require('buffer').Buffer;
import { upperitemsCombine, loweritemsCombine } from '../modules/post/post.api';
import Loading from './Loading';
import { Left } from 'native-base';
import { AntDesign } from 'expo-vector-icons';

global.indice = 0

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
		fontLoaded: false,
		currentUpperIndex: 0,
		currentLowerIndex: 0
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
						backgroundColor: '#fafafa',
						flexDirection: 'column',
						justifyContent: 'flex-start',
						alignItems: 'stretch'
					}}>
					{this.buildHeader()}
					{this.buildCombination()}
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
						paddingTop: 15,
						backgroundColor: '#fafafa',
						alignItems: 'center'
					}}>
					{/* Upper clothes selector */}
					{this.buildUpperClothesSlider()}
					{/* Lower clothes selector */}
					{this.buildLowerClothesSlider()}
					{this.checkout()}
				</View>
			);
		}
	}

	
	goPreviousUpper = () => {
		var upIndex = this.state.currentUpperIndex;
		var numClothes = this.state.numUpperClothes;
		console.log(upIndex + "; " + numClothes)
		if(upIndex > 0) {
			this.flatListRefUpper.scrollToIndex({ animated: true, index: upIndex - 1 });
			this.setState( {currentUpperIndex: upIndex - 1} );
			console.log(this.state.currentUpperIndex + "««« " + numClothes)
		}
	};

	goNextUpper = () => {
		var upIndex = this.state.currentUpperIndex;
		var numClothes = this.state.numUpperClothes;
		console.log(upIndex + "; " + numClothes)
		if(upIndex < numClothes - 1) {
			this.flatListRefUpper.scrollToIndex({ animated: true, index: upIndex + 1});
			this.setState( {currentUpperIndex: upIndex + 1} );
			console.log(this.state.currentUpperIndex + "««« " + numClothes)
			
		}
	};

	goPreviousLower = () => {
		var lowerIndex = this.state.currentLowerIndex;
		var numClothes = this.state.numLowerClothes;
		console.log(lowerIndex + "; " + numClothes)
		if(lowerIndex > 0) {
			this.flatListRefLower.scrollToIndex({ animated: true, index: lowerIndex - 1 });
			this.setState( {currentLowerIndex: lowerIndex - 1} );
			console.log(this.state.currentLowerIndex + "««« " + numClothes)
		}
	};

	goNextLower = () => {
		var lowerIndex = this.state.currentLowerIndex;
		var numClothes = this.state.numLowerClothes;
		console.log(lowerIndex + "; " + numClothes)
		if(lowerIndex < numClothes - 1) {
			this.flatListRefLower.scrollToIndex({ animated: true, index: lowerIndex + 1});
			this.setState( {currentLowerIndex: lowerIndex + 1} );
			console.log(this.state.currentLowerIndex + "««« " + numClothes)
			
		}
	};


	// Build Upper Clothes selection slider and zoom
	buildUpperClothesSlider() {
		return (
			<View
				style={{
					flex: 3,
					width: this.state.width,
					backgroundColor: '#fafafa',
					justifyContent: 'space-around',
					alignItems: 'center',
					flexDirection: 'row',
					width: '100%',
					marginTop: 10,
					paddingHorizontal: '2%'
				}}>
				{/* upper selector */}
				<View style={{justiftyContent:"center", alignItems:"center"}}>
   					<AntDesign.Button
						name="left"
						color={'#3498DB'}
						size={20}
						style={{ backgroundColor: '#fafafa', width: 40}}
						onPress={this.goPreviousUpper}
					/>
				</View>

				<FlatList
					style={{ flex: 4 }}
					horizontal
					ref={ (ref) => { this.flatListRefUpper = ref; } }
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

				<View style={{justiftyContent:"center", alignItems:"center"}}>
					<AntDesign.Button
						name="right"
						color={'#3498DB'}
						size={20}
						style={{ backgroundColor: '#fafafa', width: 45}}
						onPress={this.goNextUpper}
					/>
				</View>
			</View>
		);
	}

	// Build Lower Clothes selection slider and zoom
	buildLowerClothesSlider() {
		return (
			<View
				style={{
					flex: 3,
					width: this.state.width,
					backgroundColor: '#fafafa',
					justifyContent: 'space-around',
					alignItems: 'center',
					flexDirection: 'row',
					width: '100%',
					marginTop: 10,
					paddingHorizontal: '2%'
				}}>
				{/* upper selector */}

				<View style={{justiftyContent:"center", alignItems:"center"}}>
   					<AntDesign.Button
						name="left"
						color={'#3498DB'}
						size={20}
						style={{ backgroundColor: '#fafafa', width: 40}}
						onPress={this.goPreviousLower}
					/>
				</View>


				<FlatList
					horizontal
					ref={ (ref) => { this.flatListRefLower = ref; } }
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

				<View style={{justiftyContent:"center", alignItems:"center"}}>
					<AntDesign.Button
						name="right"
						color={'#3498DB'}
						size={20}
						style={{ backgroundColor: '#fafafa', width: 45}}
						onPress={this.goNextLower}
					/>
				</View>

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
			<View style={{backgroundColor: '#fafafa', flex: 1, width: '50%', justifyContent:'center'}}>
				{/* upper selector */}
				<Text style={[styles.containerStyle]}>Valor total do conjunto: {"\n"}<Text style={{ color:'#3498DB', fontWeight: 'bold' }}>{sum}€</Text></Text>
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
						backgroundColor: '#fafafa',
						justifyContent: 'space-around',
						alignItems: 'center',
					}}>
					<Image
						source={{uri: this.state.upperClothes[post].photoData}}
						style={{
							height: '90%',
							aspectRatio: 1,
							overflow: 'hidden',
							borderRadius: 20
						}}
						resizeMode="cover"
					/>
					{selectedUpper == post ? 
						<View style={{ paddingHorizontal: 20 ,flexDirection: 'row',marginBottom: 8}}>
							<Text style={{ flex: 1, textAlign: 'left'}}>Peça Selecionada</Text>
							<Text style={{ color:'#3498DB', fontWeight: 'bold', flex: 1, textAlign: 'right'}}>{this.state.upperClothes[this.state.selectedUpperClothe].price}€</Text>
						</View>
					 : null}
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
						backgroundColor: '#fafafa',
						justifyContent: 'space-around',
						alignItems: 'center'
					}}>
					<Image
						source={{uri: this.state.lowerClothes[post].photoData}}
						style={{
							height: '90%',
							aspectRatio: 1,
							overflow: 'hidden',
							borderRadius: 20
						}}
						resizeMode="cover"
					/>
					{selectedLower == post ? 
						<View style={{ paddingHorizontal: 20 ,flexDirection: 'row'}}>
							<Text style={{ flex: 1, textAlign: 'left'}}>Peça Selecionada</Text>
							<Text style={{ color:'#3498DB', fontWeight: 'bold', flex: 1, textAlign: 'right'}}>{this.state.lowerClothes[this.state.selectedLowerClothe].price}€</Text>
						</View>
					 : null}
				</View>
			</TouchableHighlight>
		);
	}

	// Save selected upper clothe
	onPressUpperClothe(index) {
		// if no clothes have been selected yet
		if (this.state.selectedUpperClothe == null) {
			this.setState({ selectedUpperClothe: index });
			ToastAndroid.show('Peça superior adicionada', ToastAndroid.SHORT);
		}
		// if the same clothe is selected, we remove the selection
		else if (this.state.selectedUpperClothe == index) {
			this.setState({ selectedUpperClothe: null });
			ToastAndroid.show('Peça superior removida', ToastAndroid.SHORT);
		}
		// if a different clothe is chosen, replace the previous
		else {
			this.setState({ selectedUpperClothe: index });
			ToastAndroid.show('Peça superior substituída', ToastAndroid.SHORT);
		}
	}

	// Save selected upper clothe
	onPressLowerClothe(index) {
		// if no clothes have been selected yet
		if (this.state.selectedLowerClothe == null) {
			this.setState({ selectedLowerClothe: index });
			ToastAndroid.show('Peça inferior adicionada', ToastAndroid.SHORT);
		}
		// if the same clothe is selected, we remove the selection
		else if (this.state.selectedLowerClothe == index) {
			this.setState({ selectedLowerClothe: null });
			ToastAndroid.show('Peça inferior removida', ToastAndroid.SHORT);
		}
		// if a different clothe is chosen, replace the previous
		else {
			this.setState({ selectedLowerClothe: index });
			ToastAndroid.show('Peça inferior substituída', ToastAndroid.SHORT);
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
	},
	containerStyle: {
		borderWidth: 0.5,
		borderRadius: 2,
		borderColor: '#ddd',
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.8,
		shadowRadius: 2,
		elevation: 1,
		textAlign: 'center',
		paddingHorizontal: 10,
		paddingVertical: 5,
	}
});
