/**
* @Author: Arkit Vora <arkitvora>
* @Date:   13-11-2016
*/

import React from 'react';
import {Button , View } from 'native-blocks';
import {Actions} from 'react-native-router-flux';

export const BackButton = (
   <Button onPress={() => {Actions.pop()}}>
     <View>
       {/* <Icon name={'left-arrow'} size={18} color={'white'}/> */}
     </View>
   </Button>);
