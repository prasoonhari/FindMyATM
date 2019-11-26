
import React, { Component, PropTypes } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import { ListView , Button } from 'native-blocks';
import _ from 'lodash';

export default class PlaceDetail extends Component {

  static propTypes = {
    places: PropTypes.array,
    onPlaceSelected: PropTypes.func
  };


  render() {
    const {props} = this;
    return (
      <View style={styles.container}>
        <ListView
          data={props.places}
          shouldShowSeparator
          enableCardView={false}
          renderRow={this.renderPlace}
          />
      </View>
    );
  }

  renderPlace = (place) => {
    console.log("PLACE " , place);
    return (<Button onPress={_.partial(this.props.onPlaceSelected , place)}>
      <View style={styles.bank}>
        <View style={styles.bankDetails}>
          <Text style={styles.name}>{place.name}</Text>
          <Text style={styles.address}>{place.vicinity}</Text>
        </View>
        <Text style={styles.distance}>{_.get(place, 'distance.text')}</Text>
      </View>
    </Button>);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  name: {
    fontSize:16,
    fontWeight:'600'
  },
  address: {
    fontSize:13,
    fontWeight:'400'
  },
  bank: {
    paddingTop:4,
    paddingBottom:4,
    marginHorizontal:16,
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center'
  },
  distance: {
    flex:1,
    alignSelf:'center',
    textAlign:'center'
  },
  bankDetails: {
    flex:5
  }

});
