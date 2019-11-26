import {
  TouchableHighlight,
  TouchableNativeFeedback,
  Platform,
} from 'react-native';

const Button = Platform.OS === 'android'
  ? TouchableNativeFeedback
  : TouchableHighlight;

module.exports = Button;
