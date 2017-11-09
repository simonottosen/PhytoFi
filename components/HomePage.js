import React, {Component} from 'react';
import ReactNative from 'react-native';
import {Actions} from 'react-native-router-flux';
import * as firebase from 'firebase';
import StatusBar from './StatusBar';
import ActionButton from './ActionButton';
import ListItem from './ListItem';
import styles from '../styles';
const {
  AsyncStorage,
  ListView,
  StyleSheet,
  TextInput,
  Text,
  View,
  KeyboardAvoidingView,
  TouchableHighlight,
  Alert
} = ReactNative;

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: '',
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      })
    };
    this.itemsRef = this.getRef().child('offerings');
  }
  getRef() {
    return firebase.database().ref();
  }
  componentDidMount() {
    AsyncStorage.getItem('user').then((userString) => {
      let user = JSON.parse(userString);
      this.setState({ type: user.type });      
      this.listenForItems(this.itemsRef, user.type);
    });
  }
  listenForItems(itemsRef, type) {
    itemsRef.on('value', (snap) => {

      // get children as an array
      var items = [];
      snap.forEach((child) => {
        child.forEach((item) => {
          console.log(type+' '+item.val().type);
          if(type != item.val().type){
            items.push({
              disname: item.val().disname,
              type: item.val().type,
              title: item.val().title,
              url: item.val().url,
              _key: item.key
            });
          }
        });
      });
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(items)
      });
    });
  }
  render() {
    return (
      <KeyboardAvoidingView style={styles.listContainer} behavior="padding" >
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this._renderItem.bind(this)}
          enableEmptySections={true}
          style={styles.listview}/>
        {/* <TextInput
          style={{height: 40}}
          placeholder="Type here to add!"
          onChangeText={(text) => this.setState({text})}
        />
        <ActionButton onPress={this._addItem.bind(this)} title="Add" /> */}
      </KeyboardAvoidingView>
    )
  }
  _addItem() {
    this.itemsRef.push({ title: this.state.text });
  }
  _renderItem(item) {
    const onPress = () => {
      Actions.PhotoPage({ title: item.title, item: item });
      // Alert.alert(
      //   'Delete: '+item.title+'?',
      //   null,
      //   [
      //     {text: 'Yes', onPress: (text) => this.itemsRef.child(item._key).remove()},
      //     {text: 'Cancel', onPress: (text) => console.log('Cancelled')}
      //   ],
      //   {cancelable: false}
      // );
    };

    return (
      <ListItem item={item} onPress={onPress} />
    );
  }
}
module.exports = HomePage;