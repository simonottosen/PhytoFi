import React, { Component } from 'react';
import { ActivityIndicator, Button, ListView, Text, View, Image, TextInput, TouchableHighlight, StyleSheet, AsyncStorage, Alert, KeyboardAvoidingView } from 'react-native';
import {Actions} from 'react-native-router-flux';
import * as firebase from 'firebase';
import StatusBar from './StatusBar';
import ActionButton from './ActionButton';
import ListItem from './ListItem';
import styles from '../styles';



export default class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      text: 'Copenhagen',
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,})

    };
    this.itemsRef = this.getRef().child('items');
    
  }
  getRef() {
    return firebase.database().ref();
  }
  

  componentDidMount(){
    
    this.getWeather();
  }

  getWeather() {
    
    return fetch('http://api.openweathermap.org/data/2.5/weather?q='+this.state.text+'&APPID=f873241aae3dee39adf62042e70a44c9')
      .then((response) => response.json())
      .then((responseJson) => {
        let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.setState({
          isLoading: false,
          dataSource: ds.cloneWithRows(responseJson.weather),
        }, function() {
          alert("By opdateret");
        });
      })
      .catch((error) => {
        alert("Fejl");
      });
    
  }

  render() {
    let pic = {
      uri: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg'
    };
    


    
    return (
      <View style={{paddingTop: 50}}>
        <TextInput
          style={{height: 40}}
          placeholder= {this.state.text}
          onChangeText={(text) => this.setState({text})}
          
        />

        
        <ListView
          dataSource={this.state.dataSource}
          renderRow={(rowData) => <Text>The weather today is going to be {rowData.main}.</Text>}
          
        />
        <Image source={pic} style={{width: 193, height: 110}}/>

        <Button
          onPress={this.getWeather.bind(this)}
          title="Update"
          color="#841584"
          accessibilityLabel="Learn more about this purple button"
        />
        
        
       

      </View>

  


    );
   
   
  }
}
module.exports = HomePage;
