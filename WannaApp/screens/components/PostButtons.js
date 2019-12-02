import { connect } from 'react-redux';
import React, { Component } from 'react';
import {
	like,
	unDisLike,
	unLike,
	disLike,
	save,
	unsave
} from '../../modules/profile/profile.reducer';
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
import { vote, removeVote, savePost, unsavePost } from '../../modules/post/post.api';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';

class PostButtons extends Component {
	render() {
		return (
			<View style={{ flex: 1, flexDirection: 'column' }}>
				{this.buildVotes(this.props.idPost)}
				{this.buildSavedPost(this.props.idPost)}
				{this.buildComments(this.props.idPost)}
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

	buildSavedPost(idPost) {
		if (this.props.myVotes.length != 0) {
			voteTypePost = this.props.myVotes.find(x => x.postID === idPost);
			if (voteTypePost == undefined) saved = 0;
			else saved = voteTypePost.saved;

			if (saved == 0) {
				return (
					<View style={{ flex: 1, flexDirection: 'row' }}>
						<TouchableOpacity
							activeOpacity={0.5}
							onPress={() => {
								this.saveHandler(idPost);
							}}>
							<MaterialCommunityIcons name="bookmark-outline" size={30} />
						</TouchableOpacity>
					</View>
				);
			} else {
				return (
					<View style={{ flex: 1, flexDirection: 'row' }}>
						<TouchableOpacity
							activeOpacity={0.5}
							onPress={() => {
								this.unsaveHandler(idPost);
							}}>
							<MaterialCommunityIcons name="bookmark" color="red" size={30} />
						</TouchableOpacity>
					</View>
				);
			}
		}
	}

	buildComments(idPost) {
		return (
			<View style={{ flex: 1, flexDirection: 'row' }}>
				<TouchableOpacity
					activeOpacity={0.5}
					onPress={() => {
						this.props.navigation.navigate('Comments', {
							idPost: idPost
						});
					}}>
					<MaterialCommunityIcons name="comment-text-outline" size={30} />
				</TouchableOpacity>
			</View>
		);
	}

	async saveHandler(idPost) {
		// verificar se está dislike
		const result = await savePost(idPost);
		if (result == 'OK') {
			this.props.dispatchSavePost(idPost);
		}
	}

	async unsaveHandler(idPost) {
		// verificar se está dislike
		const result = await unsavePost(idPost);
		if (result == 'OK') {
			this.props.dispatchUnSavePosts(idPost);
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
		},
		dispatchSavePost: idPost => {
			dispatch(save(idPost));
		},
		dispatchUnSavePosts: idPost => {
			dispatch(unsave(idPost));
		}
	};
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(PostButtons);
