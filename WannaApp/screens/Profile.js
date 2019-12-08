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
import { Feather, MaterialIcons, MaterialCommunityIcons, AntDesign } from '@expo/vector-icons';
global.Buffer = global.Buffer || require('buffer').Buffer;
import { globalStyle, defaultNavigator } from './style';
import { logout } from '../modules/auth/auth.service';
import { followAC, unfollowAC, loadProfilePostsAC, editProfile } from '../modules/profile/profile.reducer';
import { connect } from 'react-redux';
import { getMyProfile, getUserProfile } from '../modules/profile/profile.api';
import { follow, unfollow } from '../modules/profile/profile.api';
import Loading from './Loading';
import { red } from 'ansi-colors';
import Stars from './components/Profile/Stars';
import colors from './styles/colors/index';
import { Button, theme } from '../galio';
import { LinearGradient } from 'expo-linear-gradient';

let { width, height } = Dimensions.get('window');

class Profile extends Component {
	constructor(props) {
		super(props);
	}
	state = {
		profile: null,
		numPosts: 0,
		loading: true,
		username: '',
		following: null,
		userNrFollowers: null,
		userNrFollowings: null
	};

	componentDidMount() {
		this.fetchUserInfo();
		this.startHeaderHeight = 80;
		if (Platform.OS == 'android') {
			this.startHeaderHeight = 60;
		}
	}

	componentDidUpdate(prevProps) {
		if (this.props.myNumPosts !== prevProps.myNumPosts && this.state.loading == false) {
			this.fetchUserInfo();
		}

		if (this.props.pendingEdit !== prevProps.pendingEdit && this.props.pendingEdit == false) {
			this.fetchUserInfo();
		}

		const hasAChanged = this.props.loggedIn !== prevProps.loggedIn;
		const hasBChanged = this.props.tokenValid !== prevProps.tokenValid;
		if (
			(hasAChanged || hasBChanged) &&
			this.props.tokenValid == true &&
			this.props.loggedIn == true
		) {
			// console.log('vai pintar');
			this.fetchUserInfo();
		}
	}

	fetchUserInfo = async () => {
		let usernamePassed;
		usernamePassed = this.props.navigation.getParam('userID', 'local');
		// console.log(usernamePassed);

		let profile, length;
		if (usernamePassed == 'local') {
			profile = await getMyProfile();
		} else {
			profile = await getUserProfile(usernamePassed);
		}

		if (profile != null) {
			if (usernamePassed == 'local') {
				if (profile.posts == undefined) length = 0;
				else length = profile.posts.length;
				this.props.loadProfilePosts(length, profile.nrFollowings.number);
			}
			await this.setState({
				profile: profile,
				numPosts: profile.posts.length,
				loading: false,
				username: profile.info.username,
				following: profile.following,
				userNrFollowers: parseInt(profile.nrFollowers.number),
				userNrFollowings: parseInt(profile.nrFollowings.number)
			});
		}

		return;
	};

