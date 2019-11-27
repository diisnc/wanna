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
import { getContacts } from '../modules/chat/chat.api';
import { connect } from 'react-redux';
import ModalDropdown from 'react-native-modal-dropdown';
import { MaterialIcons } from '@expo/vector-icons';
import { enteringOnChat } from '../modules/chat/chat.reducer';

global.Buffer = global.Buffer || require('buffer').Buffer;

class ConversationsList extends Component {
	constructor(props) {
		super(props);
	}

	state = {
		conversationList: [],
		loading: true
	};

	componentDidMount() {
		this.getContactsAsync();
	}

	render() {
		if (this.state.loading == false) {
			return (
				/*
				Fazer View Englobadora da página
				onde o primeiro elemento é o header
				de pesquisa e o segundo elemento
				é o feed que contém as imagens.
				*/
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
					<Text style={{ flex: 3, textAlign: 'center' }}>Conversas</Text>
				</View>
			</View>
		);
	}

	async getContactsAsync() {
		// const newState = require('./json/responseFeed');
		const newState = await getContacts();
		if (newState != null) {
			this.setState({ conversationList: newState, loading: false });
		}

		return;
	}

	// Builds list of filters
	buildFilterForm() {
		return (
			<ScrollView scrollEventThrottle={16}>
				<View style={{ flex: 1, backgroundColor: 'white', margin: 10 }}>
					<FlatList
						data={this.state.conversationList}
						renderItem={({ item }) => (
							<TouchableHighlight
								onPress={() => {
									item.idReceiver == this.props.loggedUsername
										? this.props.enterChat(
												item.idSender,
												item.avatarContact,
												item.idPost
										  )
										: this.props.enterChat(
												item.idReceiver,
												item.avatarContact,
												item.idPost
										  );
								}}>
								<View style={{ backgroundColor: 'red', marginBottom: 5 }}>
									<Text>{item.idPost}</Text>
									<Text>{item.messageText}</Text>
									{item.idReceiver == this.props.loggedUsername ? (
										<Text>{item.idSender}</Text>
									) : (
										<Text>{item.idReceiver}</Text>
									)}
									<Image
										source={{
											uri:
												'data:' +
												'image/jpeg' +
												';base64,' +
												new Buffer(item.photoData)
										}}
										style={{
											marginLeft: 10,
											width: 75,
											height: 75,
											borderRadius: 50
										}}
									/>
								</View>
							</TouchableHighlight>
						)}
						keyExtractor={item => item.id.toString()}
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
)(ConversationsList);

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center'
	}
});
