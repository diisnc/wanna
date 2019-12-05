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
import UserPost from './UserPost';
import Loading from './Loading';
import { SearchBar, ListItem } from 'react-native-elements';
const { height, width } = Dimensions.get('window');

class Inspire extends Component {
	state = {
		feedData: [],
		numPosts: 0,
		loading: true
	};

	componentDidMount() {
		this.startHeaderHeight = 80;
		if (Platform.OS == 'android') {
			this.startHeaderHeight = 60;
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
		console.log('login ' + loggedIn);
		console.log('token valid ' + token);
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
			<View
				style={{
					height: this.startHeaderHeight,
					backgroundColor: 'white',
					borderBottomWidth: 1,
					borderBottomColor: '#dddddd'
				}}>
				{/* Search Box */}
				<View
					style={{
						height: '90%',
						flexDirection: 'row',
						padding: 10,
						backgroundColor: 'white',
						marginHorizontal: 20,
						shadowOffset: { width: 0, height: 0 },
						shadowColor: 'black',
						shadowOpacity: 0.2,
						elevation: 1,
						justifyContent: 'flex-end'
					}}>
					<SearchBar
						style={{ marginTop: 100 }}
						placeholder="Search"
						onIconPress={() => Alert.alert('HEHE')}
					/>
				</View>
			</View>
		);
	}

	searchFilterFunction = text => {
		this.setState({ data: newData });

		return (
			<List containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0 }}>
				<FlatList
					data={this.state.data}
					renderItem={({ item }) => (
						<ListItem
						/>
					)}
					keyExtractor={item => item.email}
					ItemSeparatorComponent={this.renderSeparator}
					ListHeaderComponent={this.renderHeader}
				/>
			</List>
		);
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

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Inspire);

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
	}
});
