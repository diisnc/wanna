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
import { like, unDisLike, unLike, disLike } from '../modules/profile/profile.reducer';
import { vote, removeVote } from '../modules/post/post.api';

class UserPostProfile extends Component {
	state = {
		width: 0,
		height: 0,
		post: null,
		postID: null,
		loading: false
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
					<Text style={{ flex: 3, textAlign: 'center' }}>POST</Text>
				</View>
			</View>
		);
	}

	buildPost() {
		return (
			<View
				style={{
					flex: 1,
					flexDirection: 'column',
					justifyContent: 'flex-start',
					alignItems: 'stretch'
				}}>
				{/* header de post, dividido em 2 colunas*/}
				<View style={{ flex: 1, flexDirection: 'row', backgroundColor: 'yellow' }}>
					{/* primeira coluna: foto do perfil */}
					<View>
						{this.state.post.userInfo.avatarData ? (
							<Image
								source={{
									uri:
										'data:' +
										'image/jpeg' +
										';base64,' +
										new Buffer(this.state.post.userInfo.avatarData)
								}}
								style={{ width: 40, height: 40, borderRadius: 60 }}
								resizeMode="contain"
							/>
						) : (
							<Image
								source={require('../assets/noImage.png')}
								style={{ width: 40, height: 40, borderRadius: 60 }}
								resizeMode="contain"
							/>
						)}
					</View>
					{/* segunda coluna: nome de perfil e localização */}
					<View style={{ flex: 1, flexDirection: 'column', backgroundColor: 'red' }}>
						<TouchableOpacity
							onPress={() => {
								this.props.navigation.navigate('UserProfile', {
									userID: this.state.post.postInfo.idUser
								});
							}}>
							<Text>{this.state.post.postInfo.idUser}</Text>
						</TouchableOpacity>
						<Text>Braga</Text>
					</View>
				</View>
				{/* imagens do post */}
				<View
					style={{
						flex: 1,
						width: this.state.width,
						backgroundColor: 'green',
						margin: 10,
						justifyContent: 'space-around',
						alignItems: 'center'
					}}>
					<FlatList
						horizontal
						data={this.state.post.photos}
						renderItem={({ index }) => {
							return (
								<View
									key={id}
									style={{
										width: this.state.width,
										height: '100%',
										justifyContent: 'space-around',
										alignItems: 'center'
									}}>
									<Image
										source={{
											uri:
												'data:' +
												'image/jpeg' +
												';base64,' +
												new Buffer(this.state.post.photos[index].photoData)
										}}
										style={{
											height: '100%',
											aspectRatio: 1,
											overflow: 'hidden'
										}}
										resizeMode="contain"
									/>
								</View>
							);
						}}
						keyExtractor={(item, index) => this.state.postID + index.toString()}
						pagingEnabled
						snapToInterval={this.state.width}
						snapToAlignment="center"
					/>
				</View>

				{/* footer de post, dividido em 3 linhas */}
				<View style={{ flex: 1, flexDirection: 'column' }}>
					{/* primeira linha: likes à esquerda, comentários, guardar e comprar à direita */}
					{this.buildVotes(this.state.postID)}
					{/* segunda linha, dividida em 2 colunas */}
					<View style={{ flex: 1, flexDirection: 'row' }}>
						{/* coluna da esquerda, dividida em 2 linhas */}
						<View style={{ flex: 1, flexDirection: 'column' }}>
							{/* primeira linha: nome do produto */}
							<View style={{ flex: 1 }}>
								<Text>{this.state.post.postInfo.category}</Text>
							</View>
							{/* segunda linha: marca e tamanho e cor */}
							<View style={{ flex: 1 }}>
								<Text>
									Marca, {this.state.post.postInfo.color},{' '}
									{this.state.post.postInfo.size}
								</Text>
							</View>
						</View>
						{/* coluna da direita: preço*/}
						<View style={{ flex: 1 }}>
							<Text>{this.state.post.postInfo.price}€</Text>
						</View>
					</View>
					{/* terceira linha: descrição */}
					<View style={{ flex: 1 }}>
						<Text>{this.state.post.postInfo.description}</Text>
					</View>
				</View>
			</View>
		);
	}

	buildVotes(idPost) {
		if (this.props.myVotes.length != 0) {
			voteTypePost = this.props.myVotes.find(x => x.postID === idPost);
			if (voteTypePost == undefined) voteType = 0;
			else voteType = voteTypePost.voteType;

			nrLikesPost = this.props.myVotes.find(x => x.postID === idPost);
			if (nrLikesPost == undefined) nrLikes = 0;
			else nrLikes = nrLikesPost.nrLikes;

			nrDislikesPost = this.props.myVotes.find(x => x.postID === idPost);
			if (nrDislikesPost == undefined) nrDislikesPost = 0;
			else nrDislikes = nrDislikesPost.nrDislikes;

			showLikes = nrLikes - nrDislikes;

			if (voteType == 0) {
				return (
					<View style={{ flex: 1, flexDirection: 'row' }}>
						<TouchableOpacity
							activeOpacity={0.5}
							onPress={() => {
								this.likeHandler(idPost);
							}}>
							<MaterialCommunityIcons name="heart-outline" size={30} />
						</TouchableOpacity>
						<Text>{showLikes} likes</Text>
						<TouchableOpacity
							activeOpacity={0.5}
							onPress={() => {
								this.disLikeHandler(idPost);
							}}>
							<MaterialCommunityIcons name="heart-broken-outline" size={30} />
						</TouchableOpacity>
					</View>
				);
			} else if (voteType == 1) {
				return (
					<View style={{ flex: 1, flexDirection: 'row' }}>
						<TouchableOpacity
							activeOpacity={0.5}
							onPress={() => {
								this.unLikeHandler(idPost);
							}}>
							<MaterialCommunityIcons name="heart" color="red" size={30} />
						</TouchableOpacity>
						<Text>{showLikes} likes</Text>
						<TouchableOpacity
							activeOpacity={0.5}
							onPress={() => {
								this.disLikeHandler(idPost);
							}}>
							<MaterialCommunityIcons name="heart-broken-outline" size={30} />
						</TouchableOpacity>
					</View>
				);
			} else if (voteType == -1) {
				return (
					<View style={{ flex: 1, flexDirection: 'row' }}>
						<TouchableOpacity
							activeOpacity={0.5}
							onPress={() => {
								this.likeHandler(idPost);
							}}>
							<MaterialCommunityIcons name="heart-outline" size={30} />
						</TouchableOpacity>
						<Text>{showLikes} likes</Text>
						<TouchableOpacity
							activeOpacity={0.5}
							onPress={() => {
								this.unDisLikeHandler(idPost);
							}}>
							<MaterialCommunityIcons name="heart-broken" color="red" size={30} />
						</TouchableOpacity>
					</View>
				);
			} else return null;
		}
	}

	async likeHandler(idPost) {
		// verificar se está dislike
		const result = await vote(idPost, 1);
		if (result == 'OK') {
			this.props.dispatchLike(idPost);
		}
	}

	async unLikeHandler(idPost) {
		const result = await removeVote(idPost, 1);
		if (result == 'OK') {
			this.props.dispatchUnLike(idPost);
		}
	}

	async disLikeHandler(idPost) {
		// verificar se está like
		const result = await vote(idPost, -1);
		if (result == 'OK') {
			this.props.dispatchDisLike(idPost);
		}
	}

	async unDisLikeHandler(idPost) {
		const result = await removeVote(idPost, -1);
		if (result == 'OK') {
			this.props.dispatchUnDisLike(idPost);
		}
	}
}

function mapStateToProps(store) {
	console.log(store.profile);
	return {
		myVotes: store.profile.votes
	};
}

function mapDispatchToProps(dispatch) {
	return {
		dispatchLike: idPost => {
			dispatch(like(idPost));
		},
		dispatchDisLike: idPost => {
			dispatch(disLike(idPost));
		},
		dispatchUnDisLike: idPost => {
			dispatch(unDisLike(idPost));
		},
		dispatchUnLike: idPost => {
			dispatch(unLike(idPost));
		},
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
