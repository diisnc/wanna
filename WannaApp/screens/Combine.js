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
	Switch
} from 'react-native';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
global.Buffer = global.Buffer || require('buffer').Buffer;

class Combine extends Component {
	state = {
		wishlistData: [],
		numPosts: 0,
		selectedFilters: [],
		switchValues: [false, false]
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
					{this.buildCombination()}
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
	buildFilterList() {
		return (
			<View style={{ flex: 1, backgroundColor: 'white', margin: 10 }}>
				{/* Upper clothes selector */}
				<View style={{ flex: 1, backgroundColor: 'white', margin: 10 }}>
					this.buildUpperClothesSlider();
				</View>
				{/* Lower clothes selector */}
				<View style={{ flex: 1, backgroundColor: 'white', margin: 10 }}>
					this.buildLowerClothesSlider();
				</View>
			</View>
		);
	}

	// Build Upper Clothes selection slider and zoom
	buildUpperClothesSlider() {
		return(
			<ScrollView scrollEventThrottle={16}>
				{/* um filtro */}
				<View
					key={'filter1'}
					style={{
						height: 80,
						flexDirection: 'row',
						alignItems: 'center',
						justifyContent: 'center',
						backgroundColor: 'green'
					}}>
					<Text style={{ flex: 1, margin: 10, justifyContent: 'center' }}>
						Cima1
					</Text>
				</View>
				{/* um filtro */}
				<View
					key={'filter2'}
					style={{
						height: 100,
						flexDirection: 'row',
						alignItems: 'center',
						justifyContent: 'center',
						backgroundColor: 'yellow'
					}}>
					<Text style={{ flex: 1, margin: 10, justifyContent: 'center' }}>
						Cima2
					</Text>
				</View>
			</ScrollView>
		);
	}

	//Build Lower Clothes selection slider and zoom
	buildLowerClothesSlider() {
		return (
			<ScrollView scrollEventThrottle={16}>
				{/* um filtro */}
				<View
					key={'filter1'}
					style={{
						height: 80,
						flexDirection: 'row',
						alignItems: 'center',
						justifyContent: 'center',
						backgroundColor: 'green'
					}}>
					<Text style={{ flex: 1, margin: 10, justifyContent: 'center' }}>
						Baixo1
					</Text>
				</View>
				{/* um filtro */}
				<View
					key={'filter2'}
					style={{
						height: 100,
						flexDirection: 'row',
						alignItems: 'center',
						justifyContent: 'center',
						backgroundColor: 'yellow'
					}}>
					<Text style={{ flex: 1, margin: 10, justifyContent: 'center' }}>
						Baixo2
					</Text>
				</View>
			</ScrollView>
		);
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
export default Combine;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center'
	}
});
