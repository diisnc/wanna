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
	Animated
} from 'react-native';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
global.Buffer = global.Buffer || require('buffer').Buffer;
import { searchByFilter } from '../modules/filter/filter.api';

class Wanted extends Component {
	state = {
		wishlistData: [],
		numPosts: 0,
		loadingMoreData: false
	};

	componentDidMount() {
		this.startHeaderHeight = 80;
		if (Platform.OS == 'android') {
			this.startHeaderHeight = 60;
		}

		// get data from servers and save in state
		// this.getDataFromAPI();
	}

	async getDataFromAPI() {
		const newState = await searchByFilter();
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
					{this.buildFeed()}
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
					<Text style={{ flex: 3, textAlign: 'center' }}>WANTED</Text>
					<MaterialCommunityIcons.Button
						name="filter-variant"
						size={40}
						style={{ flex: 1 }}
						onPress={() => this.props.navigation.navigate('Filters')}
					/>
				</View>
			</View>
		);
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
								this.loadMoreData()
							}
					  	}
					}
				)}
			>
				<View style={{ flex: 1, backgroundColor: 'white', margin: 10 }}>
					{this.buildFeedTile()}
				</View>
			</ScrollView>
		);
	}

	// Build 2+1, 3, 1+2, 3 tile grid
	buildFeedTile() {
		const items = [];

		//console.log(this.state.feedData)

		for (let post = 0, tileType = 1; post < this.state.numPosts; post += 3) {
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
		objJsonB641 = new Buffer(primeiro.photoData1);
		// format data post 2
		printId2 = 'id= ' + JSON.stringify(segundo.id);
		/*
		printIdUser2 = "idUser= " + JSON.stringify(this.state.wishlistData[post+1].idUser);
		printDescription2 = "description= " + JSON.stringify(this.state.wishlistData[post+1].description);
		printIsAvailable2 = "isAvailable= " + JSON.stringify(this.state.wishlistData[post+1].isAvailable);
		printPrice2 = "price= " + JSON.stringify(this.state.wishlistData[post+1].price);
		printPhotoType12 = "photoType1= " + JSON.stringify(this.state.wishlistData[post+1].photoType1);
		*/
		objJsonB642 = new Buffer(segundo.photoData1);
		// format data post 3
		printId3 = 'id= ' + JSON.stringify(terceiro.id);
		/*
		printIdUser3 = "idUser= " + JSON.stringify(this.state.wishlistData[post+2].idUser);
		printDescription3 = "description= " + JSON.stringify(this.state.wishlistData[post+2].description);
		printIsAvailable3 = "isAvailable= " + JSON.stringify(this.state.wishlistData[post+2].isAvailable);
		printPrice3 = "price= " + JSON.stringify(this.state.wishlistData[post+2].price);
		printPhotoType13 = "photoType1= " + JSON.stringify(this.state.wishlistData[post+2].photoType1);
		*/
		objJsonB643 = new Buffer(terceiro.photoData1);

		// build javascript
		return(
			<View
				key={'superTile' + postsPrinted}
				style={{
					height: tileHeight,
					flexDirection: 'row',
					alignItems: 'stretch',
					backgroundColor: 'blue'
			}}>
				<View
					style={{
						flex: 1,
						backgroundColor: 'grey',
						margin: 10,
						flexDirection: 'column'
				}}>
					<View
						key={'tile' + postsPrinted}
						style={{ flex: 1, backgroundColor: 'yellow', margin: 10 }}
					>
						<Text >{printId1}</Text>
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
						<Image
							source={{
								uri:
									'data:' +
									'image/jpeg' +
									';base64,' +
									objJsonB641 +
									''
							}}
							style={{
								flex: 1
							}}
							resizeMode="contain"
						/>
					</View>
					<View
						key={'tile' + postsPrinted + 1}
						style={{ flex: 1, backgroundColor: 'red', margin: 10 }}>
						<Text>{printId2}</Text>
						{/*
						<Text key={"idUser" + tyleNr+1}>{printIdUser2}</Text>
						<Text key={"description" + tyleNr+1}>{printDescription2}</Text>
						<Text key={"isAvailable" + tyleNr+1}>{printIsAvailable2}</Text>
						<Text key={"price" + tyleNr+1}>{printPrice2}</Text>
						<Text key={"photoType1" + tyleNr+1}>{printPhotoType12}</Text>
						*/}
						<Image
							source={{
								uri:
									'data:' +
									'image/jpeg' +
									';base64,' +
									objJsonB642 +
									''
							}}
							style={{
								flex: 1
							}}
							resizeMode="contain"
						/>
					</View>
				</View>
				<View
					key={'tile' + postsPrinted + 2}
					style={{ flex: 2, backgroundColor: 'pink', margin: 10 }}
				>
					<Text>{printId3}</Text>
					{/*
					<Text key={"idUser" + tyleNr+2}>{printIdUser3}</Text>
					<Text key={"description" + tyleNr+2}>{printDescription3}</Text>
					<Text key={"isAvailable" + tyleNr+2}>{printIsAvailable3}</Text>
					<Text key={"price" + tyleNr+2}>{printPrice3}</Text>
					<Text key={"photoType1" + tyleNr+2}>{printPhotoType13}</Text>
					*/}
					<Image
						source={{
							uri:
								'data:' +
								'image/jpeg' +
								';base64,' +
								objJsonB643 +
								''
						}}
						style={{
							flex: 1
						}}
						resizeMode="contain"
					/>
				</View>
			</View>
		)
	}

	// 3 tyle javascript generation
	genTileType2(post) {

		var primeiro = this.state.wishlistData[post];
		var segundo = this.state.wishlistData[post + 1];
		var terceiro = this.state.wishlistData[post + 2];
		var postsPrinted = post;
		var tileHeight = 150;

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
		objJsonB641 = new Buffer(primeiro.photoData1);
		// format data post 2
		printId2 = 'id= ' + JSON.stringify(segundo.id);
		/*
		printIdUser2 = "idUser= " + JSON.stringify(this.state.wishlistData[post+1].idUser);
		printDescription2 = "description= " + JSON.stringify(this.state.wishlistData[post+1].description);
		printIsAvailable2 = "isAvailable= " + JSON.stringify(this.state.wishlistData[post+1].isAvailable);
		printPrice2 = "price= " + JSON.stringify(this.state.wishlistData[post+1].price);
		printPhotoType12 = "photoType1= " + JSON.stringify(this.state.wishlistData[post+1].photoType1);
		*/
		objJsonB642 = new Buffer(segundo.photoData1);
		// format data post 3
		printId3 = 'id= ' + JSON.stringify(terceiro.id);
		/*
		printIdUser3 = "idUser= " + JSON.stringify(this.state.wishlistData[post+2].idUser);
		printDescription3 = "description= " + JSON.stringify(this.state.wishlistData[post+2].description);
		printIsAvailable3 = "isAvailable= " + JSON.stringify(this.state.wishlistData[post+2].isAvailable);
		printPrice3 = "price= " + JSON.stringify(this.state.wishlistData[post+2].price);
		printPhotoType13 = "photoType1= " + JSON.stringify(this.state.wishlistData[post+2].photoType1);
		*/
		objJsonB643 = new Buffer(terceiro.photoData1);

		// build javascript
		return(
			<View
				key={'superTile' + postsPrinted}
				style={{
					height: tileHeight,
					flexDirection: 'row',
					alignItems: 'stretch',
					backgroundColor: 'green'
				}}>
				<View style={{
						flex: 1,
						backgroundColor: 'pink',
						margin: 10
				}}>
					<Text key={'id' + postsPrinted}>{printId1}</Text>
					{/*
					<Text key={"idUser" + post}>{printIdUser1}</Text>
					<Text key={"description" + post}>{printDescription1}</Text>
					<Text key={"isAvailable" + post}>{printIsAvailable1}</Text>
					<Text key={"price" + post}>{printPrice1}</Text>
					<Text key={"photoType1" + post}>{printPhotoType11}</Text>
					*/}
					<Image
						source={{
							uri:
								'data:' +
								'image/jpeg' +
								';base64,' +
								objJsonB641 +
								''
						}}
						style={{
							flex: 1
						}}
						resizeMode = "contain"
					/>
				</View>
				<View style={{ flex: 1, backgroundColor: 'grey', margin: 10 }}>
					<Text key={'id' + postsPrinted + 1}>{printId2}</Text>
					{/*
					<Text key={"idUser" + post+1}>{printIdUser2}</Text>
					<Text key={"description" + post+1}>{printDescription2}</Text>
					<Text key={"isAvailable" + post+1}>{printIsAvailable2}</Text>
					<Text key={"price" + post+1}>{printPrice2}</Text>
					<Text key={"photoType1" + post+1}>{printPhotoType12}</Text>
					*/}
					<Image
						source={{
							uri:
								'data:' +
								'image/jpeg' +
								';base64,' +
								objJsonB642 +
								''
						}}
						style={{
							flex: 1
						}}
						resizeMode = "contain"
					/>
				</View>
				<View style={{ flex: 1, backgroundColor: 'grey', margin: 10 }}>
					<Text key={'id' + postsPrinted + 2}>{printId3}</Text>
					{/*
					<Text key={"idUser" + post+2}>{printIdUser3}</Text>
					<Text key={"description" + post+2}>{printDescription3}</Text>
					<Text key={"isAvailable" + post+2}>{printIsAvailable3}</Text>
					<Text key={"price" + post+2}>{printPrice3}</Text>
					<Text key={"photoType1" + post+2}>{printPhotoType13}</Text>
					*/}
					<Image
						source={{
							uri:
								'data:' +
								'image/jpeg' +
								';base64,' +
								objJsonB643 +
								''
						}}
						style={{
							flex: 1
						}}
						resizeMode = "contain"
					/>
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
		objJsonB641 = new Buffer(primeiro.photoData1);
		// format data post 2
		printId2 = 'id= ' + JSON.stringify(segundo.id);
		/*
		printIdUser2 = "idUser= " + JSON.stringify(this.state.wishlistData[post+1].idUser);
		printDescription2 = "description= " + JSON.stringify(this.state.wishlistData[post+1].description);
		printIsAvailable2 = "isAvailable= " + JSON.stringify(this.state.wishlistData[post+1].isAvailable);
		printPrice2 = "price= " + JSON.stringify(this.state.wishlistData[post+1].price);
		printPhotoType12 = "photoType1= " + JSON.stringify(this.state.wishlistData[post+1].photoType1);
		*/
		objJsonB642 = new Buffer(segundo.photoData1);
		// format data post 3
		printId3 = 'id= ' + JSON.stringify(terceiro.id);
		/*
		printIdUser3 = "idUser= " + JSON.stringify(this.state.wishlistData[post+2].idUser);
		printDescription3 = "description= " + JSON.stringify(this.state.wishlistData[post+2].description);
		printIsAvailable3 = "isAvailable= " + JSON.stringify(this.state.wishlistData[post+2].isAvailable);
		printPrice3 = "price= " + JSON.stringify(this.state.wishlistData[post+2].price);
		printPhotoType13 = "photoType1= " + JSON.stringify(this.state.wishlistData[post+2].photoType1);
		*/
		objJsonB643 = new Buffer(terceiro.photoData1);

		// build javascript
		return(
			<View
				key={'superTile' + postsPrinted}
				style={{
					height: tileHeight,
					flexDirection: 'row',
					alignItems: 'stretch',
					backgroundColor: 'blue'
			}}>
				<View
					key={'tile' + postsPrinted}
					style={{ flex: 2, backgroundColor: 'pink', margin: 10 }}
				>
					<Text>{printId1}</Text>
					{/*
					<Text key={"idUser" + tyleNr+2}>{printIdUser3}</Text>
					<Text key={"description" + tyleNr+2}>{printDescription3}</Text>
					<Text key={"isAvailable" + tyleNr+2}>{printIsAvailable3}</Text>
					<Text key={"price" + tyleNr+2}>{printPrice3}</Text>
					<Text key={"photoType1" + tyleNr+2}>{printPhotoType13}</Text>
					*/}
					<Image
						source={{
							uri:
								'data:' +
								'image/jpeg' +
								';base64,' +
								objJsonB641 +
								''
						}}
						style={{
							flex: 1
						}}
						resizeMode="contain"
					/>
				</View>
				<View
					style={{
						flex: 1,
						backgroundColor: 'grey',
						margin: 10,
						flexDirection: 'column'
				}}>
					<View
						key={'tile' + postsPrinted + 1}
						style={{ flex: 1, backgroundColor: 'yellow', margin: 10 }}
					>
						<Text >{printId2}</Text>
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
						<Image
							source={{
								uri:
									'data:' +
									'image/jpeg' +
									';base64,' +
									objJsonB642 +
									''
							}}
							style={{
								flex: 1
							}}
							resizeMode="contain"
						/>
					</View>
					<View
						key={'tile' + postsPrinted + 2}
						style={{ flex: 1, backgroundColor: 'red', margin: 10 }}>
						<Text>{printId3}</Text>
						{/*
						<Text key={"idUser" + tyleNr+1}>{printIdUser2}</Text>
						<Text key={"description" + tyleNr+1}>{printDescription2}</Text>
						<Text key={"isAvailable" + tyleNr+1}>{printIsAvailable2}</Text>
						<Text key={"price" + tyleNr+1}>{printPrice2}</Text>
						<Text key={"photoType1" + tyleNr+1}>{printPhotoType12}</Text>
						*/}
						<Image
							source={{
								uri:
									'data:' +
									'image/jpeg' +
									';base64,' +
									objJsonB643 +
									''
							}}
							style={{
								flex: 1
							}}
							resizeMode="contain"
						/>
					</View>
				</View>
			</View>
		)
	}

	// to check if user scrolled till the end of the scroll view
	isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
		const paddingToBottom = 20
		return layoutMeasurement.height + contentOffset.y >=
			contentSize.height - paddingToBottom
	}

	loadMoreData = () => {
		const {loadMore} = this.state.loadingMoreData
		if (loadMore) {
			return
		}
		this.setState({loadingMoreData: true})

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
		})
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
export default Wanted;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center'
	}
});
