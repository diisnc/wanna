import React, { Component } from 'react';
import { View, StyleSheet, Image, Button } from 'react-native';
global.Buffer = global.Buffer || require('buffer').Buffer;
import { globalStyle, defaultNavigator } from './style';

class Wanna extends Component {
	render() {
		return (
			<View style={styles.container}>
				<Image style={styles.logo} source={require('../assets/logo.png')} />
				<View style={styles.authBtnWrap}>
					<Button
						onPress={() => this.props.navigation.navigate('Login')}
						buttonStyle={[globalStyle.btn, styles.authBtn]}
						titleStyle={globalStyle.btnText}
						title="Log in"
					/>
					<Button
						onPress={() => this.props.navigation.navigate('Register')}
						buttonStyle={[globalStyle.btn, styles.authBtn]}
						titleStyle={globalStyle.btnText}
						title={'Create account'}
					/>
					<Button
						onPress={() => this.props.navigation.navigate('Main')}
						buttonStyle={[globalStyle.btn, styles.authBtn]}
						titleStyle={globalStyle.btnText}
						title={'Mudar'}
					/>
				</View>
			</View>
		);
	}
}

export default Wanna;

const styles = StyleSheet.create({
	container: {
		justifyContent: 'center',
		alignItems: 'center'
	},
	logo: {
		width: '50%',
		height: '50%'
	},
	authBtnWrap: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		width: '100%',
		paddingHorizontal: 15
	},
	authBtn: {
		marginHorizontal: 0,
		marginVertical: 18,
		width: '80%',
		alignSelf: 'center',
		backgroundColor: '#000000'
	}
});
