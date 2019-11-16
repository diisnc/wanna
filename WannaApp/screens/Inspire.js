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
	Dimensions,
	FlatList,
	TouchableOpacity
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { connect } from 'react-redux';
global.Buffer = global.Buffer || require('buffer').Buffer;
import { feed } from '../modules/post/post.api';

const { height, width } = Dimensions.get('window');

class Inspire extends Component {
	state = {
		feedData: [],
		numPosts: 0
	};

	componentDidMount() {
		this.startHeaderHeight = 80;
		if (Platform.OS == 'android') {
			this.startHeaderHeight = 60;
		}

		// get data from servers and save in state
		this.getFeedDataFromApiAsync();
		// console.log('passou pelo componentdidmount');

		/*
        var localFeedData = require('./json/responseFeed');
        for(let i = 0; i < localFeedData.length; i++ ) {
            console.log("id= " + JSON.stringify(localFeedData[i].id));
            console.log("idUser= " + JSON.stringify(localFeedData[i].idUser));
            console.log("description= " + JSON.stringify(localFeedData[i].description));
            console.log("isAvailable= " + JSON.stringify(localFeedData[i].isAvailable));
            console.log("price= " + JSON.stringify(localFeedData[i].price));
            console.log("photoType1= " + JSON.stringify(localFeedData[i].photoType1));
            //console.log("photoData1= " + JSON.stringify(localFeedData[i].photoData1));
        }
        */
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

	render() {
		const loggedIn = this.props.loggedIn;
		const token = this.props.tokenValid;
		console.log('login ' + loggedIn);
		console.log('token valid ' + token);

		if (loggedIn == true && token == true) {
			//this.getFeedDataFromApiAsync();
			// loading screen
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
						{this.buildInstaFixe()}
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
					<MaterialIcons name="search" size={20} style={{ marginRight: 10 }} />
					<TextInput
						underlineColorAndroid="transparent"
						placeholder="Try Camisola"
						placeholderTextColor="grey"
						style={{ flex: 1, fontWeight: '700', backgroundColor: 'white' }}
					/>
				</View>
			</View>
		);
	}

	buildInstaFixe() {
		return (
			<View style={styles.container}>
				{this.state.loading == true ? (
					<Loading />
				) : (
					<FlatList
						data={this.state.feedData}
						keyExtractor={(item, index) => index.toString()}
						style={styles.list}
						renderItem={({ item, index }) => {
							return (
								<View key={index} style={styles.item}>
									<View style={styles.subItem}>
										{/* <Text>{item.posted}</Text> */}
										<Text>{item.posted}</Text>
										<TouchableOpacity
											onPress={() => {
												this.props.navigation.navigate('OtherProfile', {
													userID: item.idUser
												});
												// console.log(item.authorId) // working Good, we sure params has value now.
											}}>
											<Text>{item.idUser}</Text>
										</TouchableOpacity>
									</View>
									<View style={styles.imageView}>
										<Image
											source={{
												uri:
													'data:' +
													item.photoType1 +
													';base64,' +
													new Buffer(item.photoData1)
											}}
											style={styles.image}
										/>
									</View>
									<View>
										<Text>Descrição</Text>
										<TouchableOpacity
											onPress={() =>
												this.props.navigation.navigate('Comments')
											}>
											<Text> {'View Comments...'}</Text>
										</TouchableOpacity>
									</View>
								</View>
							);
						}}
					/>
				)}
			</View>
		);
	}

	// Builds feed of the page
	buildFeed() {
		return (
			<ScrollView scrollEventThrottle={16}>
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

		for (let post = 0, tileType = 1; post < this.state.feedData.length; post += 3) {
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
		const items = [];

		// format data post 1
		printId1 = 'id= ' + JSON.stringify(this.state.feedData[post].id);
		printIdUser1 = 'idUser= ' + JSON.stringify(this.state.feedData[post].idUser);
		/*
        printIdUser1 = "idUser= " + JSON.stringify(this.state.feedData[post].idUser);
        printDescription1 = "description= " + JSON.stringify(this.state.feedData[post].description);
        printIsAvailable1 = "isAvailable= " + JSON.stringify(this.state.feedData[post].isAvailable);
        printPrice1 = "price= " + JSON.stringify(this.state.feedData[post].price);
        printPhotoType11 = "photoType1= " + JSON.stringify(this.state.feedData[post].photoType1);
        */
		objJsonB641 = new Buffer(this.state.feedData[post].photoData1);
		// format data post 2
		printId2 = 'id= ' + JSON.stringify(this.state.feedData[post + 1].id);
		/*
        printIdUser2 = "idUser= " + JSON.stringify(this.state.feedData[post+1].idUser);
        printDescription2 = "description= " + JSON.stringify(this.state.feedData[post+1].description);
        printIsAvailable2 = "isAvailable= " + JSON.stringify(this.state.feedData[post+1].isAvailable);
        printPrice2 = "price= " + JSON.stringify(this.state.feedData[post+1].price);
        printPhotoType12 = "photoType1= " + JSON.stringify(this.state.feedData[post+1].photoType1);
        */
		objJsonB642 = new Buffer(this.state.feedData[post + 1].photoData1);
		// format data post 3
		printId3 = 'id= ' + JSON.stringify(this.state.feedData[post + 2].id);
		/*
        printIdUser3 = "idUser= " + JSON.stringify(this.state.feedData[post+2].idUser);
        printDescription3 = "description= " + JSON.stringify(this.state.feedData[post+2].description);
        printIsAvailable3 = "isAvailable= " + JSON.stringify(this.state.feedData[post+2].isAvailable);
        printPrice3 = "price= " + JSON.stringify(this.state.feedData[post+2].price);
        printPhotoType13 = "photoType1= " + JSON.stringify(this.state.feedData[post+2].photoType1);
        */
		objJsonB643 = new Buffer(this.state.feedData[post + 2].photoData1);

		// build javascript
		items.push(
			<View
				key={'superTile' + post}
				style={{
					height: 250,
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
						key={'tile' + post}
						style={{ flex: 1, backgroundColor: 'yellow', margin: 10 }}>
						<Text key={'id' + post}>{printId1}</Text>
						<Text
							key={'idUser' + post}
							onPress={() =>
								this.props.navigation.navigate('Profile', { name: 'João' })
							}>
							{printIdUser1}
						</Text>
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
									this.state.feedData[post].photoType1 +
									';base64,' +
									objJsonB641 +
									''
							}}
							style={{
								width: 'auto',
								height: 50,
								aspectRatio: 1,
								overflow: 'hidden'
							}}
						/>
					</View>
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
									this.state.feedData[post + 1].photoType1 +
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
				<View style={{ flex: 2, backgroundColor: 'pink', margin: 10 }}>
					<View key={'tile' + post + 2}>
						<Text key={'id' + post + 2}>{printId3}</Text>
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
									this.state.feedData[post + 2].photoType1 +
									';base64,' +
									objJsonB643 +
									''
							}}
							style={{
								width: '90%',
								height: undefined,
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

	// 3 tyle javascript generation
	genTileType2(post) {
		const items = [];

		// format data post 1
		printId1 = 'id= ' + JSON.stringify(this.state.feedData[post].id);
		/*
        printIdUser1 = "idUser= " + JSON.stringify(this.state.feedData[post].idUser);
        printDescription1 = "description= " + JSON.stringify(this.state.feedData[post].description);
        printIsAvailable1 = "isAvailable= " + JSON.stringify(this.state.feedData[post].isAvailable);
        printPrice1 = "price= " + JSON.stringify(this.state.feedData[post].price);
        printPhotoType11 = "photoType1= " + JSON.stringify(this.state.feedData[post].photoType1);
        */
		objJsonB641 = new Buffer(this.state.feedData[post].photoData1);
		// format data post 2
		printId2 = 'id= ' + JSON.stringify(this.state.feedData[post + 1].id);
		/*
        printIdUser2 = "idUser= " + JSON.stringify(this.state.feedData[post+1].idUser);
        printDescription2 = "description= " + JSON.stringify(this.state.feedData[post+1].description);
        printIsAvailable2 = "isAvailable= " + JSON.stringify(this.state.feedData[post+1].isAvailable);
        printPrice2 = "price= " + JSON.stringify(this.state.feedData[post+1].price);
        printPhotoType12 = "photoType1= " + JSON.stringify(this.state.feedData[post+1].photoType1);
        */
		objJsonB642 = new Buffer(this.state.feedData[post + 1].photoData1);
		// format data post 3
		printId3 = 'id= ' + JSON.stringify(this.state.feedData[post + 2].id);
		/*
        printIdUser3 = "idUser= " + JSON.stringify(this.state.feedData[post+2].idUser);
        printDescription3 = "description= " + JSON.stringify(this.state.feedData[post+2].description);
        printIsAvailable3 = "isAvailable= " + JSON.stringify(this.state.feedData[post+2].isAvailable);
        printPrice3 = "price= " + JSON.stringify(this.state.feedData[post+2].price);
        printPhotoType13 = "photoType1= " + JSON.stringify(this.state.feedData[post+2].photoType1);
        */
		objJsonB643 = new Buffer(this.state.feedData[post + 2].photoData1);

		// build javascript
		items.push(
			<View
				key={'superTile' + post}
				style={{
					height: 150,
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
									this.state.feedData[post].photoType1 +
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
									this.state.feedData[post + 1].photoType1 +
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
				<View style={{ flex: 1, backgroundColor: 'grey', margin: 10 }}>
					<View key={'tile' + post + 2}>
						<Text key={'id' + post + 2}>{printId3}</Text>
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
									this.state.feedData[post + 2].photoType1 +
									';base64,' +
									objJsonB643 +
									''
							}}
							style={{
								width: '90%',
								height: undefined,
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

	// 1+2 tyle javascript generation
	genTileType3(post) {
		const items = [];

		// format data post 1
		printId1 = 'id= ' + JSON.stringify(this.state.feedData[post].id);
		/*
        printIdUser1 = "idUser= " + JSON.stringify(this.state.feedData[post].idUser);
        printDescription1 = "description= " + JSON.stringify(this.state.feedData[post].description);
        printIsAvailable1 = "isAvailable= " + JSON.stringify(this.state.feedData[post].isAvailable);
        printPrice1 = "price= " + JSON.stringify(this.state.feedData[post].price);
        printPhotoType11 = "photoType1= " + JSON.stringify(this.state.feedData[post].photoType1);
        */
		objJsonB641 = new Buffer(this.state.feedData[post].photoData1);
		// format data post 2
		printId2 = 'id= ' + JSON.stringify(this.state.feedData[post + 1].id);
		/*
        printIdUser2 = "idUser= " + JSON.stringify(this.state.feedData[post+1].idUser);
        printDescription2 = "description= " + JSON.stringify(this.state.feedData[post+1].description);
        printIsAvailable2 = "isAvailable= " + JSON.stringify(this.state.feedData[post+1].isAvailable);
        printPrice2 = "price= " + JSON.stringify(this.state.feedData[post+1].price);
        printPhotoType12 = "photoType1= " + JSON.stringify(this.state.feedData[post+1].photoType1);
        */
		objJsonB642 = new Buffer(this.state.feedData[post + 1].photoData1);
		// format data post 3
		printId3 = 'id= ' + JSON.stringify(this.state.feedData[post + 2].id);
		/*
        printIdUser3 = "idUser= " + JSON.stringify(this.state.feedData[post+2].idUser);
        printDescription3 = "description= " + JSON.stringify(this.state.feedData[post+2].description);
        printIsAvailable3 = "isAvailable= " + JSON.stringify(this.state.feedData[post+2].isAvailable);
        printPrice3 = "price= " + JSON.stringify(this.state.feedData[post+2].price);
        printPhotoType13 = "photoType1= " + JSON.stringify(this.state.feedData[post+2].photoType1);
        */
		objJsonB643 = new Buffer(this.state.feedData[post + 2].photoData1);

		// build javascript
		items.push(
			<View
				key={'superTile' + post}
				style={{
					height: 250,
					flexDirection: 'row',
					alignItems: 'stretch',
					backgroundColor: 'blue'
				}}>
				<View style={{ flex: 2, backgroundColor: 'pink', margin: 10 }}>
					<View key={'tile' + post}>
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
									this.state.feedData[post].photoType1 +
									';base64,' +
									objJsonB641 +
									''
							}}
							style={{
								width: '90%',
								height: undefined,
								aspectRatio: 1,
								overflow: 'hidden'
							}}
						/>
					</View>
				</View>
				<View
					style={{
						flex: 1,
						backgroundColor: 'grey',
						margin: 10,
						flexDirection: 'column'
					}}>
					<View
						key={'tile' + post + 1}
						style={{ flex: 1, backgroundColor: 'yellow', margin: 10 }}>
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
									this.state.feedData[post + 1].photoType1 +
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
					<View
						key={'tile' + post + 2}
						style={{ flex: 1, backgroundColor: 'red', margin: 10 }}>
						<Text key={'id' + post + 2}>{printId3}</Text>
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
									this.state.feedData[post + 2].photoType1 +
									';base64,' +
									objJsonB643 +
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

	async getFeedDataFromApiAsync() {
		console.log('feed data');
		// const newState = require('./json/responseFeed');
		const newState = await feed(0);
		// console.log(newState);
		if (newState != null) {
			this.setState({ feedData: newState, numPosts: newState.length });
		}
		// this.setState({ loading: false });

		return;
	}
}

function mapStateToProps(store) {
	return { loggedIn: store.auth.loggedIn, tokenValid: store.auth.tokenIsValid };
}

function mapDispatchToProps(dispatch) {
	return {};
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
		color: '#eee'
	}
});
