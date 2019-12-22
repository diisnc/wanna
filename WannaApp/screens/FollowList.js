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
	TouchableOpacity,
	FlatList
} from 'react-native';
import Loading from './Loading';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
global.Buffer = global.Buffer || require('buffer').Buffer;
import { getFollowers, getFollowings } from '../modules/profile/profile.api';
import { Left } from 'native-base';
import { grey } from 'ansi-colors';

class FollowList extends Component {
	state = {
		loading: true,
		width: 0,
		list: [],
		type: null,
		fontLoaded: false
	};

	componentDidMount() {
		// get width for carousel purposes
		let typePassed;
		typePassed = this.props.navigation.getParam('type');
		this.setState({ width: Dimensions.get('window').width * 0.75, type: typePassed });

		this.getFeedDataFromApiAsync(typePassed);
	}

	async componentWillMount() {
		await Expo.Font.loadAsync({
			'run': require('../assets/fonts/run.ttf'),
		});
		this.setState({ fontLoaded: true });
	}

	async getFeedDataFromApiAsync(type) {
		let list;
		if (type == 'Followers') {
			list = await getFollowers();
		} else if (type == 'Followings') list = await getFollowings();
		else return;

		if (list != null) {
			this.setState({ list: list, loading: false, type: type });
		}

		return;
	}

	render() {
		return (
			// Safe Box for Iphone
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
					{this.buildInstaStyle()}
				</View>
			</SafeAreaView>
		);
	}

	// Builds header of the page
	buildHeader() {
		this.startHeaderHeight = 80;
		if (Platform.OS == 'android') {
			this.startHeaderHeight = 60;
		}
		if (this.state.fontLoaded){
		if (this.props.navigation.getParam('type') == 'Followers') {
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
							alignItems: 'center'
						}}>
						<Text style={{
							flex: 1,
							textAlign: 'left',
							fontSize: 40,
							fontFamily: 'run'
							}}>
							SEGUIDORES
						</Text>
						
					</View>
				</View>
			);
		} else {
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
							alignItems: 'center'
						}}>
						<Text style={{
							flex: 1,
							textAlign: 'left',
							fontSize: 40,
							fontFamily: 'run'
							}}>
							A SEGUIR
						</Text>
					</View>
				</View>
			);
		}}
	}

	// Insta style feed using UserPost
	buildInstaStyle() {
		if (this.state.loading == true) return <Loading />;
		else {
			return (
				<View style={styles.container}>
					{this.state.loading == true ? null : (
						<FlatList
							data={this.state.list}
							keyExtractor={(item, index) => index.toString()}
							renderItem={({ item, index }) => {
								console.log(item.followed_id);
								return (
									<View
										style={{
											flex: 1,
											flexDirection: 'row',
											alignItems: 'center',
											borderBottomColor: '#dddddd',
											borderBottomWidth: 0.5
										}}>
										{/* primeira coluna: foto do perfil */}
										<View style= {{ marginHorizontal: '2%' }}>
											<MaterialIcons 
												name="person-outline" 
												size={60}/>
										</View>
										{/* segunda coluna: nome de perfil e localização */}
										{this.state.type == 'Followings' ? (
											<Text style={{ fontSize: 20, width: '100%' }}>
												{item.followed_id}
											</Text>
										) : (
											<Text style={{ fontSize: 20, width: '100%' }}>
												{item.follower_id}
											</Text>
										)}
									</View>
								);
							}}
						/>
					)}
				</View>
			);
		}
	}
}
export default FollowList;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'flex-start',
		justifyContent: 'center'
	}
});
