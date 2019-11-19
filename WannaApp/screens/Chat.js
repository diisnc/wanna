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
		this.socket = io("http://192.168.1.14:8000");
		this.socket.on("chat message", msg => {
			this.setState({
				chatMessages: [...this.state.chatMessages, msg]
			});
		});
	}
	render() {
		const chatMessages = this.state.chatMessages.map(chatMessage => (
			<Text style={{ borderWidth: 2, top: 500 }}>{chatMessage}</Text>
		));

		return (
			<View style={styles.container}>
				{chatMessages}
				<TextInput
					style={{ height: 40, borderWidth: 2, top: 600 }}
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
	submitChatMessage() {
		this.socket.emit('chat message', this.state.chatMessage);
		this.setState({ chatMessage: '' });
	}
}

export default Wanna;

const styles = StyleSheet.create({
	container: {
	  height: 400,
	  flex: 1,
	  backgroundColor: '#F5FCFF',
	},
  });