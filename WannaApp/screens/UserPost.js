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
global.Buffer = global.Buffer || require('buffer').Buffer;
import { connect } from 'react-redux';
import { like, unDisLike, unLike, disLike } from '../modules/profile/profile.reducer';
import { vote, removeVote } from '../modules/post/post.api';

class UserPost extends Component {
	state = {
		width: 0
	};

	componentDidMount() {
		// get width for carousel purposes
		this.setState({ width: Dimensions.get('window').width * 0.75 });
	}

	render() {
		if (this.props.item != null) {
			return (
				<View
					style={{
						flex: 1,
						flexDirection: 'column',
						justifyContent: 'flex-start',
						alignItems: 'stretch'
					}}>
					{/* header de post, dividido em 2 colunas*/}
					<View style={{ flex: 1, flexDirection: 'row' }}>
						{/* primeira coluna: foto do perfil */}
						<View>
							<Image
								source={{
									uri:
										'data:' +
										'image/jpeg' +
										';base64,' +
										new Buffer(this.props.item.avatarData)
								}}
								style={{ width: 40, height: 40, borderRadius: 60 }}
								resizeMode="contain"
							/>
						</View>
						{/* segunda coluna: nome de perfil e localização */}
						<View style={{ flex: 1, flexDirection: 'column' }}>
							<TouchableOpacity
								onPress={() => {
									this.props.navigation.navigate('UserProfile', {
										userID: this.props.item.idUser
									});
								}}>
								<Text>{this.props.item.idUser}</Text>
							</TouchableOpacity>
							<Text>{this.props.item.location}</Text>
						</View>
					</View>
					{/* imagens do post */}
					<View>
						<TouchableOpacity
							activeOpacity={0.8}
							onPress={() => {
								this.props.navigation.navigate('UserPostProfile', {
									postID: this.props.item.id
								});
							}}>
							<Image
								source={{
									uri:
										'data:' +
										'image/jpeg' +
										';base64,' +
										new Buffer(this.props.item.photoData)
								}}
								style={{ width: 500, height: 500 }}
								resizeMode="contain"
							/>
						</TouchableOpacity>
					</View>

					{/* footer de post, dividido em 3 linhas */}
					<View style={{ flex: 1, flexDirection: 'column' }}>
						{/* primeira linha: likes à esquerda, comentários, guardar e comprar à direita */}
						{this.buildVotes(this.props.item.id)}
						{/* segunda linha, dividida em 2 colunas */}
						<View style={{ flex: 1, flexDirection: 'row' }}>
							{/* coluna da esquerda, dividida em 2 linhas */}
							<View style={{ flex: 1, flexDirection: 'column' }}>
								{/* primeira linha: nome do produto */}
								<View style={{ flex: 1 }}>
									<Text>{this.props.item.category}</Text>
								</View>
								{/* segunda linha: marca e tamanho e cor */}
								<View style={{ flex: 1 }}>
									<Text>
										{this.props.item.brand}, {this.props.item.color},{' '}
										{this.props.item.size}
									</Text>
								</View>
							</View>
							{/* coluna da direita: preço*/}
							<View style={{ flex: 1 }}>
								<Text>{this.props.item.price}€</Text>
							</View>
						</View>
						{/* terceira linha: descrição */}
						<View style={{ flex: 1 }}>
							<Text>{this.props.item.description}</Text>
						</View>
					</View>
				</View>
			);
		} else return null;
	}

	buildVotes(idPost) {
		if (this.props.myVotes.length != 0) {
			voteType = this.props.myVotes.find(x => x.postID === idPost).voteType;
			nrLikes = this.props.myVotes.find(x => x.postID === idPost).nrLikes;
			nrDislikes = this.props.myVotes.find(x => x.postID === idPost).nrDislikes;
			showLikes = nrLikes - nrDislikes;
			console.log(voteType);
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
		}
	};
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(UserPost);

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#ddd'
	}
});
