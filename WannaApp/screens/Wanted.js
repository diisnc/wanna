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
	TouchableHighlight,
	ToastAndroid,
	Animated,
	TouchableOpacity,
	FlatList,
	Dimensions
} from 'react-native';
import { AntDesign, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
global.Buffer = global.Buffer || require('buffer').Buffer;
import { searchByFilter } from '../modules/filter/filter.api';
import { Card, CardItem, Thumbnail, Body, Left, Right, Button, Icon } from 'native-base';
const screenWidth = Dimensions.get('window').width;
import { theme } from '../galio';

class Wanted extends Component {
	state = {
		wishlistData: [],
		numPosts: 0,
		loadingMoreData: false,
		fontLoaded: false
	};

	componentDidMount() {
		// get data from servers and save in state
		this.getDataFromAPI();

		this.focusListener = this.props.navigation.addListener('didFocus', () => {
			this.onFocusFunction();
		});
	}

	onFocusFunction = () => {
		this.getDataFromAPI();
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

	async getDataFromAPI() {
		const newState = await searchByFilter();
		// console.log(newState);
		if (newState != null) {
			this.setState({ wishlistData: newState, numPosts: newState.length, loading: false });
			console.log("num posts recebidos: " + this.state.numPosts)
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
					{this.buildFeed()}
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
						DESEJADOS
					</Text>

				</View>
			</View>
		);}
	}

	// Builds feed of the page
	buildFeed() {
		return (
			<ScrollView
				scrollEventThrottle={16}
				onScroll={Animated.event(
					[{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }],
					{
						listener: event => {
							if (this.isCloseToBottom(event.nativeEvent)) {
								this.loadMoreData();
							}
						}
					}
				)}>
				<View style={{ flex: 1, backgroundColor: 'white', margin: 10 }}>
					{this.handlerNrPosts()}
				</View>
			</ScrollView>
		);
	}

	handlerNrPosts() {
		if (this.state.wishlistData.length < 3)
			return (
				<View style={{ alignItems: 'center' }}>
					<FlatList
						data={this.state.wishlistData}
						keyExtractor={(item, index) => index.toString()}
						style={styles.list, alignItems = 'center'}
						renderItem={({ item, index }) => {
							return (
								<CardItem cardBody>
									<TouchableOpacity
										activeOpacity={0.8}
										onPress={() => {
											this.props.navigation.navigate('UserPostProfile', {
												postID: item.idPost
											});
										}}>
										<Image
											source={{ uri: item.photoData }}
											style={{
												alignSelf: 'center',
												height: 250,
												width: screenWidth * 0.9,
												borderRadius: screenWidth * 0.1,
												marginBottom: 10
											}}


										/>
									</TouchableOpacity>
								</CardItem>
							);
						}}
					/>
				</View>
			);
		else return this.buildFeedTile();
	}

	// Build 2+1, 3, 1+2, 3 tile grid
	buildFeedTile() {
		const items = [];

		//console.log(this.state.feedData)

		for (let post = 0, tileType = 1; (post < this.state.numPosts) && (post + 2 < this.state.numPosts); post += 3) {
			switch (tileType) {
				// 2+1 tile type
				case 1:
					items.push(this.genTileType1(post));
					tileType = 2;
					break; 
				// 3 tile type
				case 2:
					items.push(this.genTileType2(post));
					tileType = 3;
					break;
				// 1+2 tile type
				case 3:
					items.push(this.genTileType3(post));
					tileType = 4;
					break;
				// 3 tile type
				case 4:
					items.push(this.genTileType2(post));
					tileType = 1;
					break;
				// error case
				default:
					console.log('Tile type not found.');
			}
		}

		//console.log(items)
		return items;
	}

	// 2+1 tyle javascript generation
	genTileType1(post) {
		var primeiro = this.state.wishlistData[post];
		var segundo = this.state.wishlistData[post + 1];
		var terceiro = this.state.wishlistData[post + 2];
		var postsPrinted = post;
		var tileHeight = 250;

		// format data post 1
		printId1 = 'id= ' + JSON.stringify(primeiro.id);
		printIdUser1 = 'idUser= ' + JSON.stringify(primeiro.idUser);
		/*
		printIdUser1 = "idUser= " + JSON.stringify(primeiro.idUser);
		printDescription1 = "description= " + JSON.stringify(primeiro.description);
		printIsAvailable1 = "isAvailable= " + JSON.stringify(primeiro.isAvailable);
		printPrice1 = "price= " + JSON.stringify(primeiro.price);
		printPhotoType11 = "photoType1= " + JSON.stringify(primeiro.photoType1);
		*/
		// objJsonB641 = new Buffer(primeiro.photoData);
		// format data post 2
		printId2 = 'id= ' + JSON.stringify(segundo.id);
		/*
		printIdUser2 = "idUser= " + JSON.stringify(this.state.wishlistData[post+1].idUser);
		printDescription2 = "description= " + JSON.stringify(this.state.wishlistData[post+1].description);
		printIsAvailable2 = "isAvailable= " + JSON.stringify(this.state.wishlistData[post+1].isAvailable);
		printPrice2 = "price= " + JSON.stringify(this.state.wishlistData[post+1].price);
		printPhotoType12 = "photoType1= " + JSON.stringify(this.state.wishlistData[post+1].photoType1);
		*/
		// objJsonB642 = new Buffer(segundo.photoData);
		// format data post 3
		printId3 = 'id= ' + JSON.stringify(terceiro.id);
		/*
		printIdUser3 = "idUser= " + JSON.stringify(this.state.wishlistData[post+2].idUser);
		printDescription3 = "description= " + JSON.stringify(this.state.wishlistData[post+2].description);
		printIsAvailable3 = "isAvailable= " + JSON.stringify(this.state.wishlistData[post+2].isAvailable);
		printPrice3 = "price= " + JSON.stringify(this.state.wishlistData[post+2].price);
		printPhotoType13 = "photoType1= " + JSON.stringify(this.state.wishlistData[post+2].photoType1);
		*/
		// objJsonB643 = new Buffer(terceiro.photoData);

		// build javascript
		return (
			<View
				key={'superTile' + postsPrinted}
				style={{
					height: tileHeight,
					flexDirection: 'row',
					alignItems: 'stretch',
				}}>
				<View
					style={{
						flex: 1,
						margin: 10,
						flexDirection: 'column'
					}}>
					<View
						key={'tile' + postsPrinted}
						style={{ flex: 1, margin: 10}}>
						{/*
						<Text
							onPress={() =>
								this.props.navigation.navigate('Profile', { name: 'João' })
							}>
							{printIdUser1}
						</Text>
						*/}

						{/*
						<Text key={"idUser" + tyleNr}>{printIdUser1}</Text>
						<Text key={"description" + tyleNr}>{printDescription1}</Text>
						<Text key={"isAvailable" + tyleNr}>{printIsAvailable1}</Text>
						<Text key={"price" + tyleNr}>{printPrice1}</Text>
						<Text key={"photoType1" + tyleNr}>{printPhotoType11}</Text>
						*/}
						<TouchableOpacity
							style={{ flex: 1 }}
							activeOpacity={0.8}
							onPress={() => {
								this.props.navigation.navigate('UserPostProfile', {postID: primeiro.id});
							}}>
								
								<Image
									source={{ uri: primeiro.photoData }}
									style={{
										flex: 1,
										borderRadius: 20
									}}
									resizeMode="cover"
								/>
						</TouchableOpacity>
					</View>
					<View
						key={'tile' + postsPrinted + 1}
						style={{ flex: 1, margin: 10 }}>
						{/*
						<Text key={"idUser" + tyleNr+1}>{printIdUser2}</Text>
						<Text key={"description" + tyleNr+1}>{printDescription2}</Text>
						<Text key={"isAvailable" + tyleNr+1}>{printIsAvailable2}</Text>
						<Text key={"price" + tyleNr+1}>{printPrice2}</Text>
						<Text key={"photoType1" + tyleNr+1}>{printPhotoType12}</Text>
						*/}
						<TouchableOpacity
							style={{ flex: 1 }}
							activeOpacity={0.8}
							onPress={() => {
								this.props.navigation.navigate('UserPostProfile', {postID: segundo.id});
							}}>					
							<Image
								source={{ uri: segundo.photoData }}
								style={{
									flex: 1,
									borderRadius: 20
								}}
								resizeMode="cover"
							/>
						</TouchableOpacity>	
					</View>
				</View>
				<View
					key={'tile' + postsPrinted + 2}
					style={{ flex: 2, margin: 10 }}>
					{/*
					<Text key={"idUser" + tyleNr+2}>{printIdUser3}</Text>
					<Text key={"description" + tyleNr+2}>{printDescription3}</Text>
					<Text key={"isAvailable" + tyleNr+2}>{printIsAvailable3}</Text>
					<Text key={"price" + tyleNr+2}>{printPrice3}</Text>
					<Text key={"photoType1" + tyleNr+2}>{printPhotoType13}</Text>
					*/}
					<TouchableOpacity
							style={{ flex: 1 }}
							activeOpacity={0.8}
							onPress={() => {
								this.props.navigation.navigate('UserPostProfile', {postID: terceiro.id});
							}}>
							<Image
								source={{ uri: terceiro.photoData }}
								style={{
									flex: 1,
									borderRadius: 20
								}}
								resizeMode="cover"
							/>
					</TouchableOpacity>
				</View>
			</View>
		);
	}

	// 3 tyle javascript generation
	genTileType2(post) {
		var primeiro = this.state.wishlistData[post];
		var segundo = this.state.wishlistData[post + 1];
		var terceiro = this.state.wishlistData[post + 2];
		var postsPrinted = post;
		var tileHeight = 125;

		// format data post 1
		printId1 = 'id= ' + JSON.stringify(primeiro.id);
		printIdUser1 = 'idUser= ' + JSON.stringify(primeiro.idUser);
		/*
		printIdUser1 = "idUser= " + JSON.stringify(primeiro.idUser);
		printDescription1 = "description= " + JSON.stringify(primeiro.description);
		printIsAvailable1 = "isAvailable= " + JSON.stringify(primeiro.isAvailable);
		printPrice1 = "price= " + JSON.stringify(primeiro.price);
		printPhotoType11 = "photoType1= " + JSON.stringify(primeiro.photoType1);
		*/
		// objJsonB641 = new Buffer(primeiro.photoData);
		// format data post 2
		printId2 = 'id= ' + JSON.stringify(segundo.id);
		/*
		printIdUser2 = "idUser= " + JSON.stringify(this.state.wishlistData[post+1].idUser);
		printDescription2 = "description= " + JSON.stringify(this.state.wishlistData[post+1].description);
		printIsAvailable2 = "isAvailable= " + JSON.stringify(this.state.wishlistData[post+1].isAvailable);
		printPrice2 = "price= " + JSON.stringify(this.state.wishlistData[post+1].price);
		printPhotoType12 = "photoType1= " + JSON.stringify(this.state.wishlistData[post+1].photoType1);
		*/
		// objJsonB642 = new Buffer(segundo.photoData);
		// format data post 3
		printId3 = 'id= ' + JSON.stringify(terceiro.id);
		/*
		printIdUser3 = "idUser= " + JSON.stringify(this.state.wishlistData[post+2].idUser);
		printDescription3 = "description= " + JSON.stringify(this.state.wishlistData[post+2].description);
		printIsAvailable3 = "isAvailable= " + JSON.stringify(this.state.wishlistData[post+2].isAvailable);
		printPrice3 = "price= " + JSON.stringify(this.state.wishlistData[post+2].price);
		printPhotoType13 = "photoType1= " + JSON.stringify(this.state.wishlistData[post+2].photoType1);
		*/
		// objJsonB643 = new Buffer(terceiro.photoData);

		// build javascript
		return (
			<View
				key={'superTile' + postsPrinted}
				style={{
					height: tileHeight,
					flexDirection: 'row',
					alignItems: 'stretch',
				}}>
				<View
					style={{
						flex: 1,
						margin: 10
					}}>

					{/*
					<Text key={'id' + postsPrinted}>{printId1}</Text>
					<Text key={"idUser" + post}>{printIdUser1}</Text>
					<Text key={"description" + post}>{printDescription1}</Text>
					<Text key={"isAvailable" + post}>{printIsAvailable1}</Text>
					<Text key={"price" + post}>{printPrice1}</Text>
					<Text key={"photoType1" + post}>{printPhotoType11}</Text>
					*/}
					<TouchableOpacity
							style={{ flex: 1 }}
							activeOpacity={0.8}
							onPress={() => {
								this.props.navigation.navigate('UserPostProfile', {postID: primeiro.id});
							}}>
						<Image
							source={{ uri: primeiro.photoData }}
							style={{
								flex: 1,
								borderRadius: 20
							}}
							resizeMode="cover"
						/>
					</TouchableOpacity>
				</View>
				<View style={{ flex: 1, margin: 10 }}>

					{/*
					<Text key={'id' + postsPrinted + 1}>{printId2}</Text>
					<Text key={"idUser" + post+1}>{printIdUser2}</Text>
					<Text key={"description" + post+1}>{printDescription2}</Text>
					<Text key={"isAvailable" + post+1}>{printIsAvailable2}</Text>
					<Text key={"price" + post+1}>{printPrice2}</Text>
					<Text key={"photoType1" + post+1}>{printPhotoType12}</Text>
					*/}
					<TouchableOpacity
							style={{ flex: 1 }}
							activeOpacity={0.8}
							onPress={() => {
								this.props.navigation.navigate('UserPostProfile', {postID: segundo.id});
							}}>
						<Image
							source={{ uri: segundo.photoData }}
							style={{
								flex: 1,
								borderRadius: 20
							}}
							resizeMode="cover"
						/>
					</TouchableOpacity>
				</View>
				<View style={{ flex: 1, margin: 10 }}>
					{/*
					<Text key={'id' + postsPrinted + 2}>{printId3}</Text>
					<Text key={"idUser" + post+2}>{printIdUser3}</Text>
					<Text key={"description" + post+2}>{printDescription3}</Text>
					<Text key={"isAvailable" + post+2}>{printIsAvailable3}</Text>
					<Text key={"price" + post+2}>{printPrice3}</Text>
					<Text key={"photoType1" + post+2}>{printPhotoType13}</Text>
					*/}
					<TouchableOpacity
							style={{ flex: 1 }}
							activeOpacity={0.8}
							onPress={() => {
								this.props.navigation.navigate('UserPostProfile', {postID: terceiro.id});
							}}>
						<Image
							source={{ uri: terceiro.photoData }}
							style={{
								flex: 1,
								borderRadius: 20
							}}
							resizeMode="cover"
						/>
					</TouchableOpacity>
				</View>
			</View>
		);
	}

	// 1+2 tyle javascript generation
	genTileType3(post) {
		var primeiro = this.state.wishlistData[post];
		var segundo = this.state.wishlistData[post + 1];
		var terceiro = this.state.wishlistData[post + 2];
		var postsPrinted = post;
		var tileHeight = 250;

		// format data post 1
		printId1 = 'id= ' + JSON.stringify(primeiro.id);
		printIdUser1 = 'idUser= ' + JSON.stringify(primeiro.idUser);
		/*
		printIdUser1 = "idUser= " + JSON.stringify(primeiro.idUser);
		printDescription1 = "description= " + JSON.stringify(primeiro.description);
		printIsAvailable1 = "isAvailable= " + JSON.stringify(primeiro.isAvailable);
		printPrice1 = "price= " + JSON.stringify(primeiro.price);
		printPhotoType11 = "photoType1= " + JSON.stringify(primeiro.photoType1);
		*/
		// objJsonB641 = new Buffer(primeiro.photoData);
		// format data post 2
		printId2 = 'id= ' + JSON.stringify(segundo.id);
		/*
		printIdUser2 = "idUser= " + JSON.stringify(this.state.wishlistData[post+1].idUser);
		printDescription2 = "description= " + JSON.stringify(this.state.wishlistData[post+1].description);
		printIsAvailable2 = "isAvailable= " + JSON.stringify(this.state.wishlistData[post+1].isAvailable);
		printPrice2 = "price= " + JSON.stringify(this.state.wishlistData[post+1].price);
		printPhotoType12 = "photoType1= " + JSON.stringify(this.state.wishlistData[post+1].photoType1);
		*/
		// objJsonB642 = new Buffer(segundo.photoData);
		// format data post 3
		printId3 = 'id= ' + JSON.stringify(terceiro.id);
		/*
		printIdUser3 = "idUser= " + JSON.stringify(this.state.wishlistData[post+2].idUser);
		printDescription3 = "description= " + JSON.stringify(this.state.wishlistData[post+2].description);
		printIsAvailable3 = "isAvailable= " + JSON.stringify(this.state.wishlistData[post+2].isAvailable);
		printPrice3 = "price= " + JSON.stringify(this.state.wishlistData[post+2].price);
		printPhotoType13 = "photoType1= " + JSON.stringify(this.state.wishlistData[post+2].photoType1);
		*/
		// objJsonB643 = new Buffer(terceiro.photoData);

		// build javascript
		return (
			<View
				key={'superTile' + postsPrinted}
				style={{
					height: tileHeight,
					flexDirection: 'row',
					alignItems: 'stretch',
				}}>
				<View
					key={'tile' + postsPrinted}
					style={{ flex: 2, margin: 10 }}>

					{/*
					<Text>{printId1}</Text>
					<Text key={"idUser" + tyleNr+2}>{printIdUser3}</Text>
					<Text key={"description" + tyleNr+2}>{printDescription3}</Text>
					<Text key={"isAvailable" + tyleNr+2}>{printIsAvailable3}</Text>
					<Text key={"price" + tyleNr+2}>{printPrice3}</Text>
					<Text key={"photoType1" + tyleNr+2}>{printPhotoType13}</Text>
					*/}
					<TouchableOpacity
							style={{ flex: 1 }}
							activeOpacity={0.8}
							onPress={() => {
								this.props.navigation.navigate('UserPostProfile', {postID: primeiro.id});
							}}>
						<Image
							source={{ uri: primeiro.photoData }}
							style={{
								flex: 1,
								borderRadius: 20
							}}
							resizeMode="cover"
						/>
					</TouchableOpacity>
				</View>
				<View
					style={{
						flex: 1,
						margin: 10,
						flexDirection: 'column'
					}}>
					<View
						key={'tile' + postsPrinted + 1}
						style={{ flex: 1, margin: 10 }}>

						{/*
						<Text
							onPress={() =>
								this.props.navigation.navigate('Profile', { name: 'João' })
							}>
							{printIdUser1}
						</Text>
						*/}

						{/*
						<Text>{printId2}</Text>
						<Text key={"idUser" + tyleNr}>{printIdUser1}</Text>
						<Text key={"description" + tyleNr}>{printDescription1}</Text>
						<Text key={"isAvailable" + tyleNr}>{printIsAvailable1}</Text>
						<Text key={"price" + tyleNr}>{printPrice1}</Text>
						<Text key={"photoType1" + tyleNr}>{printPhotoType11}</Text>
						*/}
						<TouchableOpacity
							style={{ flex: 1 }}
							activeOpacity={0.8}
							onPress={() => {
								this.props.navigation.navigate('UserPostProfile', {postID: segundo.id});
							}}>
							<Image
								source={{ uri: segundo.photoData }}
								style={{
									flex: 1,
									borderRadius: 20
								}}
								resizeMode="cover"
							/>
						</TouchableOpacity>
					</View>
					<View
						key={'tile' + postsPrinted + 2}
						style={{ flex: 1, margin: 10 }}>

						{/*
						<Text>{printId3}</Text>
						<Text key={"idUser" + tyleNr+1}>{printIdUser2}</Text>
						<Text key={"description" + tyleNr+1}>{printDescription2}</Text>
						<Text key={"isAvailable" + tyleNr+1}>{printIsAvailable2}</Text>
						<Text key={"price" + tyleNr+1}>{printPrice2}</Text>
						<Text key={"photoType1" + tyleNr+1}>{printPhotoType12}</Text>
						*/}
						<TouchableOpacity
							style={{ flex: 1 }}
							activeOpacity={0.8}
							onPress={() => {
								this.props.navigation.navigate('UserPostProfile', {postID: terceiro.id});
							}}>
							<Image
								source={{ uri: terceiro.photoData }}
								style={{
									flex: 1,
									borderRadius: 20
								}}
								resizeMode="cover"
							/>
						</TouchableOpacity>
					</View>
				</View>
			</View>
		);
	}

	// to check if user scrolled till the end of the scroll view
	isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
		const paddingToBottom = 20;
		return layoutMeasurement.height + contentOffset.y >= contentSize.height - paddingToBottom;
	};

	loadMoreData = () => {
		const { loadMore } = this.state.loadingMoreData;
		if (loadMore) {
			return;
		}
		this.setState({ loadingMoreData: true });

		/*loading - set loadMore = false when done*/
		ToastAndroid.show('A carregar...', ToastAndroid.SHORT);

		// nove pedido
		const newPosts = require('./json/responseFeed');

		// add to current state
		var newState = [...this.state.wishlistData, ...newPosts];
		this.setState({
			wishlistData: newState,
			numPosts: newState.length,
			loadingMoreData: false
		});
	};

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
export default Wanted;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#ddd'
	},
});
