import React, {Component} from 'react';
import ReactNative from 'react-native';
import {Actions} from 'react-native-router-flux';
import * as firebase from 'firebase';
import StatusBar from './StatusBar';
import styles from '../styles';
const {
  ActivityIndicator,
  Alert,
  Button,
  Image,
  Text,
  View,
  KeyboardAvoidingView,
  TouchableHighlight
} = ReactNative;

class PhotoPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  _renderCalc(){
    if(this.props.item.water < this.props.item.waterRef && this.props.item.weather != 'Rain'){
      return(
        <Text>Water</Text>
      );
    }else{
      return(
      <Text>Dont water</Text>);
    }
  }
  _onPress(){
    Actions.pop();
  }
  render() {
    return (
      <View>
        <Text style={styles.liText}>{this.props.item.temperature}</Text>
        <Text style={styles.liText}>{this.props.item.water} - {this._renderCalc()}</Text>
        <Text style={styles.liText}>{this.props.item.waterRef}</Text>
        <Button
          onPress={this._onPress.bind(this)}
          title='Back'/>
      </View>
    );
  }
}
module.exports = PhotoPage;