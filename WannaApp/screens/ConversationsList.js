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
	Image,
	BackHandler
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

	timestampToDate(conversationList) {
		newArray = conversationList;
		[].map.call(newArray, function(obj) {
			var months = [
				'Janeiro',
				'Fevereiro',
				'Março',
				'Abril',
				'Maio',
				'Junho',
				'Julho',
				'Agosto',
				'Setembro',
				'Outubro',
				'Novembro',
				'Dezembro'
			];
			var date = new Date(obj.createdAt);
			var day = date.getDate();
			var month = date.getMonth();
			var year = date.getFullYear();
			var hours = date.getHours();
			var minutos = '0' + date.getMinutes();

			var formattedTime =
				day +
				' de ' +
				months[month] +
				' de ' +
				year +
				' às ' +
				hours +
				':' +
				minutos.substr(-2);
			obj.createdAt = formattedTime;
		});
		return newArray;
	}

	componentDidMount() {
		
		this.props.navigation.addListener('willFocus', () => {
			this.getContacts();
		});

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
					}}>
					<Text
						style={{
							flex: 3,
							textAlign: 'center',
							fontSize: 18,
							fontWeight: 'bold'
						}}>
						As Minhas Mensagens
					</Text>
				</View>
			</View>
		);
	}

	async getContacts() {
		// const newState = require('./json/responseFeed');
		const newState = await getContacts();
		const newArray = this.timestampToDate(newState);
		if (newArray != null) {
			this.setState({ conversationList: newArray, loading: false });
		}

		return;
	}

	// Builds list of filters
	buildFilterForm() {
		return (
			<ScrollView scrollEventThrottle={16}>
				<View style={{ flex: 1, backgroundColor: 'white', margin: 10, flexDirection: 'row' }}>
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
								<View style={styles.containerStyle}>
									<View>
										<Image
											source={{ uri: item.photoData }}
											style={{
												alignSelf: 'center',
												marginHorizontal: 10,
												width: 95,
												height: 95,
												borderRadius: 700
											}}
										/>
									</View>
									<View>
										{item.idReceiver === this.props.loggedUsername ? (
											<Text>{item.idSender}</Text>
										) : (
											<Text>{item.idReceiver}</Text>
										)}
										<Text>Título do post</Text>
										{item.idSender === this.props.loggedUsername ? (
											<Text>{'Tu: ' + item.messageText}</Text>
										) : (
											<Text>{item.idSender + ': ' + item.messageText}</Text>
										)}

										<Text style={styles.date}>{item.createdAt}</Text>										
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
)(ConversationsList);

const styles = StyleSheet.create({
	containerStyle: {
		borderWidth: 1,
		borderColor: '#ddd',
		borderBottomWidth: 0,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.8,
		shadowRadius: 2,
		elevation: 1,
		marginLeft: 5,
		marginRight: 5,
		marginBottom: 10,
		paddingVertical: 10,
		flexDirection: 'row',
	},
	date: {
		width: 'auto',
		maxWidth: '80%',
		paddingTop: 2,
		paddingBottom: 2,
		fontSize: 14,
		color: '#a8a8a8'
	}
});
