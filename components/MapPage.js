import React, {Component} from 'react';
import ReactNative from 'react-native';
import {Actions} from 'react-native-router-flux';
import * as firebase from 'firebase';
import MapView from 'react-native-maps';
import { Icon } from 'react-native-elements';
import StatusBar from './StatusBar';
import styles from '../styles';
import markerImg from './imgs/human-pin-s.png';
const {
  ActivityIndicator,
  Alert,
  Animated,
  AsyncStorage,
  Image,
  Text,
  View,
  KeyboardAvoidingView
} = ReactNative;

class MapPage extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      loading: false,
      uid: '',
      disname: '',
      type: '',
      watchId: null,
      region: {
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.00922*0.5,
        longitudeDelta: 0.00421*0.5
      },
      polylineCoords: [],
      actors: []
    };
    this.coordRef = firebase.database().ref().child('actors');
  }
  componentDidMount() {
    this.getLocation();
    this.listenForActors();
    AsyncStorage.getItem('user').then((userString) => {
      let user = JSON.parse(userString);
      this.setState({ uid: user.uid, disname: user.disname, type: user.type });
    });
  }
  componentWillUnmount() {
    if(this.state.watchId !== null){
      navigator.geolocation.clearWatch(this.state.watchId);
      this.setState({watchId: null, polylineCoords: []});
    }
  }
  getLocation() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log(position);
        let region = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: 0.00922*0.5,
          longitudeDelta: 0.00421*0.5
        }
        this.onRegionChange(region);
      },
      (error) => console.error(error),
      { enableHighAccuracy: true, timeout: 30000, maximumAge: 1000 },
    );
  }
  findActor(key, actors){
    for (var i=0; i < actors.length; i++) {
      if (actors[i]._key === key) {
        return JSON.parse(JSON.stringify(actors[i]));
      }
    }
    return null;
  }
  listenForActors() {
    this.coordRef.on('value', (snap) => {
      var items = [];
      snap.forEach((item) => {
        var actor = this.findActor(item.key, this.state.actors);
        if(actor === null){
          items.push({
            disname: item.val().disname,
            type: item.val().type,
            coordinate: {
              latitude: item.val().latitude,
              longitude: item.val().longitude
            },
            coordinates: [
              {
                latitude: item.val().latitude,
                longitude: item.val().longitude
              }
            ],
            _key: item.key
          });
        }else if(actor.coordinate.latitude !== item.val().latitude || actor.coordinate.longitude !== item.val().longitude){
          actor.coordinates.push({
              latitude: item.val().latitude,
              longitude: item.val().longitude
          });
          actor.coordinate = {
            latitude: item.val().latitude,
            longitude: item.val().longitude
          }
          items.push(
            actor
          )
        }else{
          items.push(
            actor
          )
        }
      });
      this.setState({
        actors: items
      });
    });
  }
  onRegionChange(region) {
    this.setState({ region });
  }
  watchPosition() {
    if(this.state.watchId === null){
      var watchId = navigator.geolocation.watchPosition(
        (position) => {
          let region = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: this.state.region.latitudeDelta,
            longitudeDelta: this.state.region.longitudeDelta
          }
          this.onRegionChange(region);
          const { polylineCoords } = this.state;
          this.setState({
            polylineCoords: [...polylineCoords, position.coords]
          });
          this.updateCoord(position.coords);
        },
        (error) => this.setState({ error: error.message }),
        { enableHighAccuracy: true, timeout: 20000, maximumAge: 10, distanceFilter: 1 },
      );
      this.setState({ watchId: watchId });
    }else{
      navigator.geolocation.clearWatch(this.state.watchId);
      this.setState({watchId: null, polylineCoords: []});
    }
  }
  updateCoord(coords) {
    this.setState({ loading: true });
    var that = this;
    var data = {
      disname: this.state.disname,
      type: this.state.type,
      latitude: coords.latitude,
      longitude: coords.longitude
    };
    this.coordRef.child(this.state.uid).once('value', function(snapshot) {
      if(snapshot.val() === null){
        that.coordRef.child(that.state.uid).set(data);
        that.setState({ loading: false });
      }else{
        that.coordRef.child(that.state.uid).update(data)
        .then(() => {
          that.setState({ loading: false });
        })
        .catch((err) => {
          console.log(err);
          that.setState({
            loading: false
          });
        });
      }
    })
    .catch(err => console.error(err));
  }
  viewList(actorId) {
    Actions.HomePage({actorId: actorId});
  }
  render() {
    return (
      <View style ={styles.preview}>
        <MapView
          style={styles.map}
          region={this.state.region}
          onRegionChange={this.onRegionChange.bind(this)}
        >
        {this.state.actors.map(marker => (
          <MapView.Marker
            coordinate={marker.coordinate}
            image={markerImg}
            title={marker.disname}
            description={marker.type}
            onCalloutPress={() => this.viewList(marker._key)}
          >
          </MapView.Marker>
        ))}
        {this.state.actors.map(marker => (
          <MapView.Polyline
            key={marker._key}
            coordinates={marker.coordinates}
            strokeColor='rgba(0,153,204,0.5)'
            fillColor='rgba(255,0,0,0.5)'
            strokeWidth={5}
          />
        ))}
          <MapView.Polyline
            key={1}
            coordinates={this.state.polylineCoords}
            strokeColor='rgba(0,153,204,0.5)'
            fillColor='rgba(255,0,0,0.5)'
            strokeWidth={5}
          />
        </MapView>
        <Icon 
          name={(this.state.watchId === null) ? 'walk' : 'human-male'}
          type='material-community'
          color='#333333'
          style={styles.capture}
          onPress={this.watchPosition.bind(this)}/>
      </View>
    )
  }
}
module.exports = MapPage;