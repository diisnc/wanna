import React, { Component } from 'react';
import { StyleSheet, Text, Image, View } from 'react-native';

export default class Logo extends Component {
    render(){
        return(
            <View style={styles.container}>
                <Image style={styles.image}
                       source={require('../assets/logo.png')}/>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        alignItems:'flex-top',
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        width: 200,
        height: 200
    }
})