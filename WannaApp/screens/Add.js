import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    TextInput,
    Platform,
    ScrollView,
    Image,
    TouchableHighlight
} from "react-native";
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker'

class Add extends Component {

    state = 
    {
        wishlistData: [],
        numPosts: 0,
        base64image: null
    }

    componentDidMount() {
        this.startHeaderHeight = 80
        if (Platform.OS == 'android') {
            this.startHeaderHeight = 60
        }

        // get data from servers and save in state
        this.getWishlistDataFromApiAsync();
    }

    render() {
        return (
            /* 
            Fazer View Englobadora da página
            onde o primeiro elemento é o header
            de pesquisa e o segundo elemento
            é o feed que contém as imagens.
            */
           // Safe Box for Iphone
           <SafeAreaView style={{ flex: 1 }}>
               {/* Full Page Box */}
                <View style={{
                    flex: 1,
                    flexDirection: 'column',
                    justifyContent: 'flex-start',
                    alignItems: 'stretch'
                }}>
                    {this.buildHeader()}
                    {this.buildForm()}
                </View>
            </SafeAreaView>
            
        )
    }

    // Builds header of the page
    buildHeader() {
        return (
            // Safe Box for Android
            <View style={{ height: this.startHeaderHeight, backgroundColor: 'white', borderBottomWidth: 1, borderBottomColor: '#dddddd' }}>
                <View style={{
                    height: '90%',
                    flexDirection: 'row', padding: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: "blue"
                }}>
                    <Text style={{flex: 1, textAlign: "center"}}>
                        NEW POST
                    </Text>
                </View>
            </View>
        );
    }

    // Build space to pick image
    buildForm() {
        return (
            <ScrollView scrollEventThrottle={16}>
                <View style={{ flex: 1, backgroundColor: 'white', margin: 10 }}>
                    {this.buildImagePicker()}
                </View>
            </ScrollView>
        );
    }

    // Build space to pick image
    buildImagePicker() {
        return (
            <View style={{flex: 1}}>
                <View style={{
                    height: 200,
                    flexDirection: 'row', padding: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: "pink"
                }}>
                    {/* Take photo */}
                    <MaterialCommunityIcons.Button
                        name="camera" size={40} 
                        style={{flex: 1}}
                        onPress={this.takePhoto}
                    />
                    {/* Select from gallery */}
                    <MaterialCommunityIcons.Button
                        name="folder-image" size={40} 
                        style={{flex: 1}}
                        onPress={this.pickImage}
                    />
                </View>
                <View style={{
                    height: 200
                }}>
                    <Image
                        source={{uri: "data:" + 'image' + ";base64," + this.state.base64image + ""}}
                        style={{
                            width: 'auto',
                            height: '80%',
                            aspectRatio: 1,
                            overflow: 'hidden'
                        }}
                    />
                </View>
            </View>
        );
    }

    // handle image result
    handleImagePicked(pickerResult) {
        {/* save image on base64 to state */}
        this.setState({base64image: pickerResult.base64})
        //console.log(pickerResult.base64)
    }

    // access camera and take photo
    takePhoto = async () => {
        let pickerResult = await ImagePicker.launchCameraAsync({
          allowsEditing: true,
          aspect: [4, 3],
          base64: true
        })
      
        this.handleImagePicked(pickerResult)
    }     
    
    // access photo folder and pick
    pickImage = async () => {
        let pickerResult = await ImagePicker.launchImageLibraryAsync({
          allowsEditing: true,
          aspect: [16, 9],
          base64: true
        })
      
        this.handleImagePicked(pickerResult)
    }

    // Get Data to Build Feed and Transform it to Json Object
    getWishlistDataFromApiAsync() {
        /*
        return fetch('https://facebook.github.io/react-native/movies.json')// ONLINE GET
            .then(response => response.json())
            .then(responseJson => {
                this.setState({wishlistData: responseJson, numPosts: Object.keys(responseJson).length});
                //console.log(responseJson);
            })
            .catch(error => {
                console.error(error);
            });
        */

        const newState = require("./json/responseFeed");
        this.setState({wishlistData: newState, numPosts: newState.length})

       return;
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