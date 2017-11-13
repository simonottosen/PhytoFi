import React, {Component} from 'react';
import ReactNative from 'react-native';
const styles = require('../styles.js')
const { View, TouchableHighlight, Text } = ReactNative;

class ListItem extends Component {
  render() {
    return (
      <TouchableHighlight onPress={this.props.onPress}>
        <View style={styles.li}>
          <Text style={styles.liText}>{this.props.item.name}</Text>
          <Text style={styles.liText}>{this.props.item.weather}</Text>
          <Text style={styles.liText}>{this.props.item.fertilizer}</Text>
          <Text style={styles.liText}>{this.props.item.fertilizerRef}</Text>
          <Text style={styles.liText}>{this.props.item.light}</Text>
          <Text style={styles.liText}>{this.props.item.temperature}</Text>
          <Text style={styles.liText}>{this.props.item.water}</Text>
          <Text style={styles.liText}>{this.props.item.waterRef}</Text>
        </View>
      </TouchableHighlight>
    );
  }
}

module.exports = ListItem;