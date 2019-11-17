import React, { Component } from 'react';
import {
	Text,
	View,
	Image,
	StyleSheet,
	TouchableOpacity,
	SafeAreaView,
	TouchableHighlight,
	ScrollView,
	Platform,
	Dimensions,
	FlatList,
	TouchableWithoutFeedback
} from 'react-native';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
global.Buffer = global.Buffer || require('buffer').Buffer;
import { Button } from 'react-native-elements';
import { globalStyle, defaultNavigator } from './style';
import { logout } from '../modules/auth/auth.service';
import { connect } from 'react-redux';
import { getMyProfile, getUserProfile } from '../modules/profile/profile.api';

let { width, height } = Dimensions.get('window');

class Profile extends Component {
	state = {
		avatarData: [],
		firstName: '',
		lastName: '',
		rating: 0,
		posts: [],
		numPosts: 0,
		name: 'local',
		loading: true,
		username: ''
	};

	componentDidMount() {
		this.fetchUserInfo();
		this.startHeaderHeight = 80;
		if (Platform.OS == 'android') {
			this.startHeaderHeight = 60;
		}
	}

	fetchUserInfo = async () => {
		nameP = this.props.navigation.getParam('userID', 'local');
		if (nameP !== undefined) {
			await this.setState({ name: nameP });
		}
		let newState;
		if (this.state.name == 'local') {
			newState = await getMyProfile();
		} else {
			newState = await getUserProfile(this.state.name);
		}

		if (newState != null) {
			await this.setState({
				avatarData: newState.info.avatarData,
				firstName: newState.info.firstName,
				lastName: newState.info.lastName,
				rating: newState.info.rating,
				posts: newState.posts,
				numPosts: newState.posts.length,
				loading: false,
				username: newState.info.username
			});
		}

		console.log('nrposts: ' + this.state.numPosts);

		return;
	};

	buildProfile() {
		return (
			<View>
				<View
					style={{
						justifyContent: 'space-between',
						alignItems: 'center',
						flexDirection: 'row',
						paddingVertical: 10,
						marginTop: 20
					}}>
					{this.state.avatarData ? (
						<Image
							source={{
								uri:
									'data:' +
									'image/jpeg' +
									';base64,' +
									new Buffer(this.state.avatarData).toString('base64')
							}}
							style={{ marginLeft: 10, width: 100, height: 100, borderRadius: 50 }}
						/>
					) : (
						<Image
							source={require('../assets/noImage.png')}
							style={{ marginLeft: 10, width: 100, height: 100, borderRadius: 50 }}
						/>
					)}
					<View style={{ marginRight: 230 }}>
						<Text>{this.state.firstName + ' ' + this.state.lastName}</Text>
						<Text>{this.state.rating}</Text>
					</View>
				</View>
				<View>
					<TouchableOpacity
						style={{
							marginTop: 10,
							marginBottom: 20,
							marginHorizontal: 40,
							paddingVertical: 15,
							borderRadius: 20,
							borderColor: 'grey',
							borderWidth: 1.5
						}}>
						<Text
							style={{ textAlign: 'center', color: 'grey' }}
							onPress={() =>
								this.props.navigation.navigate('EditProfile', {
									userID: this.state.username
								})
							}>
							{'Edit Profile'}{' '}
						</Text>
					</TouchableOpacity>
				</View>
				{/* <View style={{ borderColor: '#555', borderWidth: 1 }} /> */}
			</View>
		);
	}

	render() {
		if (this.state.loading == false) {
			if (this.state.numPosts !== 0) {
				return (
					<SafeAreaView style={{ flex: 1 }}>
						<View
							style={{
								flex: 1,
								flexDirection: 'column',
								justifyContent: 'flex-start',
								alignItems: 'stretch'
							}}>
							{this.buildHeader()}
							{this.buildProfile()}
							{this.buildPosts()}
						</View>
					</SafeAreaView>
				);
			} else {
				return (
					<SafeAreaView style={{ flex: 1 }}>
						<View
							style={{
								flex: 1,
								flexDirection: 'column',
								justifyContent: 'flex-start',
								alignItems: 'stretch'
							}}>
							{this.buildHeader()}
							{this.buildProfile()}
							<View>
								<Text>No images</Text>
							</View>
						</View>
					</SafeAreaView>
				);
			}
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
					<Text style={{ flex: 3, textAlign: 'center' }}>Perfil</Text>
					<MaterialCommunityIcons.Button
						name="logout"
						size={40}
						style={{ flex: 1 }}
						onPress={() => this.props.logout()}
					/>
				</View>
			</View>
		);
	}
	renderItem = (postInfo, index) => {
		console.log(postInfo.photoData);
		return (
			<TouchableWithoutFeedback
				onPress={() => {
					this.props.navigation.navigate('UserPost', {
						postID: postInfo.id
					});
				}}>
				<View style={styles.gridImgContainer}>
					<Image
						resizeMode="cover"
						style={styles.image}
						source={{
							uri:
								'data:' + 'image/jpeg' + ';base64,' + new Buffer(postInfo.photoData)
						}}
					/>
				</View>
			</TouchableWithoutFeedback>
		);
	};

	buildPosts = () => {
		return (
			<View style={styles.containerImages}>
				<FlatList
					numColumns={3}
					data={this.state.posts}
					renderItem={({ item, index }) => this.renderItem(item, index)}
					keyExtractor={item => item.id}
				/>
			</View>
		);
	};
}

function mapStateToProps(store) {
	return {};
}

function mapDispatchToProps(dispatch) {
	return {
		logout: () => {
			dispatch(logout());
		}
	};
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Profile);

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center'
	},
	containerImages: {
		alignItems: 'stretch',
		justifyContent: 'center'
	},
	gridImgContainer: {
		padding: 1,
		backgroundColor: '#CCC'
	},
	profileImage: {
		width: width * 0.2,
		height: width * 0.2,
		borderRadius: width * 0.5,
		borderWidth: 1,
		marginRight: 10
	},
	image: {
		height: width * 0.33,
		width: width * 0.33
	}
});
