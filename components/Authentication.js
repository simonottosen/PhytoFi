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
    this.state = { username: '', password: '', loading: false, error: '' };
  }
  userAuth() {
    this.setState({ error: '', loading: true });
    const { username, password } = this.state;
    firebase.auth().signInWithEmailAndPassword(username, password)
    .then(() => {
      this.setState({ error: '', loading: false });
      firebase.auth().currentUser.getIdToken().then(function(idToken) {
        AsyncStorage.setItem('id_token', idToken);
        console.log(idToken);
        Alert.alert( 'Sign In Successfully!', 'Click the button to go to Home Page!');
        Actions.HomePage();
      })
      .catch((err) => {
        this.setState({ error: 'Failed to obtain user ID token.'+err, loading: false });
      });
    })
    .catch((err) => {
        //Login was not successful, let's create a new account
        firebase.auth().createUserWithEmailAndPassword(username, password)
        .then(() => { 
          this.setState({ error: '', loading: false });
          firebase.auth().currentUser.getIdToken().then(function(idToken) {
            AsyncStorage.setItem('id_token', idToken);
            console.log(idToken);
            Alert.alert( 'Sign Up Successfully!', 'Click the button to go to Home Page!');
            Actions.HomePage();
          })
          .catch(() => {
            this.setState({ error: 'Failed to obtain user ID token.', loading: false });
          });
        })
        .catch((err) => {
            this.setState({ error: 'Authentication failed. '+err, loading: false });
        });
    });
  }
  renderButtonOrSpinner() {
    if (this.state.loading) {
        return <ActivityIndicator size='small' />;    
    }
    return <Button onPress={this.userAuth.bind(this)} title="Log in/Sign up" />;
  }
  render() {
<<<<<<< HEAD
<<<<<<< HEAD
=======
<<<<<<< HEAD
  //    let pics = {
  //      uri: './logo.png'
  //    };
=======
>>>>>>> 8fd493cbd2b09682859f1c600be6de4b47250486
>>>>>>> 36dea700c53d24e4798d52e842436f455d5f4a6e
  
=======
>>>>>>> parent of 06df4e7... Albert Magic 3
    return (
      <KeyboardAvoidingView style={styles.container} behavior='padding'>
<<<<<<< HEAD
            
            <Image style={{justifyContent: 'center',
           alignItems: 'center',
            width: 286, height: 160}}
            source={require('./LogoTrans.png')}
          />
=======
    return (
      <KeyboardAvoidingView style={styles.container} behavior='padding'>
        <Text style={styles.title}>Welcome</Text>
>>>>>>> parent of 06df4e7... Albert Magic 3
=======
        <Text style={styles.title}>Welcome</Text>
>>>>>>> 36dea700c53d24e4798d52e842436f455d5f4a6e

        <View style={styles.form}>
          <TitledInput
            label='Email Address'
            onChangeText={(username) => this.setState({username})}
            placeholder='Email'
            value={this.state.username}
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