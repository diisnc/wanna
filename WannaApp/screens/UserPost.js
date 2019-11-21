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
			console.log(voteType);
			if (voteType == 0) {
				return (
					<View style={{ flex: 1, flexDirection: 'row' }}>
						<MaterialCommunityIcons name="heart-outline" size={30} />
						<Text>1000 likes</Text>
						<MaterialCommunityIcons name="heart-broken-outline" size={30} />
					</View>
				);
			} else if (voteType == 1) {
				return (
					<View style={{ flex: 1, flexDirection: 'row' }}>
						<MaterialCommunityIcons name="heart" color="red" size={30} />
						<Text>1000 likes</Text>
						<MaterialCommunityIcons name="heart-broken-outline" size={30} />
					</View>
				);
			} else if (voteType == -1) {
				return (
					<View style={{ flex: 1, flexDirection: 'row' }}>
						<MaterialCommunityIcons name="heart-outline" size={30} />
						<Text>1000 likes</Text>
						<MaterialCommunityIcons name="heart-broken" color="red" size={30} />
					</View>
				);
			} else return null;
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
