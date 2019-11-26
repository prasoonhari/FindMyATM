/**
 * @Author: Arkit Vora <arkitvora>
 * @Date:   13-11-2016
 */

import React, { PropTypes } from 'react';
import {connect} from 'react-redux';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  TouchableHighlight
} from 'react-native';
import { Loader } from 'native-blocks';
import MapView from '../mapView';
import WithUserLocation from '../withUserLocation';
import QuickWindow from '../quickWindow';
import PlaceDetailView from '../placeDetailView/PlaceDetailViewContainer';
import PlaceList from '../placeList';

class Home extends React.Component {

  state = {
    isDetailViewOpen: false,
    selectedPlace: null
  };

  onPlaceSelected = (place, {coordinate, position}) => {
    const newState = {
      selectedPlace: place
    };
    if (!this.state.isDetailViewOpen) {
      newState.isDetailViewOpen = true;
    }
    this.setState(newState);
  };

  toggleSubView = () => {
    this.setState({
      isDetailViewOpen: !this.state.isDetailViewOpen,
      selectedPlace: null
    });
  };

  hideSubView = () => {
    this.setState({
      isDetailViewOpen: false,
      selectedPlace: null
    });
  };

  renderSubView() {
    const selectedPlace = this.state.selectedPlace;
    const {props} = this;
    if (this.state.selectedPlace) {
      return (<PlaceDetailView placeDetails={selectedPlace}/>)
    }
    else {
      return ( props.placesByIds ? <PlaceList onPlaceSelected={this.onPlaceSelected} places={Object.values(props.placesByIds)}/> : <Loader/>)
    }
  }

  render() {
    const isDetailViewOpen = this.state.isDetailViewOpen;
    const selectedPlace = this.state.selectedPlace;
    return (
      <View style={styles.container}>
        <MapView onPlaceSelected={this.onPlaceSelected} placesByIds={this.props.placesByIds}/>
        <QuickWindow
          isOpen={isDetailViewOpen}
          onHide={this.hideSubView}
          onPress={this.toggleSubView}
          title={selectedPlace ? selectedPlace.name : "ATM Finder"}>
          {isDetailViewOpen ? this.renderSubView() : null}
        </QuickWindow>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF'
  }
});

const mapStateToProps = ({placeEntity : {placesByIds}}) => {
  return { placesByIds };
};

export default connect(mapStateToProps)(WithUserLocation(Home));
