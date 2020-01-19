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
import { connect } from 'react-redux';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
global.Buffer = global.Buffer || require('buffer').Buffer;
import { getFilters, enableFilter, disableFilter } from '../modules/filter/filter.api';
import { loadFilters } from '../modules/profile/profile.reducer';
import Loading from './Loading';
import { Button, theme } from '../galio';

const { width } = Dimensions.get('screen');

class Filters extends Component {
	state = {
		filters: [],
		loading: true,
		completed: false,
		fontLoaded: false
	};

	componentDidMount() {
		this.startHeaderHeight = 80;
		if (Platform.OS == 'android') {
			this.startHeaderHeight = 60;
		}

		this.focusListener = this.props.navigation.addListener('didFocus', () => {
			this.onFocusFunction();
		});
	}

	onFocusFunction = () => {
		this.getFiltersFromAPI();
	};

	componentWillUnmount() {
		this.focusListener.remove();
	}

	async componentWillMount() {
		await Expo.Font.loadAsync({
			'run': require('../assets/fonts/run.ttf'),
		});
		this.setState({ fontLoaded: true });
	}

	componentDidUpdate(prevProps) {
		if (this.props.myNumFilters !== prevProps.myNumFilters && this.state.loading == false) {
			this.getFiltersFromAPI();
		}

		const hasAChanged = this.props.loggedIn !== prevProps.loggedIn;
		const hasBChanged = this.props.tokenValid !== prevProps.tokenValid;
		if (
			(hasAChanged || hasBChanged) &&
			this.props.tokenValid == true &&
			this.props.loggedIn == true
		) {
			this.getFiltersFromAPI();
		}
	}

	async getFiltersFromAPI() {
		const newState = await getFilters();

		if (newState != null) {
			this.props.dispatchFilters(newState.length);
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
		if (this.state.fontLoaded) {
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
							FILTROS
					</Text>
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
	}

	// Builds list of filters
	buildFilterList() {
		if (this.state.loading == true) return <Loading />;
		else {
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
						onPress={() => this.props.navigation.navigate('Wanted')}>
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
					onValueChange={value => this.customToggleSwitch(value, item.id)}
					value={item.isActive}></Switch>
			</View>
		);
	}

	customToggleSwitch(status, idFilter) {
		if (status == false) {
			this.disableFilterHandler(idFilter);
		} else this.enableFilterHandler(idFilter);
	}

	changeStatusState(booleanToChange, idFilter) {
		const newArray = this.state.filters.map(i =>
			i.id == idFilter ? Object.assign({}, i, { isActive: booleanToChange }) : i
		);

		this.setState({ filters: newArray });
	}

	async enableFilterHandler(idFilter) {
		const result = await enableFilter(idFilter);
		if (result == 'OK') {
			this.changeStatusState(true, idFilter);
		}
	}

	async disableFilterHandler(idFilter) {
		const result = await disableFilter(idFilter);
		if (result == 'OK') {
			this.changeStatusState(false, idFilter);
		}
	}
}

function mapStateToProps(store) {
	return {
		loggedIn: store.auth.loggedIn,
		tokenValid: store.auth.tokenIsValid,
		myNumFilters: store.profile.numFilters
	};
}

function mapDispatchToProps(dispatch) {
	return {
		dispatchFilters: nrPosts => {
			dispatch(loadFilters(nrPosts));
		}
	};
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Filters);

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
