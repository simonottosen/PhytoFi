import React, {Component} from 'react';
import ReactNative from 'react-native';
import {Actions} from 'react-native-router-flux';
import * as firebase from 'firebase';
import StatusBar from './StatusBar';
import ActionButton from './ActionButton';
import ListItem from './ListItem';
import styles from '../styles';
const {
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
<<<<<<< HEAD
      type: '',
=======
>>>>>>> parent of aa89d91... Copy of Final project
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      })
    };
    this.itemsRef = this.getRef().child('items');
  }
  getRef() {
    return firebase.database().ref();
  }
<<<<<<< HEAD
  componentDidMount() {
    AsyncStorage.getItem('user').then((userString) => {
      let user = JSON.parse(userString);
      this.setState({ type: user.type });      
      this.listenForItems(this.itemsRef, user.type);
    });
  }
  listenForItems(itemsRef, type) {
=======
  listenForItems(itemsRef) {
>>>>>>> parent of aa89d91... Copy of Final project
    itemsRef.on('value', (snap) => {

      // get children as an array
      var items = [];
      snap.forEach((child) => {
<<<<<<< HEAD
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
=======
        items.push({
          title: child.val().title,
          _key: child.key
>>>>>>> parent of aa89d91... Copy of Final project
        });
      });

      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(items)
      });
<<<<<<< HEAD
=======

>>>>>>> parent of aa89d91... Copy of Final project
    });
  }
  componentDidMount() {
    this.listenForItems(this.itemsRef);
  }
  render() {
    return (
      <KeyboardAvoidingView style={styles.listContainer} behavior="padding" >
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this._renderItem.bind(this)}
          enableEmptySections={true}
          style={styles.listview}/>
        <TextInput
          style={{height: 40}}
          placeholder="Type here to add!"
          onChangeText={(text) => this.setState({text})}
        />
        <ActionButton onPress={this._addItem.bind(this)} title="Add" />

      </KeyboardAvoidingView>
    )
  }
  _addItem() {
    this.itemsRef.push({ title: this.state.text });
  }
  _renderItem(item) {
    const onPress = () => {
<<<<<<< HEAD
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
=======
      Alert.alert(
        'Delete: '+item.title+'?',
        null,
        [
          {text: 'Yes', onPress: (text) => this.itemsRef.child(item._key).remove()},
          {text: 'Cancel', onPress: (text) => console.log('Cancelled')}
        ],
        {cancelable: false}
      );
>>>>>>> parent of aa89d91... Copy of Final project
    };

    return (
      <ListItem item={item} onPress={onPress} />
    );
  }
}
module.exports = HomePage;