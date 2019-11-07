import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import { globalStyle, defaultNavigator } from './style';
import { logout } from '../modules/auth/auth.service';
import { connect } from 'react-redux';

class Profile extends Component {
	render() {
		return (
			<View>
				<View style={styles.authBtnWrap}>
					<Button
						onPress={() => this.props.logout()}
						buttonStyle={[globalStyle.btn, styles.authBtn]}
						titleStyle={globalStyle.btnText}
						title={'Logout'}
					/>
				</View>
			</View>
		);
	}
}

function mapStateToProps(store) {
	return {};
}

function mapDispatchToProps(dispatch) {
	return {
		logout: () => {
			dispatch(logout());
		}
	};
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Profile);

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center'
	},
	authBtnWrap: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		width: '100%',
		paddingHorizontal: 15
	}
});
