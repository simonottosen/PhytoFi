import React, {Component} from 'react';
import ReactNative from 'react-native';
const styles = require('../styles.js')
const { Image, View, TouchableHighlight, Text } = ReactNative;

class ListItem extends Component {
  render() {
    return (
      <TouchableHighlight onPress={this.props.onPress}>
        <View style={styles.li}>
          <Image 
            style={styles.liImg}
            source={{uri: this.props.item.url}}
          />
          <Text style={styles.liText}>{this.props.item.disname}</Text>
        </View>
      </TouchableHighlight>
    );
  }
}
module.exports = ListItem;