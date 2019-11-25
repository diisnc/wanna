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
import { getFilters } from '../modules/filter/filter.api';

class Filters extends Component {
	state = {
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

		this.getFiltersFromAPI();
	}

	async getFiltersFromAPI() {
		const newState = await getFilters();
		// console.log(newState);
		if (newState != null) {
			this.setState({ feedData: newState, numPosts: newState.length, loading: false });
		}

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
					{/* this.buildWishlist() */}
					{this.buildFilterList()}
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
					<MaterialIcons.Button
						name="arrow-back"
						size={40}
						style={{ flex: 1 }}
						onPress={() => this.props.navigation.navigate('Wanted')}
					/>
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
			<ScrollView scrollEventThrottle={16}>
				<View style={{ flex: 1, backgroundColor: 'white', margin: 10 }}>
					<FlatList
						data={this.state.list}
						keyExtractor={(item, index) => index.toString()}
						style={styles.list}
						renderItem={({ item, index }) => {
							return this.buildSingleFilter(item, index);
						}}
					/>
				</View>
			</ScrollView>
		);
	}

	buildSingleFilter(item, index) {
		<View
			key={'filter' + index}
			style={{
				height: 80,
				flexDirection: 'row',
				alignItems: 'center',
				justifyContent: 'center',
				backgroundColor: 'green'
			}}>
			<Text style={{ flex: 1, margin: 10, justifyContent: 'center' }}>Camisola</Text>
			<Text style={{ flex: 1, margin: 10, justifyContent: 'center' }}>Azul</Text>
			<Text style={{ flex: 1, margin: 10, justifyContent: 'center' }}>L</Text>
			<Text style={{ flex: 1, margin: 10, justifyContent: 'center' }}>10€</Text>
			<Text style={{ flex: 1, margin: 10, justifyContent: 'center' }}>15€</Text>
			<Switch
				style={{ margin: 10 }}
				// controla switchValues, filterId servirá para selectedFilters
				onValueChange={value =>
					this.toggleSwitch({ i: 0, newValue: value, filterId: 'filter' + index })
				}
				value={this.state.switchValues[0]}></Switch>
		</View>;
	}
}
export default Filters;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center'
	}
});
