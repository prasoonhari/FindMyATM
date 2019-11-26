/**
 * Created by prasoon on 13/11/16.
 */
import React, {PropTypes} from 'react';
import update from 'react-addons-update';
import {map as _map, isEmpty as _isEmpty, debounce as _debounce, partial as _partial} from 'lodash';
import {
  View,
  StyleSheet,
  Text
} from 'react-native';
import NativeMapView from 'react-native-maps';
import { Button, Loader } from 'native-blocks';
import {hasLocationChanged, getRegionFromUserLocation, getMarkerColorFromStatus} from '../../utils/mapUtils';

import styles from './mapView.styles';

class MapView extends React.Component {

  static propTypes = {
    updateUserCurrentLocation: PropTypes.func,
    onPlaceSelected: PropTypes.func,
    currentLocation: PropTypes.object,
    placesByIds: PropTypes.object,
    selectedPlace: PropTypes.object
  };

  constructor(props) {
    super(props);
    this.state = {
      regionInFocus: props.currentLocation,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (hasLocationChanged(this.props.currentLocation, nextProps.currentLocation)) {
      this.setState({
        regionInFocus: nextProps.currentLocation
      });
    }
  }

  onRegionChange = _debounce((region) => {
    if (hasLocationChanged(this.state.regionInFocus, region)) {
      this.setState({
        regionInFocus: region
      });
      this.props.fetchNearestPlaceEntities(region);
    }
  }, 2000);

  renderMarkers(placesByIds) {
    return _map(placesByIds, (place, placeId) => {
      const location = place.location;
      return (
        <NativeMapView.Marker
          key={placeId}
          identifier={placeId}
          title={place.name}
          description={place.vicinity}
          pinColor={getMarkerColorFromStatus(place.status)}
          onPress={_partial(this.props.onPlaceSelected, place)}
          coordinate={{latitude: location.lat, longitude: location.lng}}>
        </NativeMapView.Marker>
      );
    });
  }

  render() {
    const placesByIds = this.props.placesByIds;
    return (
      <View style={styles.container}>
        <NativeMapView
          onRegionChange={this.onRegionChange}
          region={getRegionFromUserLocation(this.state.regionInFocus)}
          showsMyLocationButton={true}
          loadingEnabled={true}
          style={styles.map}>
          {_isEmpty(placesByIds) ? null : this.renderMarkers(placesByIds)}
        </NativeMapView>
      </View>);
  }
}

export default MapView;
