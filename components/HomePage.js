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
      uid: '',
      latitude: null,
      longitude: null,
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
      this.setState({ uid: user.uid });      
      this.listenForItems(this.itemsRef, user.type);
    });
  }
  sortArrayAsc(array, currentLat, currentLon) {
    var that = this;
    console.log(currentLat+' '+currentLon);
    return array.sort(function (a,b) {
      alat = parseFloat(a.latitude);
      blat = parseFloat(b.latitude);
      alon = parseFloat(a.longitude);
      blon = parseFloat(b.longitude);
      clat = parseFloat(currentLat);
      clon = parseFloat(currentLon);
      return that.calculateDistance(clat, clon, blat, blon) 
            > that.calculateDistance(clat, clon, alat, alon) ? -1
            : that.calculateDistance(clat, clon, blat, blon) 
            < that.calculateDistance(clat, clon, alat, alon) ? 1
            : 0
    })
  }
  degreesToRadians(degrees) {
    return degrees * Math.PI / 180;
  }
  calculateDistance(lat1, lon1, lat2, lon2) {
    var earthRadiusKm = 6371;
  
    var dLat = this.degreesToRadians(lat2-lat1);
    var dLon = this.degreesToRadians(lon2-lon1);
  
    lat1 = this.degreesToRadians(lat1);
    lat2 = this.degreesToRadians(lat2);

    var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    
    console.log(earthRadiusKm * c);
    return earthRadiusKm * c;
  }
  averageRating(ratings) {
    var average = 0;
    var total = 0;
    var count = 0;
    for(var key in ratings){
      if (ratings.hasOwnProperty(key)) {
        total += parseFloat(ratings[key].rating);
        count += 1;
        average = total/count;
      }
    }
    return average;
  }
  listenForItems(itemsRef, type) {
    itemsRef.on('value', (snap) => {
      // get children as an array
      var items = [];
      snap.forEach((child) => {
        if(this.props.actorId == null || this.props.actorId === child.key){
          child.forEach((item) => {
            items.push({
              disname: item.val().disname,
              type: item.val().type,
              title: item.val().title,
              rating: this.averageRating(item.val().ratings),
              latitude: item.val().latitude,
              longitude: item.val().longitude,
              url: item.val().url,
              uid: child.key,
              _key: item.key
            });
          });
        }
      });
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(items)
      });
      // navigator.geolocation.getCurrentPosition(
      //   (position) => {
      //     items = this.sortArrayAsc(items, position.coords.latitude, position.coords.longitude);
      //     this.setState({
      //       latitude: position.coords.latitude,
      //       longitude: position.coords.longitude,
      //       dataSource: this.state.dataSource.cloneWithRows(items)
      //     });
      //   },
      //   (error) => console.error(error),
      //   { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
      // );
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
      Actions.PhotoPage({ title: item.title, item: item, uid: this.state.uid });
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