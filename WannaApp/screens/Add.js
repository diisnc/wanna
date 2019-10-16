import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet
} from "react-native";

class Add extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>Add</Text>
            </View>
        );
    }
}
export default Add;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});