import React, {Component} from 'react';
import ReactNative from 'react-native';
import * as firebase from 'firebase';
import { Icon } from 'react-native-elements';
import StatusBar from './StatusBar';
import styles from '../styles';
const {
  AsyncStorage,
  ActivityIndicator,
  Alert,
  Button,
  Image,
  Picker,
  Text,
  TextInput,
  View,
  KeyboardAvoidingView,
  TouchableHighlight
} = ReactNative;

class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      loading: false,
      email: '',
      disname: '',
      gender: 'unknown',
      type: 'buyer',
      uid: '',
      error: '',
    };
    this.proRef = firebase.database().ref().child('profiles');
  }
  componentDidMount() {
    let user = firebase.auth().currentUser;
    this.listenForProfile(this.proRef.child(user.uid));
    this.setState({ email: user.email, uid: user.uid });
  }
  listenForProfile(proRef) {
    proRef.on('value', (snap) => {
      this.setState({
        loading: false,
        disname: snap.val().disname,
        gender: snap.val().gender,
        type: snap.val().type,
        uid: snap.key
      });
    });
  }
  updateProfile() {
    this.setState({ loading: true });
    this.proRef.child(this.state.uid).update({
      disname: this.state.disname,
      gender: this.state.gender,
      type: this.state.type
    })
    .then(() => {
      this.setState({ loading: false });
      var user = {
        disname: this.state.disname,
        gender: this.state.gender,
        type: this.state.type,
        uid: this.state.uid,
        token: ''
      };
      firebase.auth().currentUser.getIdToken().then(function(idToken) {
        user.token = idToken;
        AsyncStorage.setItem('user', JSON.stringify(user));
        Alert.alert( 'Update Successful!');
      })
      .catch((err) => {
        this.setState({ error: 'Failed to obtain user ID token.'+err, loading: false });
      });
    })
    .catch((err) => {
      this.setState({ 
        error: 'Update failed. '+err,
        loading: false
      });
    });
  }
  renderButtonOrSpinner() {
    if (this.state.loading) {
        return <ActivityIndicator size='small' />;    
    }
    return <Button onPress={this.updateProfile.bind(this)} title="Update Profile" />;
  }
  render() {
    return(
      <KeyboardAvoidingView style={styles.container} behavior='padding'>
        <View style={styles.form}>
          <TitledInput
            label='Email Address'
            onChangeText={(email) => this.setState({email})}
            placeholder='Email'
            value={this.state.email}
          />
          <TitledInput
            label='Display Name'
            onChangeText={(disname) => this.setState({disname})}
            placeholder='User Name'
            value={this.state.disname}
          />
          <Text style={styles.labelStyle}>{'Gender'.toUpperCase()}</Text>
          <Picker
            selectedValue={this.state.gender}
            onValueChange={(itemValue, itemIndex) => this.setState({gender: itemValue})}>
            <Picker.Item label="Male" value="male" />
            <Picker.Item label="Female" value="female" />
            <Picker.Item label="Unknown" value="unknown" />
          </Picker>
          <TitledInput
            label='User Type'
            onChangeText={(type) => this.setState({type})}
            placeholder='User Type'
            value={this.state.type}
          />
          <Text style={styles.errorTextStyle}>{this.state.error}</Text>
          {this.renderButtonOrSpinner()}
        </View>
      </KeyboardAvoidingView>
    )
  }
}
const TitledInput = ({ label, value, onChangeText, placeholder, secureTextEntry }) => {
  
  const { inputStyle, labelStyle, containerStyle } = styles;

  return (
      <View style={containerStyle}>
          <Text style={labelStyle}>{label.toUpperCase()}</Text>
          <TextInput
          autoCorrect={false}
          placeholder={placeholder}
          secureTextEntry={secureTextEntry}
          value={value}
          onChangeText={onChangeText}
          style={inputStyle}
          editable={true}
          returnKeyType='next'
        />
      </View>
  );
};
module.exports = UserProfile;