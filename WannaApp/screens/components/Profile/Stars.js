
import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { FontAwesome } from '@expo/vector-icons';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import colors from './../../styles/colors/index';

export default class Stars extends Component {
  get stars() {
    const { rating, size, color } = this.props;
    const starsNumber = parseInt(rating);
    const starElements = [];
    for (let i = 0; i < 5; i++) {
      starElements.push(
        <FontAwesome
          key={`star-${i}`}
          name="star"
          size={size}
          color={starsNumber > i ? color : colors.gray02}
          style={styles.star}
        />,
      );
    }
    return starElements;
  }

  render() {
  	return (
    <View style={styles.wrapper}>
      <View style={styles.stars}>
        {this.stars}
      </View>
    </View>
  	);
  }
}

Stars.propTypes = {
  rating: PropTypes.number.isRequired,
  size: PropTypes.number.isRequired,
  color: PropTypes.string.isRequired,
};

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  star: {
    marginRight: 1,
  },
  stars: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  votesNumber: {
    fontSize: 11,
    fontWeight: '600',
    marginTop: 1,
    marginLeft: 3,
  },
});