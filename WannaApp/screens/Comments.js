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
import { connect } from 'react-redux';
import { getComments, comment } from '../modules/post/post.api';

const isAndroid = Platform.OS == 'android';
const viewPadding = 10;
class Comments extends Component {
	state = {
		comments: [],
		text: ''
	};

	constructor(props) {
		super(props);
	}

	componentDidMount() {
		postPassed = this.props.navigation.getParam('idPost', 'local');
		if (postPassed != 'local') {
			this.getCommentsAsync(postPassed);
		}
	}

	async getCommentsAsync(idPost) {
		const comments = await getComments(idPost);
		if (comments != null) {
			this.setState({ comments: comments });
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
					{this.renderComments()}
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
					<Text style={{ flex: 3, textAlign: 'center' }}>Comentários</Text>
				</View>
			</View>
		);
	}

	renderComments() {
		return (
			<View style={[styles.container, { paddingBottom: this.state.viewPadding }]}>
				<FlatList
					style={styles.list}
					data={this.state.comments}
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
								<Image
									style={styles.imageStyles}
									source={{
										uri:
											'data:' +
											'image/jpeg' +
											';base64,' +
											new Buffer(item.avatarData)
									}}
									//source={require('../assets/noImage.png')}
								/>
								<Text style={styles.listItem}>{item.commentText}</Text>
							</View>
							<View style={styles.marginBottom} />
						</View>
					)}
					keyExtractor={(item, index) => index.toString()}
				/>
				<View style={{ flexDirection: 'row' }}>
					<TextInput
						style={styles.textInput}
						onChangeText={this.changeTextHandler}
						onSubmitEditing={this.sendComment}
						value={this.state.text}
						placeholder="Type a message"
						returnKeyType="done"
						returnKeyLabel="done"
						underlineColorAndroid="transparent"
					/>
					<TouchableHighlight
						style={styles.inputButton}
						underlayColor="#fff"
						onPress={this.sendComment}>
						<Text>Send</Text>
					</TouchableHighlight>
				</View>
			</View>
		);
	}

	/**
	 * Save the input values change to state
	 */
	changeTextHandler = text => {
		this.setState({ text: text });
	};

	sendComment = async () => {
		let notEmpty = this.state.text.trim().length > 0;

		if (notEmpty) {
			let messageToSave = {
				writer: this.props.username,
				text: this.state.text,
				date: new Date()
			};

			const result = await comment(this.props.idPost, this.state.text);
			if (result == 'OK') {
				this.setState({ comments: [...this.state.comments, messageToSave], text: '' });
				return;
			} else return null;
		}
	};
}

function mapStateToProps(store, ownProps) {
	//console.log(store.chat);
	return {
		username: store.auth.loggedUsername
	};
}
function mapDispatchToProps(dispatch) {
	return {};
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Comments);

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
