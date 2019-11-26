import React, { PropTypes } from 'react';
import { Text as RNText, Dimensions, StyleSheet } from 'react-native';
import styles from './Text.style';

const flattenStyle = StyleSheet.flatten;

/**
 * [Text description]
 * @param {[type]} {style    style prop of text, will be merged with our custom styling
 * @param {[type]} ...props} remaining props are passes as is.
 */
export default function Text(props) {
  const fontSize = (flattenStyle(props.style) && flattenStyle(props.style).fontSize) || 14;
  const { width } = Dimensions.get('window');
  const scaledFontSize = props.shouldAutomaticallyScale ? Math.round(fontSize * width / 375) : fontSize;
  return (
    <RNText style={[{ fontSize: scaledFontSize }, props.style, styles.font]} {...props} />
  );
}

Text.propTypes = {
  style: PropTypes.oneOfType([PropTypes.number, PropTypes.object, PropTypes.array]),
  shouldAutomaticallyScale: PropTypes.bool,
};

Text.defaultProps = {
  shouldAutomaticallyScale: true,
};
