/**
* @Author: Arkit Vora <arkitvora>
* @Date:   13-11-2016
*/

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import {authenticateUser} from '../../actions/userActions';
import {connect} from 'react-redux';


class Launcher extends Component {

  componentDidMount() {
    this.props.authenticateUser();
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>FIND MY ATM</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems:'center',
    justifyContent:'center'
  },
  title: {
    fontSize:26,
    fontWeight:'700'
  }
});

const mapStateToProps = (state) => {
  return { };
};

const mapDispatchToProps = {
  authenticateUser
};

export default connect(mapStateToProps, mapDispatchToProps)(Launcher);
