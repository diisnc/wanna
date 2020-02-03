import React, { Component } from 'react';
import { TouchableHighlight, AsyncStorage, SafeAreaView, Platform, Text, TextInput, ToastAndroid} from 'react-native';
import { View, Container, Content, Grid, Col, Left, Right, Button, Icon, List, ListItem, Body, Radio, Input, Item } from 'native-base';
global.Buffer = global.Buffer || require('buffer').Buffer;
import FAIcon from '@expo/vector-icons/FontAwesome';

class Purchase extends Component {

	constructor(props) {
		super(props);

		console.log(this.props)

	}

	state = {
		fontLoaded: false
	};

	componentDidMount() {
		this.startHeaderHeight = 80;
		if (Platform.OS == 'android') {
			this.startHeaderHeight = 60;
		}
	}

	async componentWillMount() {
		await Expo.Font.loadAsync({
			'run': require('../assets/fonts/run.ttf'),
			Ionicons: require("../node_modules/@expo/vector-icons/build/vendor/react-native-vector-icons/Fonts/Ionicons.ttf")
		});
		this.setState({ fontLoaded: true });
	}

	render() {
		if (this.state.fontLoaded) {
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
						{this.renderPurchase()}
					</View>
				</SafeAreaView>
			);
		} else return null;
	}

	// Builds header of the page
	buildHeader() {
		if (this.state.fontLoaded) {
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
							backgroundColor: 'white'
						}}>
						<Text style={{
							flex: 1,
							textAlign: 'left',
							fontSize: 40,
							fontFamily: 'run'
						}}>
							COMPRAR
					</Text>
					</View>
				</View>
			);
		}
	}

	renderPurchase() {
		var left = (
			<Left style={{ flex: 1 }}>
				<Button onPress={() => Actions.pop()} transparent>
					<Icon name="ios-arrow-back" />
				</Button>
			</Left>
		);
		var right = (
			<Right style={{ flex: 1 }}>
				<Button onPress={() => Actions.search()} transparent>
					<Icon name="ios-search-outline" />
				</Button>
			</Right>
		);
		return (
			<Container style={{ backgroundColor: '#fdfdfd' }}>
				<Content padder>
					<View>
						<Text style={{ margin: 10, fontSize: 18 }}>Informação de envio</Text>
						
						<View style={{ flex: 1 }}>
						<TextInput
							style={ styles.formBox }
							placeholder="Nome"
							placeholderTextColor="black"
							onChangeText={text => this.setState({ name: text })}
						/>
						</View>

						<View style={{ flex: 1 }}>
						<TextInput
							style={ styles.formBox }
							placeholder="Email"
							placeholderTextColor="black"
							onChangeText={text => this.setState({ email: text })}
						/>
						</View>

						<View style={{ flex: 1 }}>
						<TextInput
							style={ styles.formBox }
							placeholder="Telemóvel"
							placeholderTextColor="black"
							onChangeText={text => this.setState({ phone: text })}
						/>
						</View>

						<View style={{ flex: 1 }}>
						<TextInput
							style={ styles.formBox }
							placeholder="País"
							placeholderTextColor="black"
							onChangeText={text => this.setState({ country: text })}
						/>
						</View>

						<View style={{ flex: 1 }}>
						<TextInput
							style={ styles.formBox }
							placeholder="Morada"
							placeholderTextColor="black"
							onChangeText={text => this.setState({ address: text })}
						/>
						</View>

						<View style={{ flex: 1 }}>
						<TextInput
							style={ styles.formBox }
							placeholder="Cidade"
							placeholderTextColor="black"
							onChangeText={text => this.setState({ city: text })}
						/>
						</View>

						<View style={{ flex: 1 }}>
						<TextInput
							style={ styles.formBox }
							placeholder="Código Postal"
							placeholderTextColor="black"
							onChangeText={text => this.setState({ postcode: text })}
						/>
						</View>

						<View style={{ flex: 1 }}>
						<TextInput
							style={ styles.formBox }
							placeholder="Notas"
							placeholderTextColor="black"
							onChangeText={text => this.setState({ note: text })}
						/>
						</View>
					</View>
					<Text style={{ marginTop: 15, fontSize: 18 }}>Your order</Text>
					<View style={styles.invoice}>
						<View style={styles.line} />
						<Grid style={{ paddingLeft: 10, paddingRight: 10, marginTop: 7 }}>
							<Col>
								<Text style={{ fontSize: 18, fontStyle: 'italic' }}>Total</Text>
							</Col>
							<Col>
								<Text
									style={{
										textAlign: 'right',
										fontSize: 18,
										fontWeight: 'bold'
									}}>
									{this.props.navigation.getParam('price', 'N/A') + ' €'}
								</Text>
							</Col>
						</Grid>
					</View>
					<View>
						<Text style={{ marginTop: 15, marginBottom: 7, fontSize: 18 }}>
							Método de Pagamento
						</Text>
						<ListItem
							style={{
								borderWidth: 1,
								borderColor: 'rgba(149, 165, 166, 0.3)',
								paddingLeft: 10,
								marginLeft: 0
							}}>
							<Text>Pagar com cartão</Text>
							<FAIcon
								name="cc-mastercard"
								size={20}
								color="#c0392b"
								style={{ marginLeft: 7 }}
							/>
							<FAIcon
								name="cc-visa"
								size={20}
								color="#2980b9"
								style={{ marginLeft: 2 }}
							/>
							<Right>
								<Radio
									selected={this.state.card}
									onPress={() => this.setState({ card: true, paypal: false })}
								/>
							</Right>
						</ListItem>
						<ListItem
							style={{
								borderWidth: 1,
								borderColor: 'rgba(149, 165, 166, 0.3)',
								paddingLeft: 10,
								marginLeft: 0,
								borderTopWidth: 0
							}}>
							<Text>Pagar com Paypal</Text>
							<FAIcon
								name="cc-paypal"
								size={20}
								color="#34495e"
								style={{ marginLeft: 7 }}
							/>
							<Right>
								<Radio
									selected={this.state.paypal}
									onPress={() => this.setState({ card: false, paypal: true })}
								/>
							</Right>
						</ListItem>
					</View>
					<View style={{ marginTop: 10, marginBottom: 10, paddingBottom: 7 }}>
						<Button
							onPress={() => this.checkout()}
							style={{ backgroundColor: 'red' }}
							block
							iconLeft>
							<Icon name="ios-card" />
							<Text style={{ color: '#fdfdfd' }}>Confirmar</Text>
						</Button>
					</View>
				</Content>
			</Container>
		);
	}

	checkout() {
		this.props.navigation.navigate('MyFeed');
		ToastAndroid.show('Compra efetuada!', ToastAndroid.LONG);
	}
}

export default Purchase;

const styles = {
	invoice: {
		paddingLeft: 20,
		paddingRight: 20
	},
	line: {
		width: '100%',
		height: 1,
		backgroundColor: '#bdc3c7'
	},
	formBox: {
		flex: 1,
		backgroundColor: 'rgb(240, 240, 240)',
		borderRadius: 30,
		marginBottom: 10,
		padding: 6,
		paddingLeft: 12
	}
};