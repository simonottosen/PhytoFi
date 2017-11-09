import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ReactNative from 'react-native';
import {Actions} from 'react-native-router-flux';
import ActionButton from './ActionButton';
import styles from '../styles';
const {
  Alert,
  AsyncStorage,
  Button,
  Text,
  View,
  ViewPropTypes
} = ReactNative;

class DrawerContent extends Component{
  static propTypes = {
    name: PropTypes.string,
    sceneStyle: ViewPropTypes.style,
    title: PropTypes.string,
  }
  static contextTypes = {
    drawer: React.PropTypes.object,
  }
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
      <View style={styles.drawer}>
        <Text>Drawer Content</Text>
        <Button style={styles.drawerButton} onPress={this.userLogout.bind(this)} title="Log Out" />
        <Button style={styles.drawerButton} onPress={Actions.pop} title="Back" />
      </View>
    );
  }
}
module.exports = DrawerContent;