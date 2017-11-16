import React, { Component } from 'react';
import { ActivityIndicator, ScrollView, Button, ListView, Text, View, Image, TextInput, TouchableHighlight, StyleSheet, AsyncStorage, Alert, KeyboardAvoidingView } from 'react-native';
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
      text: 'London',
      uid: '',
      reference: {}, 
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,}),
      disSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,})
    };
    this.itemsRef = this.getRef().child('items');
    this.refRef = this.getRef().child('reference');
  }
  getRef() {
    return firebase.database().ref();
  }
  
  listenForItems(that, itemsRef, refRef, weather) {
    
    itemsRef.on('value', (snap) => {
      refRef.once('value', (refs) => {
        refs.forEach((ref) => {
          that.setState({ reference: {
            fertilizer: ref.val().fertilizer,
            water: ref.val().water,
            _key: ref.key
          }});
          // get children as an array
          var items = [];
          snap.forEach((item) => {
            items.push({
              name: item.val().name,
              weather: weather,
              fertilizer: item.val().fertilizer,
              light: item.val().light,
              water: item.val().water,
              temperature: item.val().temperature,
              fertilizerRef: ref.val().fertilizer,
              waterRef: ref.val().water,
              url: item.val().url,
              _key: item.key
            });
          });
          that.setState({
            disSource: that.state.disSource.cloneWithRows(items)
          });
        });
      });
    });
  }

  componentDidMount(){
    if(this.state.text != '' && this.state.text != null){
    this.getWeather();
     }
  }

  getWeather() {
    var that = this;
    fetch('http://api.openweathermap.org/data/2.5/weather?q='+this.state.text+'&APPID=f873241aae3dee39adf62042e70a44c9')
      .then((response) => response.json())
      .then((responseJson) => {
        let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.setState({
          isLoading: false,
          dataSource: ds.cloneWithRows(responseJson.weather),
        }, function() {
        });
        that.listenForItems(that, that.itemsRef, that.refRef, responseJson.weather[0].main);
      })
      .catch((error) => {
        alert("Fejl");
      });
    
  }

  _renderItem(item) {
    const onPress = () => {
      Actions.PhotoPage({ title: item.name, item: item, uid: this.state.uid });
    };
    return (
      <ListItem item={item} onPress={onPress} />
    );
  }

  render() {
    let pic = {
      uri: 'http://images5.fanpop.com/image/photos/29400000/White-writing-29491444-516-350.jpg'
    };
    


    
    return (
      <ScrollView style={styles.boxView}>
        <TextInput 
          returnKeyLabel='Go' 
          returnKeyType='go' 
          onSubmitEditing={this.getWeather.bind(this)}
          style={{height: 40, backgroundColor: '#f2f2f2'}}
          placeholder= {"Indtast by"}
          onChangeText={(text) => this.setState({text})}
        />
         <Button style={{backgroundColor:'#fff'}}
          onPress={this.getWeather.bind(this)}
          title="Update"
          color="#841584"
          accessibilityLabel="Learn more about this purple button"
        />

        <Image source={pic} style={{width: 920, height: 50}}/>

        <ListView
          dataSource={this.state.dataSource}
          renderRow={(rowData) => <Text style={{backgroundColor: '#fff'}} >The weather in 6 hours will be {rowData.main}.</Text>}
          
        />
        <ListView
          dataSource={this.state.disSource}
          renderRow={this._renderItem.bind(this)}
        />
        <Image source={pic} style={{width: 920, height: 50}}/>
       
        
        
       

      </ScrollView>

  


    );
   
   
  }
}
module.exports = HomePage;
