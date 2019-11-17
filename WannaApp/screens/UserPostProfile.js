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
	Dimensions
} from 'react-native';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
global.Buffer = global.Buffer || require('buffer').Buffer;
import { getPost } from '../modules/post/post.api';

class UserPost extends Component {
	state = {
		width: 0,
		post: null,
		loading: false
	};

	componentDidMount() {
		postPassed = this.props.navigation.getParam('postID', 'local');
		this.fetchPostInfo(postPassed);
		// get width for carousel purposes
		this.setState({ width: Dimensions.get('window').width * 0.75 });
	}

	fetchPostInfo = async idPost => {
		postFetched = await getPost(idPost);

		await this.setState({ post: postFetched, loading: true });

		return;
	};

	render() {
		if (this.state.loading == true) {
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
							<MaterialIcons name="person" size={40} />
						</View>
						{/* segunda coluna: nome de perfil e localização */}
						<View style={{ flex: 1, flexDirection: 'column' }}>
							<Text>{this.state.post.userInfo.username}</Text>
							<Text>Localização</Text>
						</View>
					</View>
					{/* imagens do post */}
					<View>
						<Image
							source={{
								uri:
									'data:' +
									'image/jpeg' +
									';base64,' +
									new Buffer(this.state.post.photos[0].photoData)
							}}
							style={{ width: 500, height: 500 }}
							resizeMode="contain"
						/>
					</View>
					{/* footer de post, dividido em 3 linhas */}
					<View style={{ flex: 1, flexDirection: 'column' }}>
						{/* primeira linha: likes à esquerda, comentários, guardar e comprar à direita */}
						<View style={{ flex: 1, flexDirection: 'row' }}>
							<MaterialCommunityIcons name="heart" size={30} />
							<Text>1000 likes</Text>
							<MaterialCommunityIcons name="heart-broken" size={30} />
						</View>
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
								<Text>{this.state.post.postInfo.price} €</Text>
							</View>
						</View>
						{/* terceira linha: descrição */}
						<View style={{ flex: 1 }}>
							<Text>{this.state.post.postInfo.description}</Text>
						</View>
					</View>
				</View>
			);
		} else return null;
	}
}
export default UserPost;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center'
	}
});
