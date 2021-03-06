import React, { Component } from 'react';
import {
	View,
	StyleSheet,
	Image,
	Keyboard,
	Text,
	FlatList,
	Platform,
	TextInput,
	TouchableHighlight,
	SafeAreaView,
	BackHandler
} from 'react-native';
global.Buffer = global.Buffer || require('buffer').Buffer;
import { globalStyle, defaultNavigator } from './style';
import SocketIOClient from 'socket.io-client/dist/socket.io';
import { connect } from 'react-redux';
import { newMessages } from '../modules/chat/chat.reducer';
import { getMessages } from '../modules/chat/chat.api';
import { getAvatar } from '../modules/chat/chat.api';
import { setLightEstimationEnabled } from 'expo/build/AR';

let backHandlerCus;
const isAndroid = Platform.OS == 'android';
const viewPadding = 10;
let socket;
class Chat extends Component {
	state = {
		messages: [],
		username: null,
		noImage: true,
		avatarContact: [],
		text: '',
		room: this.props.contact + this.props.idPost,
		loading: true,
		fontLoaded: false
	};

	async componentWillMount() {
		await Expo.Font.loadAsync({
			'run': require('../assets/fonts/run.ttf'),
		});
		this.setState({ fontLoaded: true });
	}

	constructor(props) {
		super(props);
		const connectionConfig = {
			transports: ['websocket']
		};
		socket = SocketIOClient('http://infernoo.duckdns.org:7999', connectionConfig);
	}

	handleBackPress = () => {
		socket.emit('leave-room', this.state.room);
		backHandlerCus.remove();
		this.props.navigation.goBack(null);
		return true;
	};

