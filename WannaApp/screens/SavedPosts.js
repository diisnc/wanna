import React, { Component } from 'react';
import {
	View,
	Text,
	StyleSheet,
	SafeAreaView,
	TextInput,
	Platform,
	ScrollView,
	Button,
	TouchableOpacity,
	TouchableHighlight,
	FlatList,
	Image
} from 'react-native';
import { createFilter } from '../modules/filter/filter.api';
import { savedPostsList } from '../modules/profile/profile.api';
import { connect } from 'react-redux';
import ModalDropdown from 'react-native-modal-dropdown';
import { MaterialIcons } from '@expo/vector-icons';
import { enteringOnChat } from '../modules/chat/chat.reducer';

global.Buffer = global.Buffer || require('buffer').Buffer;

class SavedPosts extends Component {
	constructor(props) {
		super(props);
	}

	state = {
		savedPosts: [],
		loading: true
	};

	componentDidMount() {
		this.getContactsAsync();
	}

	render() {
		if (this.state.loading == false) {
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
						{/* this.buildWishlist() */}
						{this.buildFilterForm()}
					</View>
				</SafeAreaView>
			);
		} else return null;
	}

	// Builds header of the page
	buildHeader() {
		this.startHeaderHeight = 80;
		if (Platform.OS == 'android') {
			this.startHeaderHeight = 60;
		}
		return (
			// Safe Box for Android
			<View
				style={{
					height: this.startHeaderHeight,
					backgroundColor: '#00afff',
					borderBottomWidth: 1,
					borderBottomColor: '#dddd'
				}}>
				<View
					style={{
						height: '90%',
						flexDirection: 'row',
						padding: 10,
						justifyContent: 'center',
						alignItems: 'center',
						backgroundColor: '#00afff'
					}}>
					<Text
						style={{
							flex: 3,
							textAlign: 'center',
							color: 'white',
							fontSize: 18,
							fontWeight: 'bold'
						}}>
						Posts Guardados
					</Text>
				</View>
			</View>
		);
	}

	async getContactsAsync() {
		// const newState = require('./json/responseFeed');
		const newState = await savedPostsList();
		if (newState != null) {
			this.setState({ savedPosts: newState, loading: false });
		}

		return;
	}

	// Builds list of filters
	buildFilterForm() {
		return (
			<ScrollView scrollEventThrottle={16}>
				<View style={{ flex: 1, backgroundColor: 'white', margin: 10 }}>
					<FlatList
						data={this.state.savedPosts}
						renderItem={({ item }) => (
							<TouchableHighlight
								onPress={() => {
									this.props.navigation.navigate('UserPostProfile', {
										postID: item.id
									});
								}}>
								<View style={styles.containerStyle}>
									<Text>{item.idUser}</Text>
									<Text>Título do post</Text>
									<Text>{item.price}</Text>
									<Text>{item.isAvailable}</Text>
									<View
										style={[
											{
												display: 'flex',
												alignItems: 'flex-end'
											}
										]}>
										<Image
											source={{
												uri:
													'data:' +
													'image/jpeg' +
													';base64,' +
													new Buffer(item.photoData)
											}}
											style={{
												marginLeft: 20,
												width: 95,
												height: 95,
												borderRadius: 700
											}}
										/>
									</View>
								</View>
							</TouchableHighlight>
						)}
						keyExtractor={(item, index) => index.toString()}
					/>
				</View>
			</ScrollView>
		);
	}
}
function mapStateToProps(store) {
	return { loggedUsername: store.auth.loggedUsername };
}
function mapDispatchToProps(dispatch) {
	return {
		enterChat: (contact, avatarContact, idPost) => {
			dispatch(enteringOnChat(contact, avatarContact, idPost));
		}
	};
}
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(SavedPosts);

const styles = StyleSheet.create({
	containerStyle: {
		borderWidth: 1,
		borderRadius: 2,
		borderColor: '#ddd',
		borderBottomWidth: 0,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.8,
		shadowRadius: 2,
		elevation: 1,
		marginLeft: 5,
		marginRight: 5,
		marginTop: 10
	}
});
