import React, { Component } from 'react';
import { ActivityIndicator, ListView, Text, View, Image, TextInput } from 'react-native';

export default class Movies extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true
    }
  }

  componentDidMount() {
    return fetch('http://api.openweathermap.org/data/2.5/weather?q=Dublin&APPID=f873241aae3dee39adf62042e70a44c9')
      .then((response) => response.json())
      .then((responseJson) => {
        let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.setState({
          isLoading: false,
          dataSource: ds.cloneWithRows(responseJson.weather),
        }, function() {
          // do something with new state
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    let pic = {
      uri: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg'
    };

    if (this.state.isLoading) {
      return (
        
        <View style={{flex: 1, paddingTop: 20}}>
          <ActivityIndicator />
          
        </View>
        
      );
    }
    
    return (
      <View style={{paddingTop: 50}}>
        <TextInput
          style={{height: 40}}
          placeholder="Hej Rune! "
          onChangeText={(text) => this.setState({text})}
        />


        <ListView
          dataSource={this.state.dataSource}
          renderRow={(rowData) => <Text>The weather today is going to be {rowData.main}.</Text>}
        />
        <Image source={pic} style={{width: 193, height: 110}}/>
        
        

      </View>

      



    );

    
  }
}