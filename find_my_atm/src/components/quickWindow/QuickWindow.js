/**
 * Created by prasoon on 15/11/16.
 */
import React, {PropTypes} from 'react';
import {isUndefined as _isUndefined} from 'lodash';
import {
  View,
  Text,
  StyleSheet,
  Animated
} from 'react-native';
import { Button, Icon } from 'native-blocks';

class QuickWindow extends React.Component {

  static defaultProps = {
    isOpen: false
  };

  static propTypes = {
    isOpen: PropTypes.bool,
    title: PropTypes.string,
    onPress: PropTypes.func,
    onHide: PropTypes.func
  };

  state = {
    bounceValue: new Animated.Value(236),
  };

  componentWillReceiveProps(nextProps) {
    if (!_isUndefined(nextProps.isOpen) && nextProps.isOpen !== this.props.isOpen) {
      this._toggleSubview(nextProps.isOpen);
    }
  }

  componentDidMount() {
    this._toggleSubview(this.props.isOpen);
  }

  _toggleSubview = (isOpen) => {
    let toValue = 236;
    if (isOpen) {
      toValue = 0;
    }

    Animated.spring(
      this.state.bounceValue,
      {
        toValue: toValue,
        velocity: 5,
        tension: 2,
        friction: 5,
      }
    ).start();
  };

  render() {
    const props = this.props;
    return (
      <Animated.View
        style={[styles.quickView, {transform: [{translateY: this.state.bounceValue}]}]}
      >
        <Button onPress={props.onPress}>
          <View style={styles.container}>
            <View style={styles.navBar}>
              <Text style={styles.navBarTitle}>{props.title}</Text>
              {this.props.isOpen ?
                <Button onPress={props.onHide}>
                  <View style={styles.closeButton}>
                    <Icon name='close' color='#FFFFFF' size={14}/>
                  </View>
                </Button> : null
              }
            </View>
            <View style={{flex: 1}}>
              {props.children}
            </View>
          </View>
        </Button>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  quickView: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#FFFFFF",
    height: 300,
  },
  navBar: {
    height: 64,
    backgroundColor: '#000000',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  navBarTitle: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '700',
    marginLeft: 16
  },
  closeButton: {
    height: 46,
    padding:16,
  }
});

export default QuickWindow;
