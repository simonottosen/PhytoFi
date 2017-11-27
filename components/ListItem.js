import React, {Component} from 'react';
import ReactNative, { Alert } from 'react-native';
const styles = require('../styles.js')
const { View, ListView, TouchableHighlight, Text, Image } = ReactNative;

class ListItem extends Component {
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
  render() {
    return (
      <TouchableHighlight onPress={this.props.onPress}>
        <View style={styles.li}>
          <Text style={styles.title}>{this.props.item.name}</Text>
          <Image 
            style={styles.liImg}
            source={{uri: this.props.item.url}}
          />
          {/* <Text style={styles.liText}>{this.props.item.weather}</Text>
          <Text style={styles.liText}>{this.props.item.fertilizer}</Text>
          <Text style={styles.liText}>{this.props.item.fertilizerRef}</Text>
          <Text style={styles.liText}>{this.props.item.light}</Text> */}
          <Text style={styles.liText}>{this.props.item.temperature}</Text>
          <Text style={styles.liText}>{this.props.item.water} - {this._renderCalc()}</Text>
          <Text style={styles.liText}>{this.props.item.waterRef}</Text>
        </View>
      </TouchableHighlight>

     
      
    );
  }
}

module.exports = ListItem;