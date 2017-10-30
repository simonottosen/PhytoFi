import React, {Component} from 'react';
import ReactNative from 'react-native';
import {Actions} from 'react-native-router-flux';
import * as firebase from 'firebase';
import StatusBar from './StatusBar';
import styles from '../styles';
const {
  Text,
  View,
  KeyboardAvoidingView,
  TouchableHighlight
} = ReactNative;

class Camera extends Component {
  async userLogout() {
    try {
      await AsyncStorage.removeItem('id_token');
      Alert.alert('Log Out Successfully!');
      Actions.Authentication();
    } catch (error) {
      console.log('AsyncStorage error: ' + error.message);
    }
  }
  render() {
    return (
      <KeyboardAvoidingView style={styles.listContainer} behavior="padding" >
      </KeyboardAvoidingView>
    )
  }
}
module.exports = Camera;