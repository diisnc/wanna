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
	TouchableHighlight
} from 'react-native';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
global.Buffer = global.Buffer || require('buffer').Buffer;

class Post extends Component {
	state = {
		postData: []
    };

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
					{this.buildWishlist()}
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
	buildWishlist() {
		return (
			<ScrollView
				scrollEventThrottle={16}
				maximumZoomScale={2}
				minimumZoomScale={1}
			>
				<View style={{ flex: 1, backgroundColor: 'white', margin: 10 }}>
					{this.buildFeedTile()}
				</View>
			</ScrollView>
		);
	}

	// Build 2 tile grid
	buildFeedTile() {
		const items = [];

		//console.log(this.state.wishlistData)

		for (let post = 0; post < this.state.wishlistData.length; post += 2) {
			items.push(this.genRow(post));
		}

		return items;
	}

	// 3 tyle javascript generation
	genRow(post) {
		const items = [];

		// format data post 1
		printId1 = 'id= ' + JSON.stringify(this.state.wishlistData[post].id);
		/*
        printIdUser1 = "idUser= " + JSON.stringify(this.state.wishlistData[post].idUser);
        printDescription1 = "description= " + JSON.stringify(this.state.wishlistData[post].description);
        printIsAvailable1 = "isAvailable= " + JSON.stringify(this.state.wishlistData[post].isAvailable);
        printPrice1 = "price= " + JSON.stringify(this.state.wishlistData[post].price);
        printPhotoType11 = "photoType1= " + JSON.stringify(this.state.wishlistData[post].photoType1);
        */
		objJsonB641 = new Buffer(this.state.wishlistData[post].photoData1).toString('base64');
		// format data post 2
		printId2 = 'id= ' + JSON.stringify(this.state.wishlistData[post + 1].id);
		/*
        printIdUser2 = "idUser= " + JSON.stringify(this.state.wishlistData[post+1].idUser);
        printDescription2 = "description= " + JSON.stringify(this.state.wishlistData[post+1].description);
        printIsAvailable2 = "isAvailable= " + JSON.stringify(this.state.wishlistData[post+1].isAvailable);
        printPrice2 = "price= " + JSON.stringify(this.state.wishlistData[post+1].price);
        printPhotoType12 = "photoType1= " + JSON.stringify(this.state.wishlistData[post+1].photoType1);
        */
		objJsonB642 = new Buffer(this.state.wishlistData[post + 1].photoData1).toString('base64');

		// build javascript
		items.push(
			<View
				key={'superTile' + post}
				style={{
					height: 200,
					flexDirection: 'row',
					alignItems: 'stretch',
					backgroundColor: 'green'
				}}>
				<View style={{ flex: 1, backgroundColor: 'pink', margin: 10 }}>
					<View
						key={'tile' + post}
						style={{ flex: 1, backgroundColor: 'yellow', margin: 10 }}>
						<Text key={'id' + post}>{printId1}</Text>
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
									this.state.wishlistData[post].photoType1 +
									';base64,' +
									objJsonB641 +
									''
							}}
							style={{
								width: 'auto',
								height: '80%',
								aspectRatio: 1,
								overflow: 'hidden'
							}}
						/>
					</View>
				</View>
				<View style={{ flex: 1, backgroundColor: 'grey', margin: 10 }}>
					<View
						key={'tile' + post + 1}
						style={{ flex: 1, backgroundColor: 'red', margin: 10 }}>
						<Text key={'id' + post + 1}>{printId2}</Text>
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
									this.state.wishlistData[post + 1].photoType1 +
									';base64,' +
									objJsonB642 +
									''
							}}
							style={{
								width: 'auto',
								height: '80%',
								aspectRatio: 1,
								overflow: 'hidden'
							}}
						/>
					</View>
				</View>
			</View>
		);

		return items;
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
		this.setState({ postData: newState});

		return;
	}
}
export default Post;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center'
	}
});
