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

class UserPost extends Component {
	state = {
		width: 0
	};

	componentDidMount() {
		// get width for carousel purposes
		this.setState({ width: Dimensions.get('window').width * 0.75 });
	}

	render() {
		return (
			<View style={{
				flex: 1, 
				flexDirection: 'column',
				justifyContent: 'flex-start',
				alignItems: 'stretch'
			}}>
				{/* header de post, dividido em 2 colunas*/}
				<View style={{ flex: 1, flexDirection: 'row' }}>
					{/* primeira coluna: foto do perfil */}
					<View>
						<MaterialIcons name="person" size={40}/>
					</View>
					{/* segunda coluna: nome de perfil e localização */}
					<View style={{ flex: 1, flexDirection: 'column' }}>
						<Text>Nome do perfil</Text>
						<Text>Localização</Text>
					</View>
				</View>
				{/* imagens do post */}
                <View>
						<Image
							source={{uri: this.props.imageUri}}
							style={{width: 500, height: 500}}
							resizeMode='contain'
						/>
				</View>
				{/* footer de post, dividido em 3 linhas */}
				<View style={{ flex: 1, flexDirection: 'column' }}>
					{/* primeira linha: likes à esquerda, comentários, guardar e comprar à direita */}
					<View style={{ flex: 1, flexDirection: 'row' }}>
						<MaterialCommunityIcons name="heart" size={30}/>
						<Text>1000 likes</Text>
						<MaterialCommunityIcons name="heart-broken" size={30}/>
					</View>
					{/* segunda linha, dividida em 2 colunas */}
					<View style={{ flex: 1, flexDirection: 'row' }}>
						{/* coluna da esquerda, dividida em 2 linhas */}
						<View style={{ flex: 1, flexDirection: 'column' }}>
							{/* primeira linha: nome do produto */}
							<View style={{ flex: 1}}>
								<Text>Nome Produto</Text>
							</View>
							{/* segunda linha: marca e tamanho e cor */}
							<View style={{ flex: 1}}>
								<Text>Marca, Cor, tamanho</Text>
							</View>
						</View>
						{/* coluna da direita: preço*/}
						<View style={{ flex: 1}}>
							<Text>Preço €</Text>
						</View>
					</View>
					{/* terceira linha: descrição */}
					<View style={{ flex: 1}}>
						<Text>Descrição</Text>
					</View>
				</View>
            </View>
		);
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
