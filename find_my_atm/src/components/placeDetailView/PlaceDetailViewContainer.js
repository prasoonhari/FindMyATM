/**
 * Created by prasoon on 15/11/16.
 */
import React, {PropTypes} from 'react';
import PlaceDetailView from './PlaceDetailView';
import {connect} from 'react-redux';
import WithPureRender from '../../helpers/WithPureRender';
import {placeStatusAction} from '../../actions/placeEntityActions';



class PlaceDetailViewContainer extends React.Component {

  static propTypes = {
    placeDetails: PropTypes.object,
  };

  render() {
    const {props} = this;
    return (<PlaceDetailView placeStatusAction={props.placeStatusAction} placeDetails={props.placeDetails}/>);
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = {
  placeStatusAction
};

export default connect(mapStateToProps, mapDispatchToProps)(WithPureRender(PlaceDetailViewContainer));
