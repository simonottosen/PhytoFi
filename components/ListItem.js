import React, {Component} from 'react';
import ReactNative from 'react-native';
const styles = require('../styles.js')
const { View, TouchableHighlight, Text } = ReactNative;

class ListItem extends Component {
  render() {
    return (
      <TouchableHighlight onPress={this.props.onPress}>
        <View style={styles.li}>
<<<<<<< HEAD
          <Image 
            style={styles.liImg}
            source={{uri: this.props.item.url}}
          />
          <Text style={styles.liText}>{this.props.item.disname}</Text>
=======
          <Text style={styles.liText}>{this.props.item.title}</Text>
>>>>>>> parent of aa89d91... Copy of Final project
        </View>
      </TouchableHighlight>
    );
  }
}

module.exports = ListItem;