import React, {Component} from 'react';
import ReactNative, { Alert } from 'react-native';
import * as Progress from 'react-native-progress';

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
      <Text>Don't water</Text>);
      
    }

  }
  _renderBar(){
    if(this.props.item.water < this.props.item.waterRef && this.props.item.weather != 'Rain'){
      return(
        <Progress.Bar progress={this.props.item.water / 10} width={150} size={20} height={10} margin={5} color={'red'} />
      );
    }else{
      return(
        <Progress.Bar progress={this.props.item.water / 10} width={150} size={20} height={10} margin={5} color={'blue'} />);
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
          <Text style={styles.liText}>{this.props.item.light}</Text>
           <Text style={styles.liText}>{this.props.item.temperature}</Text> 
          <Text style={styles.liText}>{this.props.item.water} </Text>*/}
            <Text style={{ fontSize: 12, textAlign: 'center'}}> {this._renderCalc()} your plants.</Text>
          {/* <Text style={styles.liText}>{this.props.item.waterRef}</Text>  */}
           <Text style={{fontWeight: 0.4, fontSize: 16, textAlign: 'center'}}> {"\n"}Waterlevel </Text>

          <View style={{alignItems:'center'}}>{this._renderBar()}</View>
        </View>
      </TouchableHighlight>

     
      
    );
  }
}

module.exports = ListItem;