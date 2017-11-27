import React, {Component} from 'react';
import ReactNative from 'react-native';
import {Actions} from 'react-native-router-flux';
import * as firebase from 'firebase';
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

class Plants extends Component {
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
      <View style={{paddingTop:50,  padding: 40,  margin: 10, justifyContent: 'center', alignItems: 'center' }}>
      <Image 
            style={styles.liImg}
            source={{uri: this.props.item.url}}
          />
        <Text style={styles.liText}> Temperaturen på denne plante er {this.props.item.temperature} på en skala fra 0 til 10.</Text>
        <Text style={styles.liText}>{this.props.item.water} - {this._renderCalc()}</Text>
        <Text style={styles.liText}>{this.props.item.waterRef}</Text>

        <Button
          onPress={this._onPress.bind(this)}
          title='Back'/>
      </View>
    );
  }
}
module.exports = Plants;