	render() {
		if (this.state.loading == false) {
			if (this.state.numPosts !== 0) {
				return (
					<SafeAreaView style={{ flex: 1 }}>
						<ScrollView>
							{this.buildHeader()}
							{this.buildProfile()}
							{this.buildPosts()}
						</ScrollView>
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
		} else return <Loading />;
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
						flex: 1,
						padding: 10,
						flexDirection: 'row',
						alignItems: 'center',
						justifyContent: 'flex-end',
					}}>
					<Text style={{  flex: 2, textAlign: 'center', fontSize: 20 }}>Perfil</Text>
					{this.state.username == this.props.loggedUsername ? (
						<View style={{ flexDirection: 'row'}}>
							<Feather.Button
								name="send"
								color={'black'}
								size={26}
								style={{ backgroundColor: 'white'}}
								onPress={() => this.props.navigation.navigate('ConversationsList')}
							/>
							<AntDesign.Button
								name="logout"
								color={'black'}
								style={{ backgroundColor: 'white'}}
								size={26}
								onPress={() => this.props.logout()}
							/>
						</View>
					) : null}
				</View>
			</View>
		);
	}

	// header do perfil do utilizador
	buildProfile() {
		return (
			<View>
				<View
					style={{
						justifyContent: 'center',
						alignItems: 'center',
						flexDirection: 'row',
						paddingVertical: 5,
						backgroundColor: '#fafafa',
					}}>
					{this.state.profile.info.avatarData ? (
						<Image
							source={{ uri: this.state.profile.info.avatarData }}
							style={{ marginRight: '10%', width: 90, height: 90, borderRadius: 50 }}
						/>
					) : (
						<Image
							source={require('../assets/noImage.png')}
							style={{ marginRight: '10%', width: 90, height: 90, borderRadius: 50 }}
						/>
					)}
					<View style={{ alignItems: 'center' }}>
						<Text style={{ fontSize: 20, marginBottom: 5 }}>
							{this.state.profile.info.firstName +
								' ' +
								this.state.profile.info.lastName}
						</Text>

						{this.state.profile.info.rating > 0 ? (
							<Stars
								rating={parseInt(this.state.profile.info.rating, 10)}
								size={20}
								color= '#8f2ff6' 
							/>
						) : null}
					</View>
				</View>
				{this.buildNumbers()}
				{this.buildButtons()}
			</View>
		);
	}

	// Números de seguidores, seguidos e posts do utilziador
	buildNumbers() {
		if (this.state.username != this.props.loggedUsername) {
			return (
				<View style={{ flexDirection: 'row', alignSelf: 'center', height: 50, backgroundColor: '#fafafa', width: '100%', justifyContent: 'center'}}>
					<View style={{ marginHorizontal: '1%', width: '25%', backgroundColor: 'transparent', }}>
						<Text
							style={{
								textAlign: 'center',
								color: 'grey',
								fontWeight: 'bold',
								fontSize: 16,
							}}>
							{this.state.numPosts}
							{'\n'}posts
						</Text>
					</View>
					<View style={{ width: '25%', marginHorizontal: '1%', backgroundColor: 'transparent', }}>
						<Text
							style={{
								textAlign: 'center',
								color: 'grey',
								fontWeight: 'bold',
								fontSize: 16
							}}>
							{this.state.userNrFollowers}
							{'\n'}seguidores
						</Text>
					</View>
					<View style={{ width: '25%', marginHorizontal: '1%', backgroundColor: 'transparent', }}>
						<Text
							style={{
								textAlign: 'center',
								color: 'grey',
								fontWeight: 'bold',
								fontSize: 16
							}}>
							{this.state.userNrFollowings}
							{'\n'}a seguir
						</Text>
					</View>
				</View>
			);
		} else
			return (
				<View style={{ flexDirection: 'row', alignSelf: 'center', height: 50, backgroundColor: '#fafafa', width: '100%', justifyContent: 'center' }}>
					<View
						style={{
							marginHorizontal: '1%',
							backgroundColor: 'transparent',
							width: '25%'
						}}>
						<Text
							style={{
								textAlign: 'center',
								color: 'grey',
								fontWeight: 'bold',
								fontSize: 16
							}}>
							{this.props.myNumPosts}
							{'\n'}posts
						</Text>
					</View>
					<View style={{ width: '25%', marginHorizontal: '1%', backgroundColor: 'transparent', }}>
						<TouchableOpacity>
							<Text
								style={{
									textAlign: 'center',
									color: 'grey',
									fontWeight: 'bold',
									fontSize: 16
								}}
								onPress={() =>
									this.props.navigation.navigate('FollowList', {
										type: 'Followers'
									})
								}>
								{this.state.profile.nrFollowers.number}
								{'\n'}seguidores
							</Text>
						</TouchableOpacity>
					</View>
					<View style={{ width: '25%', marginHorizontal: '1%', backgroundColor: 'transparent', }}>
						<TouchableOpacity>
							<Text
								style={{
									textAlign: 'center',
									color: 'grey',
									fontWeight: 'bold',
									fontSize: 16
								}}
								onPress={() =>
									this.props.navigation.navigate('FollowList', {
										type: 'Followings'
									})
								}>
								{this.props.myFollowingsNumber}
								{'\n'}a seguir
							</Text>
						</TouchableOpacity>
					</View>
				</View>
			);
	}

	//botões "edit profile" e "saved posts" -- "follow"
	buildButtons() {
		return (
			<View>
				{this.state.username == this.props.loggedUsername ? (
					<View
						style={{
							flexDirection: 'row',
							alignSelf: 'center',
							alignItems: "center",
							borderBottomColor: 'grey',
							backgroundColor: '#fafafa',
							width: '100%',
							justifyContent: 'center'
						}}>

						<LinearGradient
							colors={['#2b7ffc', '#8f2ff6']}
							style={[styles.button, styles.shadow]}>
							<TouchableOpacity>
								<Text
									style={{ textAlign: 'center', color: 'white' }}
									onPress={() => this.goToEdit()}>
									Editar Perfil
								</Text>
							</TouchableOpacity>
						</LinearGradient>

						<LinearGradient
							colors={['#2b7ffc', '#8f2ff6']}
							style={[styles.button, styles.shadow]}>
							<TouchableOpacity>
								<Text
									style={{ textAlign: 'center', color: 'white' }}
									onPress={() => this.props.navigation.navigate('SavedPosts')}>
									Guardados
								</Text>
							</TouchableOpacity>
						</LinearGradient>

					</View>
				) : this.state.following == false ? (
					<View
						style={{
							flexDirection: 'row',
							alignSelf: 'center',
							borderBottomColor: 'grey',
							backgroundColor: '#fafafa',
							width: '100%',
							justifyContent: 'center' 
						}}>
						<TouchableOpacity
							style={{
								width: '35%',
								marginBottom: 10,
								marginHorizontal: 5,
								paddingVertical: 15,
								borderRadius: 20,
								borderColor: 'grey',
								borderWidth: 1
							}}>
							<Text
								style={{ textAlign: 'center', color: 'grey' }}
								onPress={() => this.followAction()}>
								{'FOLLOW'}{' '}
							</Text>
						</TouchableOpacity>
					</View>
				) : (
					<View
						style={{
							flexDirection: 'row',
							alignSelf: 'center',
							borderBottomColor: 'grey'
						}}>
						<TouchableOpacity
							style={{
								width: '35%',
								marginBottom: 10,
								marginHorizontal: 5,
								paddingVertical: 15,
								borderRadius: 20,
								borderColor: 'grey',
								borderWidth: 1
							}}>
							<Text
								style={{ textAlign: 'center', color: 'grey' }}
								onPress={() => this.unfollowAction()}>
								{'UNFOLLOW'}{' '}
							</Text>
						</TouchableOpacity>
					</View>
				)}
			</View>
		);
	}

	goToEdit() {
		this.props.navigation.navigate('EditProfile', {
			location: this.state.profile.info.location
		});
		this.props.enteredEdit();
	}

	// Posts do utilizador
	buildPosts = () => {
		return (
			<View style={styles.containerImages}>
				<View
					style={{
						borderBottomColor: '#dddddd',
						borderBottomWidth: 1,
						marginBottom: 10,
					}}></View>
				<FlatList
					numColumns={3}
					data={this.state.profile.posts}
					scrollEnabled={false}
					style={{
						flex: 1,
						alignSelf: 'center',
						marginHorizontal: '2%',
						borderRadius: width * 0.1
					}}
					renderItem={({ item, index }) => this.renderItem(item, index)}
					keyExtractor={item => item.postid.toString()}
				/>
			</View>
		);
	};

	renderItem = (postInfo, index) => {
		return (
			<TouchableWithoutFeedback
				onPress={() => {
					this.props.navigation.navigate('UserPostProfile', {
						postID: postInfo.postid
					});
				}}>
				<View style={styles.gridImgContainer}>
					<Image
						resizeMode="cover"
						style={styles.image}
						source={{ uri: postInfo.photoData }}
					/>
				</View>
			</TouchableWithoutFeedback>
		);
	};

	followAction = async () => {
		result = await follow(this.state.username);
		if (result == 'OK') {
			this.props.followDispatch();
			this.setState({ following: true, userNrFollowers: this.state.userNrFollowers + 1 });
		}
	};

	unfollowAction = async () => {
		result = await unfollow(this.state.username);
		if (result == 'OK') {
			this.props.unfollowDispatch();
			this.setState({ following: false, userNrFollowers: this.state.userNrFollowers - 1 });
		}
	};
}

