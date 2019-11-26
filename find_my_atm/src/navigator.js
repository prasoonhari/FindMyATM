/**
* @Author: Arkit Vora <arkitvora>
* @Date:   13-11-2016
*/

import React from 'react';
import {Actions, Scene} from 'react-native-router-flux';

import Launcher from './components/launcher';
import Login from './components/login/login';
import Home from './components/home';
import {BackButton} from './utils/navigatorUtils';

export function navigate(routeName, props) {
  Actions[routeName](props);
}

//Todo: check navigation away from addcontact screen (back and save buttons)
export const scenes = Actions.create(

  <Scene key="root">
    <Scene key="launcher" component={Launcher} initial hideTabBar hideNavBar type="reset" />
    <Scene key="login" component={Login} hideTabBar hideNavBar type="reset" />
    <Scene key="home" component={Home} hideTabBar hideNavBar type="reset" />

  </Scene>
);
