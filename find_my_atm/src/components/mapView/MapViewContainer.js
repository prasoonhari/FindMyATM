/**
 * Created by prasoon on 13/11/16.
 */
import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import Spinner from 'react-native-spinkit';
import MapView from './MapView';
import WithPureRender from '../../helpers/WithPureRender';

import {fetchNearestPlaceEntities} from '../../actions/placeEntityActions';

class MapViewContainer extends React.Component {

  static propTypes = {
    currentLocation: PropTypes.shape({
      latitude: PropTypes.number,
      longitude: PropTypes.number,
      mocked: PropTypes.bool,
    }),
    onPlaceSelected: PropTypes.func,
    placesByIds: PropTypes.object,
  };

  render() {
    return (<MapView {...this.props}/>);
  }
}

const mapStateToProps = ({user: {currentLocation}}) => {
  return { currentLocation };
};

const mapDispatchToProps = {
  fetchNearestPlaceEntities
};

export default connect(mapStateToProps, mapDispatchToProps)(WithPureRender(MapViewContainer));
