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
	Dimensions
} from 'react-native';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
global.Buffer = global.Buffer || require('buffer').Buffer;
import { getFilters } from '../modules/filter/filter.api';
import Loading from './Loading';
import { Button, theme } from '../galio';

const { width } = Dimensions.get('screen');

class Filters extends Component {
	state = {
		selectedFilters: [],
		switchValues: [false, false],
		filters: [],
		loading: true
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
		console.log(newState);
		if (newState != null) {
			this.setState({ filters: newState, numPosts: newState.length, loading: false });
		}

		return;
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
						backgroundColor: 'white'
					}}>
					<Text style={{ flex: 3, textAlign: 'center' }}>OS MEUS FILTROS</Text>
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
		if (this.state.loading == true) return <Loading />;
		else {
			console.log('entra no flatlist');
			return (
				<ScrollView scrollEventThrottle={16}>
					<View style={{ flex: 1, backgroundColor: 'red', margin: 10 }}>
						<FlatList
							data={this.state.filters}
							keyExtractor={(item, index) => item.id.toString()}
							style={styles.list}
							renderItem={({ item, index }) => {
								return this.buildSingleFilter(item, index);
							}}
						/>
					</View>
					<Button
						shadowless
						color="#3498DB"
						style={[styles.button, styles.shadow]}
						onPress={this.searchFilters}>
						Procurar
					</Button>
				</ScrollView>
			);
		}
	}

	buildSingleFilter(item, index) {
		return (
			<View
				key={'filter' + index}
				style={{
					height: 80,
					flexDirection: 'row',
					alignItems: 'center',
					justifyContent: 'center',
					backgroundColor: 'green'
				}}>
				<Text style={{ flex: 1, margin: 10, justifyContent: 'center' }}>
					{item.category}
				</Text>
				<Text style={{ flex: 1, margin: 10, justifyContent: 'center' }}>{item.color}</Text>
				<Text style={{ flex: 1, margin: 10, justifyContent: 'center' }}>{item.size}</Text>
				<Text style={{ flex: 1, margin: 10, justifyContent: 'center' }}>
					{item.priceMin}
				</Text>
				<Text style={{ flex: 1, margin: 10, justifyContent: 'center' }}>
					{item.priceMax}
				</Text>
				<Switch
					style={{ margin: 10 }}
					// controla switchValues, filterId servirá para selectedFilters
					onValueChange={value =>
						this.toggleSwitch({ i: 0, newValue: value, filterId: 'filter' + index })
					}
					value={this.state.switchValues[0]}></Switch>
			</View>
		);
	}

	async searchFilters() {
		console.log('entrou no coiso');

		return;
	}
}
export default Filters;

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
		marginBottom: theme.SIZES.BASE,
		width: width - theme.SIZES.BASE * 3.5,
		borderRadius: 25,
		paddingVertical: 13
	}
});
