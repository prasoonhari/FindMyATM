import React, { PropTypes, Component } from 'react';
import { View, ActivityIndicator, Platform } from 'react-native';
import Spinner from 'react-native-spinkit';
import styles from './LoadingView.style';

class LoadingView extends Component {

  static displayName = 'Loading View';

  static propTypes = {
    containerStyles: PropTypes.oneOfType([PropTypes.number, PropTypes.object]),
    title: PropTypes.string,
    description: PropTypes.string,
    isVisible: PropTypes.bool,
    size: PropTypes.string,
    color: PropTypes.string,
    type: PropTypes.oneOf([
      'CircleFlip',
      'Bounce',
      'Wave',
      'WanderingCubes',
      'Pulse',
      'ChasingDots',
      'ThreeBounce',
      'Circle',
      '9CubeGrid',
      'WordPress',
      'FadingCircle',
      'FadingCircleAlt',
      'Arc',
      'ArcAlt'
    ])
  };

  static defaultProps = {
    type: 'Arc',
    color: '#000000'
  };

  render() {
    const { containerStyles, title, description } = this.props;
    return (
      <View style={[styles.container, containerStyles]}>
        {this.renderLoader()}
      </View>
    );
  }

  renderLoader() {
    const { type, color } = this.props;
    if (Platform.OS === 'ios') {
      return (
        <Spinner type={type} color={color} isVisible />
      );
    }
    return (
      <ActivityIndicator />
    );
  }
}

module.exports = LoadingView;
