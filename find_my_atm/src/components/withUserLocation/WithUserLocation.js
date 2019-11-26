/**
 * Created by prasoon on 13/11/16.
 */
import React, {PropTypes} from 'react';
import {Alert} from 'react-native';
import {connect} from 'react-redux';
import Permissions from 'react-native-permissions';
import {updateUserCurrentLocation} from '../../actions/userActions';
import {fetchNearestPlaceEntities} from '../../actions/placeEntityActions';
import mapUtils from '../../utils/mapUtils';

export default (ComposedComponent) => {
  class WithUserLocation extends React.Component {

    watchID = null;

    state = {
      locationPermission: 'undetermined'
    };

    componentDidMount() {
      Permissions.getPermissionStatus('location')
        .then(permission => {
          if (permission === 'authorized') {
            console.log(permission);
            this.setState({
              locationPermission: true
            }, this.getUserLocation);
          } else {
            this.alertForPermission();
          }
        });
    }

    componentWillUnmount() {
      this.state.locationPermission && navigator.geolocation.clearWatch(this.watchID);
    }

    getUserLocation() {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.props.updateUserCurrentLocation(mapUtils.getRegionFromUserLocation(position.coords));
        },
        (error) => console.log(JSON.stringify(error)),
        { enableHighAccuracy: false, timeout: 20000, maximumAge: 1000 }
      );
      this.watchID = navigator.geolocation.watchPosition((position) => {
          this.props.updateUserCurrentLocation(mapUtils.getRegionFromUserLocation(position.coords));
        },
        (error) => console.log(JSON.stringify(error)),
        { enableHighAccuracy: false, timeout: 20000, maximumAge: 1000, distanceFilter: 500 }
      );
    }

    alertForPermission() {
      Alert.alert(
        'Can we access your location?',
        'We need access so we can fetch your nearest ATM/Banks',
        [
          { text: 'Cancel', onPress: () => console.log('permission denied'), style: 'cancel' },
          this.state.locationPermission == 'undetermined' ?
          { text: 'OK', onPress: this.requestPermission }
            : { text: 'Open Settings', onPress: Permissions.openSettings }
        ]
      )
    }

    //request permission to access location
    requestPermission = () => {
      Permissions.requestPermission('location')
        .then(permission => {
          //returns once the user has chosen to 'allow' or to 'not allow' access
          //response is one of: 'authorized', 'denied', 'restricted', or 'undetermined'
          this.setState({ locationPermission: permission }, this.getUserLocation)
        });
    };

    render() {
      return <ComposedComponent {...this.props}/>
    }
  }

  const mapDispatchToProps = {
    updateUserCurrentLocation,
  };

  return connect(null, mapDispatchToProps)(WithUserLocation);
}
