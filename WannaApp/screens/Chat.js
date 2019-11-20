import React, { Component } from 'react';
import { View, StyleSheet, Image, Button, TextInput } from 'react-native';
global.Buffer = global.Buffer || require('buffer').Buffer;
import { globalStyle, defaultNavigator } from './style';
import io from "socket.io-client";

class Wanna extends Component {
	constructor(props) {
		super(props);
		this.state = {
			chatMessage: "",
			chatMessages: []
		};
	}

	componentDidMount() {
		console.log('ligação socket');
		this.socket = io("http://192.168.43.239:8000/socket.io/socket.io.js");
		this.socket.on("chat-message", msg => {
			console.log(msg);
			this.setState({
				chatMessages: [...this.state.chatMessages, msg]
			});
		});

		this.submitSubscribe();
		this.submitChatMessage();
	}
	render() {
		const chatMessages = this.state.chatMessages.map(chatMessage => (
			<Text style={{ borderWidth: 2, top: 500 }}>{chatMessage}</Text>
		));

		return (
			<View style={styles.container}>
				{chatMessages}
				<TextInput
					autoCorrect={false}
					value={this.state.chatMessage}
					onSubmitEditing={() => this.submitChatMessage()}
					onChangeText={chatMessage => {
						this.setState({ chatMessage });
					}}
				/>
			</View>
		);
	}
	submitSubscribe(){
		this.socket.emit('subscribe', 'tarraxo31');
	}
	submitChatMessage() {
		const data = {
				room: 'tarraxo31',
				message: 'Olá',
				idSender: 'tarraxo',
				idReceiver: 'tarraxo',
				idPost: '31'
		};
		this.socket.emit('chat-message', data);
		this.setState({ chatMessage: '' });
	}
}

export default Wanna;

const styles = StyleSheet.create({
	container: {
	  flex: 1,
	  backgroundColor: '#F5FCFF',
	},
  });