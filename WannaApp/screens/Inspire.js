import React, { Component, Fragment } from 'react';
import {
	View,
	Text,
	StyleSheet,
	SafeAreaView,
	TextInput,
	Platform,
	ScrollView,
	Image,
	Dimensions,
	FlatList,
	TouchableOpacity,
	StatusBar
} from 'react-native';
import { connect } from 'react-redux';
global.Buffer = global.Buffer || require('buffer').Buffer;
import { feed } from '../modules/post/post.api';
import { searchUser } from '../modules/profile/profile.api';
import UserPost from './UserPost';
import Loading from './Loading';
import { SearchBar, ListItem } from 'react-native-elements';
const { height, width } = Dimensions.get('window');

class Inspire extends Component {
	state = {
		feedData: [],
		numPosts: 0,
		loading: true,
		inputSearch: null,
		searchR: []
	};

	componentDidMount() {
		this.startHeaderHeight = 500;
		if (Platform.OS == 'android') {
			this.startHeaderHeight = 500;
		}

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
		const newState = await feed(0);
		// console.log(newState);
		if (newState != null) {
			this.setState({ feedData: newState, numPosts: newState.length, loading: false });
			this.props.dispatchPosts(newState);
		}
		// this.setState({ loading: false });

		return;
	}

	render() {
		const loggedIn = this.props.loggedIn;
		const token = this.props.tokenValid;
		if (loggedIn == true && token == true) {
			if (this.state.numPosts != 0) {
				return (
					<SafeAreaView style={{ flex: 1 }}>
						<StatusBar barStyle="dark-content" backgroundColor="white" />
						{/* Full Page Box */}
						<View
							style={{
								flex: 1,
								flexDirection: 'column',
								justifyContent: 'flex-start',
								alignItems: 'stretch'
							}}>
							{this.buildHeader()}
							{this.buildInstaStyle()}
						</View>
					</SafeAreaView>
				);
			} else
				return (
					<SafeAreaView style={{ flex: 1 }}>
						<StatusBar barStyle="dark-content" backgroundColor="white" />
						{/* Full Page Box */}
						<View
							style={{
								flex: 1,
								flexDirection: 'column',
								justifyContent: 'flex-start',
								alignItems: 'stretch'
							}}>
							{this.buildHeader()}
							<Loading />
						</View>
					</SafeAreaView>
				);
		} else
			return (
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
						{<Text>Autenticação Falhada</Text>}
					</View>
				</SafeAreaView>
			);
	}

	// Builds header of the page
	buildHeader() {
		return (
			// Safe Box for Android
			<View style={{ paddingTop: 20, height: 'auto', flex: 0 }}>
				{/* Search Box */}
				<View style={styles.viewStyle}>
					<SearchBar
						round
						lightTheme
						searchIcon={{ size: 24 }}
						onChangeText={text => this.updateSearch(text)}
						placeholder="Pesquisa por utilizador..."
						autoCorrect={false}
						value={this.state.inputSearch}
						containerStyle={{ backgroundColor: 'white' }}
						onClear={this.clearResults}
						onCancel={this.clearResults}
					/>
					{this.state.searchR == null ? null : (
						<FlatList
							data={this.state.searchR}
							ItemSeparatorComponent={this.ListViewItemSeparator}
							//Item Separator View
							renderItem={({ item }) => (
								// Single Comes here which will be repeatative for the FlatListItems
								<TouchableOpacity
									onPress={() => {
										this.props.navigation.navigate('UserProfile', {
											userID: item.username
										});
									}}>
									<Text style={styles.textStyle}>{item.username}</Text>
								</TouchableOpacity>
							)}
							enableEmptySections={true}
							style={{ marginTop: 10 }}
							keyExtractor={(item, index) => item.username.toString()}
						/>
					)}
				</View>
			</View>
		);
	}

	ListViewItemSeparator = () => {
		//Item sparator view
		return (
			<View
				style={{
					height: 0.3,
					width: '90%',
					backgroundColor: '#080808'
				}}
			/>
		);
	};

	clearResults = () => {
		this.setState({ searchR: null });
	};

	updateSearch = async search => {
		this.setState({ inputSearch: search });
		if (search != null) {
			this.searchFilterFunction(search);
		}
	};

	searchFilterFunction = async text => {
		resultSearch = await searchUser(text);
		this.setState({ searchR: resultSearch });
	};

	// Insta style feed using UserPost
	buildInstaStyle() {
		if (this.state.loading == true) return <Loading />;
		else {
			return (
				<View style={styles.container}>
					{this.state.loading == true ? null : (
						<FlatList
							data={this.state.feedData}
							keyExtractor={(item, index) => index.toString()}
							style={styles.list}
							renderItem={({ item, index }) => {
								return <UserPost item={item} navigation={this.props.navigation} />;
							}}
						/>
					)}
				</View>
			);
		}
	}
}

function mapStateToProps(store) {
	return { loggedIn: store.auth.loggedIn, tokenValid: store.auth.tokenIsValid };
}

function mapDispatchToProps(dispatch) {
	return {
		dispatchPosts: data => {
			dispatch({ type: 'LOADED_POSTS', posts: data });
		}
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Inspire);

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#ddd'
	},
	item: {
		flex: 1,
		width: width,
		overflow: 'hidden',
		marginBottom: 5,
		justifyContent: 'space-between',
		borderBottomWidth: 1,
		borderBottomColor: '#999'
	},
	subItem: {
		padding: 5,
		width: width,
		flexDirection: 'row',
		justifyContent: 'space-between'
	},
	imageView: {
		width: '100%',
		height: height * 0.4
	},
	image: {
		resizeMode: 'cover',
		width: '100%',
		height: 275
	},
	list: {
		flex: 1,
		color: '#eee',
		backgroundColor: 'white'
	},
	viewStyle: {
		height: 'auto',
		flex: 0,
		backgroundColor: 'red',
		marginTop: Platform.OS == 'ios' ? 30 : 0
	},
	textStyle: {
		padding: 10
	}
});
