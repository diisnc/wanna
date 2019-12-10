import React, { Component } from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';
global.Buffer = global.Buffer || require('buffer').Buffer;

class Wanna extends Component {
	render() {
		return (
            <View style={styles.container}>
                <Image
                    style={styles.logo}
                    resizeMode="contain"
                    source={require('../assets/full_logo.png')}
                />
                <Text style={{color: 'gray'}}>Sem posts? Começa por seguir alguém!</Text>
            </View>
		);
	}
}

export default Wanna;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems:'center'
	},
	logo: {
        width: 150,
        height: 150,
        marginRight: '4%'
	}
});
