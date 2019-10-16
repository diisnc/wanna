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
    Dimensions
} from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import Category from './components/Inspire/Category'

const { height, width } = Dimensions.get('window')


class Inspire extends Component {

    componentWillMount() {
        this.startHeaderHeight = 80
        if (Platform.OS == 'android') {
            this.startHeaderHeight = 80
        }
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
                    justifyContent: 'flex-start'
                }}>
                    {this.buildHeader()}
                    {/*this.buildFeed()*/}
                    {this.buildHorizontalScrollView()}
                </View>
            </SafeAreaView>
            
        )
    }

    // Builds header of the page
    buildHeader() {
        return (
                // Safe Box for Android
                <View style={{ height: this.startHeaderHeight, backgroundColor: 'white', borderBottomWidth: 1, borderBottomColor: '#dddddd' }}>
                    {/* Search Box */}
                    <View style={{
                        flexDirection: 'row', padding: 10,
                        backgroundColor: 'white', marginHorizontal: 20,
                        shadowOffset: { width: 0, height: 0 },
                        shadowColor: 'black',
                        shadowOpacity: 0.2,
                        elevation: 1,
                        justifyContent: 'flex-end'
                    }}>
                        <MaterialIcons name="search" size={20} style={{ marginRight: 10 }} />
                        <TextInput
                            underlineColorAndroid="transparent"
                            placeholder="Try Camisola"
                            placeholderTextColor="grey"
                            style={{ flex: 1, fontWeight: '700', backgroundColor: 'white' }}
                        />
                    </View>
                </View>
        );
    }

    // Builds feed of the page
    buildFeed() {
        return (
                <View style={{ height: 500, backgroundColor: 'pink', borderBottomWidth: 1, borderBottomColor: '#dddddd' }}>
                    
                </View>
        );
    }

    // Build Horizontal ScrollView
    buildHorizontalScrollView() {
        return (
            <ScrollView
                scrollEventThrottle={16}
            >
                <View style={{ flex: 1, backgroundColor: 'white', paddingTop: 20 }}>
                    <Text style={{ fontSize: 24, fontWeight: '700', paddingHorizontal: 20 }}>
                        What can we help you find, Varun?
                    </Text>

                    <View style={{ height: 130, marginTop: 20 }}>
                        <ScrollView
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                        >
                            <Category imageUri={require('../assets/home.jpg')}
                                name="Home"
                            />
                            <Category imageUri={require('../assets/experiences.jpg')}
                                name="Experiences"
                            />
                            <Category imageUri={require('../assets/restaurant.jpg')}
                                name="Resturant"
                            />
                        </ScrollView>
                    </View>
                    <View style={{ marginTop: 40, paddingHorizontal: 20 }}>
                        <Text style={{ fontSize: 24, fontWeight: '700' }}>
                            Introducing Airbnb Plus
                        </Text>
                        <Text style={{ fontWeight: '100', marginTop: 10 }}>
                            A new selection of homes verified for quality & comfort

                        </Text>
                        <View style={{ width: width - 40, height: 200, marginTop: 20 }}>
                            <Image
                                style={{ flex: 1, height: null, width: null, resizeMode: 'cover', borderRadius: 5, borderWidth: 1, borderColor: '#dddddd' }}
                                source={require('../assets/home.jpg')}
                            />

                        </View>
                    </View>
                </View>
            </ScrollView>
        );
    }

}
export default Inspire;



const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});