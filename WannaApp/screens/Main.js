import Inspire from './Inspire';
import Wanted from './Wanted';
import Combine from './Combine';
import Add from './Add';
import Profile from './Profile';
import EditProfile from './EditProfile';
import Filters from './Filters';
import NewFilter from './NewFilter';
import UserPost from './UserPost';
import React, { Component } from 'react';
import { createMaterialTopTabNavigator, BottomTabBar } from 'react-navigation-tabs';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { StyleSheet, Text, View, Image } from 'react-native';

const MainTab = createMaterialTopTabNavigator(
	{
		Inspire: {
			screen: Inspire,
			navigationOptions: {
				tabBarLabel: <Text style={{ fontSize: 10 }}>INSPIRE</Text>,
				tabBarIcon: ({ tintColor }) => (
					<MaterialCommunityIcons name="home-outline" color={tintColor} size={24} />
				)
			}
		},
		Wanted: {
			screen: Wanted,
			navigationOptions: {
				tabBarLabel: <Text style={{ fontSize: 10 }}>WANTED</Text>,
				tabBarIcon: ({ tintColor }) => (
					<MaterialCommunityIcons name="heart-outline" color={tintColor} size={24} />
				)
			}
		},
		Add: {
			screen: Add,
			navigationOptions: {
				tabBarLabel: <Text style={{ fontSize: 10 }}>ADD</Text>,
				tabBarIcon: ({ tintColor }) => (
					<Image
						source={require('../assets/logo64.png')}
						style={{ height: 24, width: 24 }}
					/>
				)
			}
		},
		Combine: {
			screen: Combine,
			navigationOptions: {
				tabBarLabel: <Text style={{ fontSize: 10 }}>COMBINE</Text>,
				tabBarIcon: ({ tintColor }) => (
					<MaterialCommunityIcons name="vector-combine" color={tintColor} size={24} />
				)
			}
		},
		Profile: {
			screen: Profile,
			navigationOptions: {
				tabBarLabel: <Text style={{ fontSize: 10 }}>PROFILE</Text>,
				tabBarIcon: ({ tintColor }) => (
					<MaterialIcons name="person-outline" color={tintColor} size={24} />
				)
			}
		},
		UserPost: {
			screen: UserPost,
			navigationOptions: {
				tabBarLabel: <Text style={{ fontSize: 10 }}>USERPOST</Text>,
				tabBarIcon: ({ tintColor }) => (
					<MaterialIcons name="person" color={tintColor} size={24} />
				)
			}
		}
	},
	{
		swipeEnabled: true,
		animationEnabled: true,
		tabBarOptions: {
			activeTintColor: 'red',
			inactiveTintColor: 'grey',
			style: {
				backgroundColor: 'white',
				borderTopWidth: 0,
				shadowOffset: { width: 5, height: 3 },
				shadowColor: 'black',
				shadowOpacity: 0.5,
				elevation: 5
			},
			showIcon: true,
			showLabel: true
		},
		tabBarPosition: 'bottom'
	}
);

MainTab.navigationOptions = {
	// Hide the header from root stack
	header: null,
	swipeEnabled: false
};

const subMain = createStackNavigator({
	Main: {
		screen: MainTab,
		headerMode: 'none',
		navigationOptions: {
			header: null
		}
	},
	NewFilter: {
		screen: NewFilter,
		headerMode: 'none',
		navigationOptions: {
			header: null
		}
	},
	Filters: {
		screen: Filters,
		headerMode: 'none',
		navigationOptions: {
			header: null
		}
	},
	OtherProfile: {
		screen: Profile,
		headerMode: 'none',
		navigationOptions: {
			header: null
		}
	},
	EditProfile: {
		screen: EditProfile,
		headerMode: 'none',
		navigationOptions: {
			header: null
		}
	}
});

subMain.navigationOptions = {
	// Hide the header from root stack
	header: null
};

const MainStack = createStackNavigator(
	{
		Main: MainTab,
		SubMain: subMain
	},
	{
		initialRouteName: 'Main'
	},
	{
		headerMode: 'none',
		navigationOptions: {
			header: null
		}
	}
);

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center'
	}
});

export default createAppContainer(MainStack);
