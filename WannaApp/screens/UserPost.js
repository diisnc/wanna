import React, { Component } from 'react';
import {
	View,
	Text,
	StyleSheet,
	Image,
	Dimensions,
	TouchableOpacity
} from 'react-native';
global.Buffer = global.Buffer || require('buffer').Buffer;
import { Card, CardItem, Body, Left, Right } from 'native-base';
import { theme } from '../galio';
import PostButtons from './components/PostButtons';
import { ScrollView } from 'react-native-gesture-handler';

const screenWidth = Dimensions.get('window').width;

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
				<Card>
					<CardItem>
						<Left>
							{this.props.item.avatarData != null ? (
								<TouchableOpacity
									onPress={() => {
										this.props.navigation.navigate('UserProfile', {
											userID: this.props.item.idUser
										});
									}}>
									<Image
										style={{ width: 40, height: 40, borderRadius: 40 / 2 }}
										source={{ uri: this.props.item.avatarData }}
									/>
								</TouchableOpacity>
							) : (
								<TouchableOpacity
									onPress={() => {
										this.props.navigation.navigate('UserProfile', {
											userID: this.props.item.idUser
										});
									}}>
									<Image
										style={{ width: 40, height: 40, borderRadius: 40 / 2 }}
										source={require('../assets/noImage.png')}
									/>
								</TouchableOpacity>
							)}

							<Body>
								<TouchableOpacity
									onPress={() => {
										this.props.navigation.navigate('UserProfile', {
											userID: this.props.item.idUser
										});
									}}>
									<Text style={{ fontWeight: 'bold' }}>
										{this.props.item.idUser}
									</Text>
								</TouchableOpacity>

								<Text style={{ fontSize: 12, color: 'gray' }}>{this.props.item.location}</Text>
							</Body>
						</Left>
					</CardItem>








					<CardItem cardBody>
						<TouchableOpacity
							activeOpacity={0.8}
							onPress={() => {
								this.props.navigation.navigate('UserPostProfile', {
									postID: this.props.item.id
								});
							}}>
							<Image
								source={{ uri: this.props.item.photoData }}
								style={{ height: 300, width: screenWidth - theme.SIZES.BASE * 0.5 }}
							/>
						</TouchableOpacity>
					</CardItem>







					<PostButtons
								idPost={this.props.item.id}
								idUser={this.props.item.idUser}
								navigation={this.props.navigation}
					/>






					<CardItem>	
						<Left>
							<View style={{flex: 1, flexDirection: 'column'}}>
								<Text style={{fontWeight: 'bold', fontSize: 16}}>
									{this.props.item.category}
								</Text>

								
								{this.props.item.brand == null ? (
									<Text style={{color: 'gray'}}>
										{this.props.item.color} • {this.props.item.size}
									</Text>
								) : (									
									<Text style={{color: 'gray'}}>
										{this.props.item.brand} • {this.props.item.color} • {this.props.item.size}
									</Text>
								)}
								
								
								{/* DESCRIÇÃO

									Esta descrição não aparece no feed, mas depois aproveitem para o userPostProfile 
									Nota: Talvez noutro CardItem, caso contrário o preço que aparece do lado direito
										  vai deslizando para baixo se a descrição for grande :)

								<Text style={{color: 'gray'}}>
									{this.props.item.description}
								</Text>
								*/}
							</View>	
						</Left>
								
						<Right>
							{this.props.item.brand == null ? null : (
								<Text style={{color:'#3498DB', fontWeight: 'bold', fontSize: 17}}>{this.props.item.price}€</Text>
							)}
						</Right>
					</CardItem>

				</Card>
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
		backgroundColor: 'white'
	}
});
