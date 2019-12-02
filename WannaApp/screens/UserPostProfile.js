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
									key={index}
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
					<PostButtons idPost={this.state.postID} navigation={this.props.navigation} />
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
