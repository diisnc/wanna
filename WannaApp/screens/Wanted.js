import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet
} from "react-native";

class Wanted extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>Wanted</Text>
            </View>
        );
    }
}
export default Wanted;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});