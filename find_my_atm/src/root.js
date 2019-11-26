import React, { Component } from 'react';
import { AppRegistry , StyleSheet} from 'react-native';
import { Provider, connect } from 'react-redux';
import { Router } from 'react-native-router-flux';
import { configureStore, getMiddleware } from './store';

import { scenes } from './navigator';
const RouterWithRedux = connect()( Router );

const _getSceneDimension = function ( props, computedProps ) {
  if ( computedProps.isActive ) {
    const dimension = {
      marginTop   : computedProps.hideNavBar ? 0 : 64,
      marginBottom: computedProps.hideTabBar ? 0 : 49
    };
    return dimension;
  }
};

const getSceneStyle = function ( props, computedProps ) {
  const dimension = _getSceneDimension( props, computedProps );
  return {
    flex: 1,
    ...dimension
  };
};

class Root extends Component {

  static store;

  constructor(){
    super();

    const middleware = getMiddleware();
    store = configureStore(middleware, getInitialState());
  }

  render() {
    return (
      <Provider store={store}>
        <RouterWithRedux scenes={scenes} sceneStyle={styles.sceneStyle} navigationBarStyle={styles.navigationBar} getSceneStyle={getSceneStyle}
                         titleStyle={styles.title}/>
      </Provider>
    )
  }
}

function getInitialState() {
  return {};
}

const styles = StyleSheet.create( {
  sceneStyle   : {
    backgroundColor: 'white'
  },
  navigationBar: {
    backgroundColor: '#FF0000',
    flex           : 1,
    flexDirection  : 'row'
  },
  title        : {
    color: '#FFFFFF',
  }
} );

AppRegistry.registerComponent( 'find_my_atm', () => Root );
