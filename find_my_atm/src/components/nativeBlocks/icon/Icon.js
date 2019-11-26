import React, { PropTypes } from 'react';
import { createIconSetFromFontello } from 'react-native-vector-icons';
import fontelloConfig from '../../../img/iconConfig.json';
import styles from './Icon.style';
const FontelloIcon = createIconSetFromFontello(fontelloConfig);

class Icon extends React.Component {

  static propTypes = {
    name: PropTypes.string,
    color: PropTypes.string,
    size: PropTypes.number
  };

  static defaultProps = {
  };

  render(){
    let {name, color, size} = this.props;
    return (<FontelloIcon name={name} color={color} size={size}/>);
  }
}

export default Icon;
