import React, {Component} from 'react';
import ReactNative from 'react-native';
import {Actions} from 'react-native-router-flux';
import * as firebase from 'firebase';
import Camera from 'react-native-camera';
import { Icon } from 'react-native-elements';
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
  constructor(props) {
    super(props);
    this.state = { loading: false };
    this.fireRef = firebase.storage().ref('photos');
    this.photoRef = firebase.database().ref().child('offerings');
  }
  confirmRemove() {
    this.setState({ loading: true });
    Alert.alert(
      'Delete: '+this.props.item.title+'?',
      null,
      [
        {text: 'Yes', onPress:
        (text) => 
        {
          this.photoRef.child(this.props.item._key).remove();
          this.fireRef.child(this.props.item.title).delete().then(function() {
            Actions.HomePage();
          }).catch(function(error) {
            console.log(error.message);
          });
        }},
        {text: 'Cancel', onPress: (text) => console.log('Cancelled')}
      ],
      {cancelable: false}
    );
  }
  renderIconOrSpinner() {
    if (this.state.loading) {
        return <ActivityIndicator size='small' color='#FFF' />;    
    }
    return <Icon 
      name='delete'
      type='material-community'
      color='#333333'
      style={styles.photoButton}
      onPress={this.confirmRemove.bind(this)}
    />;
  }
  render() {
    return (
      <View style={styles.panelContrainer}>
        <Image
          source={{ uri: this.props.item.url }}
          style={styles.preview}
        />
        <View style={styles.photoButtons}>
          <Icon 
              name='backspace'
              type='material-community'
              color='#333333'
              style={styles.photoButton}
              onPress={Actions.pop}/>
          {this.renderIconOrSpinner()}
        </View>
      </View>
    )
  }
}
module.exports = PhotoPage;