	timestampToDateFromDB(messages) {
		newArray = messages;
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

	timestampToDate(timestamp){
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
		var date = new Date(timestamp);
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
		return formattedTime	 
	}

	componentDidMount() {
		backHandlerCus = BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
		let sub = {
			idUser: this.props.contact,
			idPost: this.props.idPost
		};
		//console.log(sub);
		// exemplo tarraxo31
		socket.emit('subscribe', sub);

		this.getMessagesAsync(this.props.contact, this.props.idPost);

		this.getAvatarAsync(this.props.contact);

		socket.on('chat-message', msg => {
			this.onReceivedMessage(msg);
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
						{this.renderConversation()}
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
		if (this.state.fontLoaded){
		return (
			// Safe Box for Android
			<View
				style={{
					height: this.startHeaderHeight,
					borderBottomWidth: 1,
				}}>
				<View
					style={{
						height: '90%',
						flexDirection: 'row',
						padding: 10,
						justifyContent: 'center',
						alignItems: 'center',
					}}>
					<Text style={{
						flex: 1,
						textAlign: 'left',
						fontSize: 40,
						fontFamily: 'run'
						}}>
						{this.props.contact}
					</Text>
				</View>
			</View>
		);}
	}

	renderConversation() {
		return (
			<View style={[styles.container, { paddingBottom: this.state.viewPadding }]}>
				<FlatList
					style={styles.list}
					data={this.state.messages}
					ref={ref => (this.flatList = ref)}
					onContentSizeChange={() => this.flatList.scrollToEnd({ animated: true })}
					onLayout={() => this.flatList.scrollToEnd({ animated: true })}
					renderItem={({ item, index }) => (
						<View
							style={[
								{
									display: 'flex',
									alignItems:
										item.writer === this.props.username
											? 'flex-end'
											: 'flex-start'
								}
							]}>
							<View
								style={[
									styles.listItemContainer,
									{
										flexDirection:
											item.writer === this.props.username
												? 'row-reverse'
												: 'row'
									}
								]}>
								{item.writer !== this.props.username &&
								this.state.noImage == false ? (
									<Image
										style={styles.imageStyles}
										source={{ uri: this.state.avatarContact.avatarData }}
									/>
								) : (
									<Image
										style={styles.imageStyles}
										source={require('../assets/noImage.png')}
									/>
								)}
								<Text style={styles.listItem}>{item.text}</Text>
							</View>
							<Text style={styles.date}>{item.createdAt}</Text>
							<View style={styles.marginBottom} />
						</View>
					)}
					keyExtractor={(item, index) => index.toString()}
				/>
				<View style={{ flexDirection: 'row' }}>
					<TextInput
						style={styles.textInput}
						onChangeText={this.changeTextHandler}
						onSubmitEditing={this.sendMessage}
						value={this.state.text}
						placeholder="Enviar mensagem..."
						returnKeyType="done"
						returnKeyLabel="done"
						underlineColorAndroid="transparent"
					/>
					<TouchableHighlight
						style={styles.inputButton}
						underlayColor="#fff"
						onPress={this.sendMessage}>
						<Text>Enviar</Text>
					</TouchableHighlight>
				</View>
			</View>
		);
	}

	async getMessagesAsync(idContact, idPost) {
		const previousMessages = await getMessages(idContact, idPost);
		let newArray = null;
		if (previousMessages != null) {
			newArray = this.timestampToDateFromDB(previousMessages);
		}
		if (newArray != null) {
			this.setState({ messages: newArray });
		}
		return;
	}

	async getAvatarAsync(idContact) {
		const avatar = await getAvatar(idContact);
		if (avatar != null) {
			this.setState({ loading: false });
			if (avatar.avatarData != null) {
				this.setState({ noImage: false, avatarContact: avatar });
			}
		}
		return;
	}

	/**
	 * Save the input values change to state
	 */
	changeTextHandler = text => {
		this.setState({ text: text });
	};

	onReceivedMessage = message => {
		timestamp = new Date();
		let messageModel = {
			writer: this.props.contact,
			text: message.message,
			createdAt: this.timestampToDate(timestamp)


		};

		this.setState({ messages: [...this.state.messages, messageModel] });
	};

	sendMessage = () => {
		let notEmpty = this.state.text.trim().length > 0;
		timestamp = new Date();
		console.log(timestamp);
		if (notEmpty) {
			let messageToSend = {
				room: this.state.room,
				message: this.state.text,
				idSender: this.props.username,
				idReceiver: this.props.contact,
				idPost: this.props.idPost
			};

			let messageToSave = {
				writer: this.props.username,
				text: this.state.text,
				createdAt: this.timestampToDate(timestamp)


			};

			socket.emit('chat-message', messageToSend);

			this.setState({ messages: [...this.state.messages, messageToSave], text: '' });
		}
	};
}

function mapStateToProps(store, ownProps) {
	//console.log(store.chat);
	return {
		username: store.auth.loggedUsername,
		contact: store.chat.contact,
		idPost: store.chat.idPost
	};
}
function mapDispatchToProps(dispatch) {
	return {
		newMessages: msg => {
			dispatch(newMessages(msg));
		}
	};
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Chat);

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'flex-start',
		backgroundColor: '#F5FCFF',
		padding: 10,
		paddingTop: 20
	},
	buttonStyle: {
		color: 'red',
		backgroundColor: 'green'
	},
	list: {
		width: '100%'
	},
	listItem: {
		width: 'auto',
		maxWidth: '80%',
		paddingTop: 2,
		paddingBottom: 2,
		fontSize: 14
	},
	date: {
		width: 'auto',
		maxWidth: '80%',
		paddingTop: 2,
		paddingBottom: 2,
		fontSize: 11,
		color: '#a8a8a8'
	},
	marginBottom: {
		height: 5,
		backgroundColor: 'transparent'
	},
	listItemContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingTop: 10,
		paddingBottom: 10,
		paddingLeft: 10,
		paddingRight: 10,
		borderRadius: 10,
		backgroundColor: '#fff',
		elevation: 1
	},
	imageStyles: {
		width: 35,
		height: 35,
		borderRadius: 35,
		marginLeft: 10,
		marginRight: 10
	},
	textInput: {
		height: 50,
		paddingRight: 10,
		paddingLeft: 10,
		paddingTop: 15,
		paddingBottom: 15,
		borderColor: 'transparent',
		width: '85%',
		backgroundColor: '#fff',
		borderRadius: 10,
		elevation: 1
	},
	inputButton: {
		display: 'flex',
		height: 50,
		justifyContent: 'center',
		borderRadius: 10,
		alignSelf: 'center',
		paddingLeft: 5,
		paddingRight: 5,
		marginLeft: 10,
		backgroundColor: '#fff',
		elevation: 1
	}
});
