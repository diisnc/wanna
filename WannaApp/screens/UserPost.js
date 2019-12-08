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
import { Card, CardItem, Thumbnail, Body, Left, Right, Button, Icon } from 'native-base';
import { theme } from '../galio';
import PostButtons from './components/PostButtons';

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
							navigation={this.props.navigation}
					/>



					<CardItem>	
							<Left>
								<Text>{this.props.item.category}</Text>
							</Left>

							<Right>
								<Text>{this.props.item.price}€</Text>
							</Right>
					</CardItem>



					<CardItem>
						<Text>
								{this.props.item.brand}, {this.props.item.color},{' '}
								{this.props.item.size}
						</Text>
							
					</CardItem>


					<CardItem>
						<Text>{this.props.item.description}</Text>
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
