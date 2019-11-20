import React, { Component } from 'react';
import {
	View,
	StyleSheet,
	Image,
	Button,
	TextInput,
	Keyboard,
	TouchableOpacity,
	Text
} from 'react-native';
global.Buffer = global.Buffer || require('buffer').Buffer;
import { globalStyle, defaultNavigator } from './style';
import SocketIOClient from 'socket.io-client/dist/socket.io';

let socket;
class Wanna extends Component {
	state = {
		chatMessage: '',
		chatMessages: []
	};

	constructor(props) {
		super(props);
	}

	componentDidMount() {
		console.log('ligação socket');
		const connectionConfig = {
			transports: ['websocket']
		};
		socket = SocketIOClient('https://cbf2d5ca.ngrok.io', connectionConfig);
		socket.on('chat-message', msg => {
			console.log(msg.message);
			var copyChatMessages = [...this.state.chatMessages];
			copyChatMessages.push(msg.message);
			this.setState({
				chatMessages: copyChatMessages
			});
		});

		this.submitSubscribe();
	}
	render() {

		return (
			<View style={styles.container}>
				<View style={{flex: 1, alignItems: "stretch", backgroundColor: "red" }}>
					{this.printMessages()}
				</View>
				<TextInput
					style={styles.textInput}
					placeholder="Your message"
					maxLength={20}
					onBlur={Keyboard.dismiss}
					onChangeText={chatMessage => {
						this.setState({ chatMessage });
					}}
				/>

				<View style={styles.inputContainer}>
					<TouchableOpacity style={styles.saveButton} onPress={this.submitChatMessage}>
						<Text style={styles.saveButtonText}>Send Message</Text>
					</TouchableOpacity>
				</View>
			</View>
		);
	}

	printMessages() {
		const items = [];
		var messages = [...this.state.chatMessages];

		messages.map((message) =>
			items.push(
				<Text>{message}</Text>
			)
		)

		return items;
	}

	submitSubscribe() {
		console.log('enviou');
		const result = socket.emit('subscribe', 'tarraxo31');
		console.log('Resultado: ' + result);
	}
	submitChatMessage() {
		const data = {
			room: 'tarraxo31',
			message: 'Olá',
			idSender: 'sergiotj',
			idReceiver: 'tarraxo',
			idPost: '31'
		};
		socket.emit('chat-message', data);
		// this.setState({ chatMessage: '' });
	}
}

export default Wanna;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#F5FCFF'
	},
	saveButton: {
		borderWidth: 1,
		borderColor: '#007BFF',
		backgroundColor: '#007BFF',
		padding: 15,
		margin: 5
	},
	saveButtonText: {
		color: '#FFFFFF',
		fontSize: 20,
		textAlign: 'center'
	}
});