function mapStateToProps(store) {
	return {
		loggedUsername: store.auth.loggedUsername,
		myNumPosts: store.profile.numPosts,
		myFollowingsNumber: store.profile.nrFollowings,
		loggedIn: store.auth.loggedIn,
		tokenValid: store.auth.tokenIsValid,
		pendingEdit: store.profile.pendingEditProfile
	};
}

function mapDispatchToProps(dispatch) {
	return {
		logout: () => {
			dispatch(logout());
		},
		followDispatch: () => {
			dispatch(followAC());
		},
		unfollowDispatch: () => {
			dispatch(unfollowAC());
		},
		loadProfilePosts: (nrPosts, nrFollowings) => {
			dispatch(loadProfilePostsAC(nrPosts, nrFollowings));
		},
		enteredEdit: () => {
			dispatch(editProfile());
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
		borderRadius: width * 0.2,
		justifyContent: 'center'
	},
	containerImages: {
		flex: 1,
		alignItems: 'stretch',
		justifyContent: 'center',
	},
	gridImgContainer: {
		alignContent: 'center'
	},
	profileImage: {
		width: width * 0.2,
		height: width * 0.2,
		borderRadius: width * 0.5,
		borderWidth: 1,
		marginRight: 10
	},
	shadow: {
		shadowColor: 'black',
		shadowOffset: { width: 20, height: 20 },
		shadowRadius: 40,
		shadowOpacity: 0.8,
		elevation: 1
	},
	button: {
		marginBottom: 10,
		width: '35%',
		paddingVertical: 12,
		borderRadius: 20,
		marginHorizontal: 5,
		marginBottom: 10,
	},
	image: {
		borderRadius: width * 0.05,
		height: width * 0.3,
		width: width * 0.3,
		margin: '0.25%'
	}
});

