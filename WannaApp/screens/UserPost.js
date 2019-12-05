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
import PostButtons from './components/PostButtons';

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
							{this.props.item.avatarData != null ? (
								<Image
									style={{ width: 40, height: 40, borderRadius: 60 }}
									resizeMode="contain"
									source={{
										uri:
											'data:' +
											'image/jpeg' +
											';base64,' +
											new Buffer(this.props.item.avatarData)
									}}
								/>
							) : (
								<Image
									style={{ width: 40, height: 40, borderRadius: 60 }}
									resizeMode="contain"
									source={require('../assets/noImage.png')}
								/>
							)}
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
						<PostButtons
							idPost={this.props.item.id}
							navigation={this.props.navigation}
						/>
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
}

export default UserPost;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#ddd'
	}
});
