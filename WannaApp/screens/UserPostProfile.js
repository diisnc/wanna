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
	FlatList,
	TouchableOpacity
} from 'react-native';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
global.Buffer = global.Buffer || require('buffer').Buffer;
import { getPost } from '../modules/post/post.api';
import { connect } from 'react-redux';
import { like, unDisLike, unLike, disLike, save, unsave } from '../modules/profile/profile.reducer';
import { vote, removeVote, savePost, unsavePost } from '../modules/post/post.api';
import PostButtons from './components/PostButtons';
import { Card, CardItem, Body, Left, Right } from 'native-base';
import { theme } from '../galio';
import { EvilIcons } from '@expo/vector-icons';

const screenWidth = Dimensions.get('window').width;

class UserPostProfile extends Component {
	state = {
		width: 0,
		height: 0,
		post: null,
		postID: null,
		loading: false,
		fontLoaded: false
	};

	componentDidMount() {
		this.startHeaderHeight = 80;
		if (Platform.OS == 'android') {
			this.startHeaderHeight = 60;
		}

		postPassed = this.props.navigation.getParam('postID', 'local');
		this.fetchPostInfo(postPassed);
		// get width for carousel purposes
		this.setState({
			width: Dimensions.get('window').width,
			height: Dimensions.get('window').height
		});
	}

	async componentWillMount() {
		await Expo.Font.loadAsync({
			'run': require('../assets/fonts/run.ttf'),
		});
		this.setState({ fontLoaded: true });
	}

	fetchPostInfo = async idPost => {
		postFetched = await getPost(idPost);

		if (postFetched != null) {
			await this.setState({ post: postFetched, loading: true, postID: idPost });
			this.props.dispatchPosts(postFetched);
		}

		return;
	};

	render() {
		if (this.state.loading == true) {
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
						{this.buildPost()}
					</View>
				</SafeAreaView>
			);
		} else return null;
	}

	// Builds header of the page
	buildHeader() {
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
						fontSize: 20
					}}>
					<Text style={{
						flex: 1,
						textAlign: 'left',
						fontSize: 40,
						fontFamily: 'run'
						}}>
						POST
					</Text>
				</View>
			</View>
		);}
	}

	buildPost() {
		return (
			<ScrollView>
				<Card>
					<CardItem>
						<Left>
							{this.state.post.userInfo.avatarData != null ? (
								<Image
										style={{ width: 60, height: 60, borderRadius: 50 }}
										source={{ uri: this.state.post.userInfo.avatarData }}
								/>
							) : (
								<Image
										style={{ width: 60, height: 60, borderRadius: 50 }}
										source={require('../assets/noImage.png')}
									/>
							)}
							<Body>
								<Text style={{ fontSize: 16, alignContent: 'center' }}>
									{this.state.post.postInfo.idUser}
								</Text>
								<Text style={{ fontSize: 12, color: 'grey' }}>
									{ this.state.post.userInfo.location }
								</Text>
							</Body>
						</Left>
					</CardItem>

					<CardItem cardBody>
						<FlatList
								horizontal
								data={this.state.post.photos}
								renderItem={({ index }) => {
									return (
										<View
											key={index}
											style={{
												width: screenWidth - theme.SIZES.BASE * 0.5 ,
												height: 300,
												justifyContent: 'space-around',
												alignItems: 'center'
											}}>
											<Image
												source={{ uri: this.state.post.photos[index].photoData }}
												style={{
													aspectRatio: 1,
													width: '90%',
													backgroundColor: 'red'
												}}
												resizeMode="cover"
											/>
										</View>
									);
								}}
								keyExtractor={(item, index) => this.state.postID + index.toString()}
								pagingEnabled
								snapToInterval={this.state.width}
								snapToAlignment="center">
						</FlatList>
					</CardItem>

					<PostButtons
						idPost={this.state.post.postInfo.id}
						idUser={this.state.post.postInfo.idUser}
						navigation={this.props.navigation}
					/>

					<CardItem>
						<Left>
							<View style={{flex: 1, flexDirection: 'column'}}>
								<Text style={{fontWeight: 'bold', fontSize: 16}}>
									{this.state.post.postInfo.category}
								</Text>
								{this.state.post.postInfo.brand == null ? (
									<Text style={{color: 'gray'}}>
										{this.state.post.postInfo.color} • {this.state.post.postInfo.size}
									</Text>
								) : (
									<Text style={{color: 'gray'}}>
										{this.state.post.postInfo.brand} • {this.state.post.postInfo.color} • {this.state.post.postInfo.size}
									</Text>
								)}

								<Text style={{color: 'gray'}}>
									{this.state.post.postInfo.description}
								</Text>
							</View>
						</Left>

						<Right>
							<Text style={{color:'#3498DB', fontWeight: 'bold', fontSize: 17}}>{this.state.post.postInfo.price}€</Text>
							<TouchableOpacity
								activeOpacity={0.5}
								onPress={() => {
									this.props.navigation.navigate('Purchase', {
										idPost: this.state.post.postInfo.id
									});
								}}>
								<EvilIcons name="plus" size={33} style={{ paddingRight: '3.5%' }} />
							</TouchableOpacity>
						</Right>
					</CardItem>
				</Card>
			</ScrollView>


		);
	}
}

function mapStateToProps(store) {
	return {};
}

function mapDispatchToProps(dispatch) {
	return {
		dispatchPosts: data => {
			dispatch({ type: 'LOADED_POST', posts: data });
		}
	};
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(UserPostProfile);

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#ddd'
	}
});
