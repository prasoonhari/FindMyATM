/**
* @Author: Arkit Vora <arkitvora>
* @Date:   15-11-2016
*/

import React, { Component, PropTypes } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import { Button , Icon } from 'native-blocks';
import _ from 'lodash';

export default class PlaceDetails extends Component {

  static propTypes = {
    placeDetails: PropTypes.object,
    placeStatusAction: PropTypes.func,
  };

  onAction = (status) => {
    this.props.placeStatusAction(status , this.props.placeDetails.place_id);
  }

  render() {
    const {props} = this;
    console.log("place details " , props.placeDetails);
    return (
      <View style={styles.container}>
        <View style={styles.feedbacks}>
          <Button onPress={_.partial(this.onAction,1)}><View style={[styles.action , {backgroundColor:'#6dc066'}]}><Icon name='sentiment-pos' color='#FFFFFF' size={14}/><Text style={styles.label}>Cash</Text></View></Button>
          <Button onPress={_.partial(this.onAction,0.5)}><View style={[styles.action , {backgroundColor:'#fbd742'}]}><Icon name='sentiment-neu' color='#FFFFFF' size={14}/><Text style={styles.label}>Long wait</Text></View></Button>
          <Button onPress={_.partial(this.onAction,0)}><View style={[styles.action , {backgroundColor:'#ec685b'}]}><Icon name='sentiment-neg' color='#FFFFFF' size={14}/><Text style={styles.label}>No Cash</Text></View></Button>
        </View>
        <View style={styles.property}>
          <Text style={styles.propertyLabel}>{'Name'}</Text>
          <Text style={styles.propertyValue}>{_.get(props.placeDetails.name)}</Text>
        </View>
        <View style={styles.property}>
          <Text style={styles.propertyLabel}>{'Address'}</Text>
          <Text style={styles.propertyValue}>{props.placeDetails.vicinity}</Text>
        </View>
        <View style={styles.property}>
          <Text style={styles.propertyLabel}>{'Distance'}</Text>
          <Text style={styles.propertyValue}>{_.get(props.placeDetails , 'distance.text')}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  feedbacks: {
    flexDirection:'row',
    marginHorizontal:16,
    borderRadius:8,
    marginVertical:16
  },
  action: {
    flex:1,
    height:50,
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center'
  },
  property: {
    flexDirection: 'row',
    justifyContent:'flex-start',
    marginBottom:8,
    marginHorizontal:16
  },
  propertyLabel: {
    flex:1.3,
    color: '#afafb9',
    fontSize:12
  },
  propertyValue: {
    flex:3,
    color:'#191923',
    fontSize:12
  },
  label: {
    color:'#FFFFFF',
    fontSize:15,
    fontWeight:'600'
  }
});
