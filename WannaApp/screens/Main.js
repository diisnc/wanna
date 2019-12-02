import Inspire from './Inspire';
import Wanted from './Wanted';
import Combine from './Combine';
import Add from './Add';
import Profile from './Profile';
import EditProfile from './EditProfile';
import Filters from './Filters';
import NewFilter from './NewFilter';
import FollowList from './FollowList';
import Comments from './Comments';
import ConversationsList from './ConversationsList';
import Chat from './Chat';
import UserPostProfile from './UserPostProfile';
import React, { Component } from 'react';
import { createMaterialTopTabNavigator, BottomTabBar } from 'react-navigation-tabs';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { StyleSheet, Text, View, Image } from 'react-native';

const FilterStack = createStackNavigator({
	Wanted: {
		screen: Wanted,
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
	NewFilter: {
		screen: NewFilter,
		headerMode: 'none',
		navigationOptions: {
			header: null
		}
	}
});

const UserStack = createStackNavigator({
	MyProfile: {
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
	},
	UserProfile: {
		screen: Profile,
		headerMode: 'none',
		navigationOptions: {
			header: null
		}
	},
	UserPostProfile: {
		screen: UserPostProfile,
		headerMode: 'none',
		navigationOptions: {
			header: null
		}
	},
	FollowList: {
		screen: FollowList,
		headerMode: 'none',
		navigationOptions: {
			header: null
		}
	},
	Comments: {
		screen: Comments,
		headerMode: 'none',
		navigationOptions: {
			header: null
		}
	},
	ConversationsList: {
		screen: ConversationsList,
		navigationOptions: {
			header: null
		}
	},
	Chat: {
		screen: Chat,
		navigationOptions: {
			header: null
		}
	}
});

const FeedStack = createStackNavigator({
	MyFeed: {
		screen: Inspire,
		headerMode: 'none',
		navigationOptions: {
			header: null
		}
	},
	UserProfile: {
		screen: Profile,
		headerMode: 'none',
		navigationOptions: {
			header: null
		}
	},
	UserPostProfile: {
		screen: UserPostProfile,
		headerMode: 'none',
		navigationOptions: {
			header: null
		}
	},
	Comments: {
		screen: Comments,
		headerMode: 'none',
		navigationOptions: {
			header: null
		}
	}
});

const MainTab = createMaterialTopTabNavigator(
	{
		Inspire: {
			screen: FeedStack,
			navigationOptions: {
				tabBarLabel: <Text style={{ fontSize: 10 }}>INSPIRE</Text>,
				tabBarIcon: ({ tintColor }) => (
					<MaterialCommunityIcons name="home-outline" color={tintColor} size={24} />
				)
			}
		},
		Wanted: {
			screen: FilterStack,
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
			screen: UserStack,
			navigationOptions: {
				tabBarLabel: <Text style={{ fontSize: 10 }}>PROFILE</Text>,
				tabBarIcon: ({ tintColor }) => (
					<MaterialIcons name="person-outline" color={tintColor} size={24} />
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
			indicatorStyle: {
				backgroundColor: 'red'
			},
			showIcon: true,
			showLabel: true
		},
		tabBarPosition: 'bottom'
	}
);

MainTab.navigationOptions = {
	// Hide the header from root stack
	header: null
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center'
	}
});

export default createAppContainer(MainTab);
