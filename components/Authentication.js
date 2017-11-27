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
  Image,
  View,
  KeyboardAvoidingView
} = ReactNative;

class Authentication extends Component {
  constructor() {
    super();
    this.state = { username: '', password: '', city: '', uid: '', loading: false, error: '' };
    this.profRef = firebase.database().ref().child('profile');
  }
  
  userAuth() {
    var that = this; 
    this.setState({ error: '', loading: true });
    const { username, password, city } = this.state;
    firebase.auth().signInWithEmailAndPassword(username, password)
    .then(() => {
      this.setState({ error: '', loading: false });
      var currentUser = firebase.auth().currentUser;
      currentUser.getIdToken().then(function(idToken) {
        that.setState({uid: currentUser.uid});
        AsyncStorage.setItem('id_token', idToken);
        that.updateProfile(that);
      })
      .catch((err) => {
        this.setState({ error: 'Failed to obtain user ID token.'+err, loading: false });
      });
    })
    .catch((err) => {
        //Login was not successful, let's create a new account
        firebase.auth().createUserWithEmailAndPassword(username, password)
        .then(() => {
          var currentUser = firebase.auth().currentUser;
          this.setState({ error: '', loading: false });
          firebase.auth().currentUser.getIdToken().then(function(idToken) {
            that.setState({uid: currentUser.uid});
            AsyncStorage.setItem('id_token', idToken);
            that.updateProfile(that);
          })
          .catch(() => {
            this.setState({ error: 'Failed to obtain user ID token.'+err, loading: false });
          });
        })
        .catch((err) => {
            this.setState({ error: 'Authentication failed. '+err, loading: false });
        });
        
    });
  }
  updateProfile(that) {
    that.setState({ loading: true });
    var data = {
      city: that.state.city
    };
    that.profRef.child(that.state.uid).once('value', function(snapshot) {
      if(snapshot.val() === null){
        if(that.state.city == ''){
          data.city == 'Copenhagen';
        }
        that.profRef.child(that.state.uid).set(data);
        that.setState({ loading: false });
      }else{
        if(that.state.city != ''){
          that.profRef.child(that.state.uid).update(data)
          .then(() => {
            that.setState({ loading: false });
          })
          .catch((err) => {
            console.log(err);
            that.setState({
              loading: false
            });
          });
        }else{
          data.city = snapshot.val().city;
        }
      }
      Alert.alert( 'Sign In Successfully!', 'Click the button to go to Home Page!');
      Actions.HomePage({city: data.city});
    })
    .catch(err => console.error(err));
  }
  renderButtonOrSpinner() {
    if (this.state.loading) {
        return <ActivityIndicator size='small' />;    
    }
    return <Button onPress={this.userAuth.bind(this)} title="Log in/Sign up" />;
  }
  render() {
  
    return (
      <KeyboardAvoidingView style={styles.container} behavior='padding'>
        

         <Image style={{justifyContent: 'center',
        alignItems: 'center',
         width: 286, height: 160}}
         source={require('./LogoTrans.png')}
       /> 

        <View style={styles.form}>
          <TitledInput
            label='Email Address'
            onChangeText={(username) => this.setState({username})}
            placeholder='Username'
            value={this.state.username}
          />

          <TitledInput
            label='Password'
            onChangeText={(password) => this.setState({password})}
            placeholder='Password'
            secureTextEntry
            value={this.state.password}
          />

          <TitledInput
            label='City'
            onChangeText={(city) => this.setState({city})}
            placeholder='City'
            value={this.state.city}
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