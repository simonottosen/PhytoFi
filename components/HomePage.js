import React, { Component } from 'react';
import { ActivityIndicator, ScrollView, Button, ListView, Text, View, Image, TouchableOpacity, TextInput, TouchableHighlight, StyleSheet, AsyncStorage, Alert, KeyboardAvoidingView } from 'react-native';
import {Actions} from 'react-native-router-flux';
import * as firebase from 'firebase';
import ActionButton from './ActionButton';
import ListItem from './ListItem';
import styles from '../styles';
import * as Progress from 'react-native-progress';
import SVGImage from 'react-native-svg-image';




export default class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      text: "Porto",
      //      text: props.city,
      uid: '',
      weather:'',
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
              lightRef: ref.val().light,
              water: item.val().water,
              temperature: item.val().temperature,
              fertilizerRef: ref.val().fertilizer,
              waterRef: ref.val().water,
              temperatureRef: ref.val().temperature,
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
          weather: responseJson.weather[0].main,
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
      Actions.Plants({ title: item.name, item: item, uid: this.state.uid });
    };
    return (
      <ListItem item={item} onPress={onPress} />
    );
  }

  userLogout() {
    AsyncStorage.removeItem('user').then(() => {
      firebase.auth().signOut()
      .then(() => {
        Alert.alert('Log Out Successfully!');
        Actions.Authentication();
      })
      .catch((error) => {
        console.log('Signout error: ' + error.message);
      });
    });
  }

  _renderIconWeather() {
    if(this.state.weather == 'Clear'){
      return(
        <TouchableOpacity onPress={() => {Alert.alert("The weather in 6 hours in " + this.state.text, "All clear and sunny!")}} rejectResponderTermination>
        <Image style={styles.image}
          source={require('./sunny.png')}
        /> 
      </TouchableOpacity>
      );
    }
    else if(this.state.weather == 'Rain'){
      return(
        <TouchableOpacity onPress={() => {Alert.alert("The weather in 6 hours in " + this.state.text, "It's going to rain!", )}} rejectResponderTermination>
          <Image style={styles.image}
            source={require('./rain.png')}
          /> 
        </TouchableOpacity>
      );
    }
    else
    return(
      <TouchableOpacity onPress={() => {Alert.alert("The weather in 6 hours in " + this.state.text, "It's a bit cloudy, but not rainy.")}} rejectResponderTermination>
      <Image style={styles.image}
        source={require('./cloud.png')}
      /> 
    </TouchableOpacity>
    );
  }

  _renderIconInfo(){
    return(
        <TouchableOpacity onPress={() => {Alert.alert("Info", "We're measuring the plant on a scale from 1 to 10, and compare the number to the reference on the perfect conditions for the plant." )}} rejectResponderTermination>
          <Image style={styles.imageInfo}
            source={require('./info.png')}
          /> 

        </TouchableOpacity>

    );
  }


  render() {
    return (

<View style={{flex: 1}}>
  

<View style={{paddingTop:20, paddingLeft:0,   flexDirection: 'row',
  flexWrap: 'wrap'
}}>

<View style={{paddingLeft:13,}}>{this._renderIconInfo()}</View>
<Image style={{justifyContent: 'center', marginLeft:80,
        alignItems: 'center',
         width: 143, height: 80,  paddingRight: 50,  paddingLeft:100,}}
         source={require('./LogoTrans.png')}
       /> 
       


{this._renderIconWeather()}

{/* <TextInput 
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
/> */}



</View>



      <ScrollView style={styles.boxView}>
        


        {/* <ListView 
          dataSource={this.state.dataSource}
          renderRow={(rowData) => <Text style={{backgroundColor: '#fff'}} >The weather in  {this.state.text} 6 hours will be {rowData.main}.</Text>}
        /> */}

        <ListView style={styles.container}
          dataSource={this.state.disSource}
          renderRow={this._renderItem.bind(this)}

        />
       

        
       

      </ScrollView>
      <Button onPress={this.userLogout.bind(this)} title="Log Out" />

      </View>


    );
   
   
  }
}
module.exports = HomePage;