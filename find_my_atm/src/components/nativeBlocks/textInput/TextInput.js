import React, { PropTypes } from 'react';
import { TextInput as RNTextInput } from 'react-native';

import styles from './TextInput.style';

/**
 * [Text description]
 * @param {[type]} {style    style prop of text, will be merged with our custom styling
 * @param {[type]} ...props} remaining props are passes as is.
 */
export default function TextInput(props) {
  return (<RNTextInput
    clearButtonMode="while-editing"
    enablesReturnKeyAutomatically
    autoCapitalize="none"
    autoCorrect={false}
    style={[styles.formField, props.style]}
    {...props}
  />);
}

TextInput.propTypes = {
  style: PropTypes.oneOfType([PropTypes.number, PropTypes.object]),
  editable: PropTypes.bool,
  placeholder: PropTypes.string,
  shouldAutoFocus: PropTypes.bool,
  keyboardType: PropTypes.string,
  returnKeyType: PropTypes.string,
  secureTextEntry: PropTypes.bool,
  placeholderTextColor: PropTypes.string
};

TextInput.defaultProps = {
  editable: true,
  placeholder: 'Type here',
  shouldAutoFocus: false,
  keyboardType: 'default',
  returnKeyType: 'next',
  secureTextEntry: false,
  placeholderTextColor: '#d3d3d3'
};
