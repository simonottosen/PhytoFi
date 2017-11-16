import React, {Component} from 'react';
import ReactNative from 'react-native';
import {Actions} from 'react-native-router-flux';
import * as firebase from 'firebase';
import Camera from 'react-native-camera';
import { Icon } from 'react-native-elements';
import StarRating from 'react-native-star-rating';
import StatusBar from './StatusBar';
import styles from '../styles';
const {
  ActivityIndicator,
  Alert,
  Image,
  Text,
  View,
  KeyboardAvoidingView,
  TouchableHighlight
} = ReactNative;

class PhotoPage extends Component {
  render() {
    return (
      <Text>Hello world!</Text>
    );
  }
}