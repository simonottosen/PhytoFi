import React, {Component} from 'react';
import ReactNative from 'react-native';
import {Actions} from 'react-native-router-flux';
import * as firebase from 'firebase';
import styles from '../styles';
const {
  Alert,
  AsyncStorage,
  ActivityIndicator,
  Button,
  StyleSheet,
  TextInput,
  Text,
  View,
  KeyboardAvoidingView
} = ReactNative;

class Authentication extends Component {
  constructor() {
    super();
    this.state = { 
      loading: false,
      email: '',
      password: '',
      disname: '',
      gender: 'unknown',
      type: 'buyer',
      uid: '',
      error: '',
    };
    this.proRef = firebase.database().ref().child('profiles');
  }
  userAuth() {
    this.setState({ error: '', loading: true });
    const { email, password } = this.state;
    console.log('email: '+email);
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then(() => {
      var user = firebase.auth().currentUser;
      this.listenForProfile(this.proRef.child(user.uid));
      this.setState({ error: '', loading: false });
    })
    .catch((err) => {
      //Login was not successful, let's create a new account
      firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(() => { 
        this.setState({ error: '', loading: false });
        this.createProfile(this.proRef);
      })
      .catch((err) => {
          this.setState({ error: 'Authentication failed. '+err, loading: false });
      });
    });
  }
  listenForProfile(proRef) {
    proRef.once('value', (snap) => {
      this.setState({
        loading: false,
        error: ''
      });
      var user = {
        disname: snap.val().disname,
        gender: snap.val().gender,
        type: snap.val().type,
        uid: snap.key,
        token: ''
      };
      firebase.auth().currentUser.getIdToken().then(function(idToken) {
        user.token = idToken;
        AsyncStorage.setItem('user', JSON.stringify(user));
        Alert.alert( 'Sign In Successfully!', 'Click the button to go to Home Page!');
        Actions.Tabbar();
      })
      .catch((err) => {
        this.setState({ error: 'Failed to obtain user ID token.'+err, loading: false });
      });
    });
  }
  createProfile(proRef) {
    var user = {
      disname: '',
      gender: 'unknown',
      type: 'buyer',
      uid: '',
      token: ''
    };
    var currentUser = firebase.auth().currentUser;
    currentUser.getIdToken().then(function(idToken) {
      user.token = idToken;
      user.uid = currentUser.uid;
      user.disname = currentUser.email;
      proRef.child(user.uid).set({
        disname: user.disname,
        gender: user.gender,
        type: user.type
      });
      AsyncStorage.setItem('user', JSON.stringify(user));
      Alert.alert( 'Sign Up Successfully!', 'Click the button to go to Home Page!');
      Actions.Tabbar();
    })
  }
  renderButtonOrSpinner() {
    if (this.state.loading) {
        return <ActivityIndicator size='small' />;    
    }
    return <Button onPress={this.userAuth.bind(this)} title="Log in" />;
  }
  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior='padding'>
        <Text style={styles.title}>Welcome</Text>

        <View style={styles.form}>
          <TitledInput
            label='Email Address'
            onChangeText={(email) => this.setState({email})}
            placeholder='Username'
            value={this.state.email}
          />

          <TitledInput
            label='Password'
            onChangeText={(password) => this.setState({password})}
            placeholder='Password'
            secureTextEntry
            value={this.state.password}
          />
          <Text style={styles.errorTextStyle}>{this.state.error}</Text>
          {this.renderButtonOrSpinner()}
        </View>
      </KeyboardAvoidingView>
    );
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
module.exports = Authentication;