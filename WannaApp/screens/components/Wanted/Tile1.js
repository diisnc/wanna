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
	Dimensions,
	TouchableOpacity
} from 'react-native';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import Loading from '../../Loading';
global.Buffer = global.Buffer || require('buffer').Buffer;
const { height, width } = Dimensions.get('window');
const tileHeight = 250;

class Tyle1 extends Component {
	state = {
		wishlistData: [],
		numPosts: 0,
		loading: true,
		width: 0
	};

	componentDidMount() {
		// get width for carousel purposes
		this.setState({ width: Dimensions.get('window').width * 0.75 });

		// get data from servers and save in state
		this.getWishlistDataFromApiAsync();
	}

	// COLOCAR PROPS AQUI E DEPOIS CHAMAR ISTO NO WANTED
	render() {
		if (this.props.item != null) {
			var primeiro = this.props.item[0];
			var segundo = this.props.item[1];
			var terceiro = this.props.item[2];
			var postsPrinted = this.props.nrPosts;

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
			// objJsonB641 = new Buffer(primeiro.photoData1);
			// format data post 2
			printId2 = 'id= ' + JSON.stringify(segundo.id);
			/*
			printIdUser2 = "idUser= " + JSON.stringify(this.state.wishlistData[post+1].idUser);
			printDescription2 = "description= " + JSON.stringify(this.state.wishlistData[post+1].description);
			printIsAvailable2 = "isAvailable= " + JSON.stringify(this.state.wishlistData[post+1].isAvailable);
			printPrice2 = "price= " + JSON.stringify(this.state.wishlistData[post+1].price);
			printPhotoType12 = "photoType1= " + JSON.stringify(this.state.wishlistData[post+1].photoType1);
			*/
			// objJsonB642 = new Buffer(segundo.photoData1);
			// format data post 3
			printId3 = 'id= ' + JSON.stringify(terceiro.id);
			/*
			printIdUser3 = "idUser= " + JSON.stringify(this.state.wishlistData[post+2].idUser);
			printDescription3 = "description= " + JSON.stringify(this.state.wishlistData[post+2].description);
			printIsAvailable3 = "isAvailable= " + JSON.stringify(this.state.wishlistData[post+2].isAvailable);
			printPrice3 = "price= " + JSON.stringify(this.state.wishlistData[post+2].price);
			printPhotoType13 = "photoType1= " + JSON.stringify(this.state.wishlistData[post+2].photoType1);
			*/
			// objJsonB643 = new Buffer(terceiro.photoData1);

			// build javascript
			return (
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
							style={{ flex: 1, backgroundColor: 'yellow', margin: 10 }}>
							<Text>{printId1}</Text>
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
								source={{ uri: primeiro.photoData }}
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
								source={{ uri: segundo.photoData }}
								style={{
									flex: 1
								}}
								resizeMode="contain"
							/>
						</View>
					</View>
					<View
						key={'tile' + postsPrinted + 2}
						style={{ flex: 2, backgroundColor: 'pink', margin: 10 }}>
						<Text>{printId3}</Text>
						{/*
						<Text key={"idUser" + tyleNr+2}>{printIdUser3}</Text>
						<Text key={"description" + tyleNr+2}>{printDescription3}</Text>
						<Text key={"isAvailable" + tyleNr+2}>{printIsAvailable3}</Text>
						<Text key={"price" + tyleNr+2}>{printPrice3}</Text>
						<Text key={"photoType1" + tyleNr+2}>{printPhotoType13}</Text>
						*/}
						<Image
							source={{ uri: terceiro.photoData }}
							style={{
								flex: 1
							}}
							resizeMode="contain"
						/>
					</View>
				</View>
			);
		} else return null;
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

		const newState = require('../../json/responseFeed');
		var triplesArray = [];

		// create triples from singles
		for (let index = 0; index < newState.length - 3; index += 3) {
			let triple = [];
			triple.push(newState[index]);
			triple.push(newState[index + 1]);
			triple.push(newState[index + 2]);
			triplesArray.push(triple);
		}

		this.setState({
			wishlistData: triplesArray,
			numPosts: triplesArray.length,
			loading: false
		});

		return;
	}
}
export default Tyle1;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#ddd'
	}
});
