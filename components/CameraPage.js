import React, {Component} from 'react';
import ReactNative from 'react-native';
import {Actions} from 'react-native-router-flux';
import * as firebase from 'firebase';
import RNFetchBlob from 'react-native-fetch-blob';
import Camera from 'react-native-camera';
import { Icon } from 'react-native-elements';
import StatusBar from './StatusBar';
import styles from '../styles';
const {
  ActivityIndicator,
  Alert,
  AsyncStorage,
  Image,
  Text,
  View,
  KeyboardAvoidingView,
  TouchableHighlight
} = ReactNative;
const fs = RNFetchBlob.fs;
const Blob = RNFetchBlob.polyfill.Blob;
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
window.Blob = Blob

class CameraPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uid: '',
      disname: '',
      type: '',
      path: null,
      barcode: null,
      barcodeType: null,
      progress: 100,
      latitude: null,
      longitude: null
    };
    this.fireRef = firebase.storage().ref('photos');
    this.photoRef = firebase.database().ref().child('offerings');
  }
  componentDidMount() {
    this.getLocation();
    AsyncStorage.getItem('user').then((userString) => {
      let user = JSON.parse(userString);
      this.setState({ uid: user.uid, disname: user.disname, type: user.type });
      console.log('uid is: '+user.uid);
    });
  }
  getLocation() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        });
      },
      (error) => console.error(error),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );
  }
  uploadPhoto() {
    let pathArray = this.state.path.split('/');
    let firename = '/'+pathArray[pathArray.length-1];
    let rnfbURI = RNFetchBlob.wrap(this.state.path);

    Blob.build(rnfbURI, { type : 'image/jpg;'})
    .then((blob) => {      
      var uploadTask = this.fireRef.child(firename).put(blob, { contentType : 'image/jpg' });
      
      uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, (snapshot) => {
        this.setState({ progress: (snapshot.bytesTransferred / snapshot.totalBytes) * 100 });
      
        switch (snapshot.state) {
          case firebase.storage.TaskState.SUCCESS: // or 'success'
            console.log('Upload is complete');
            break;
          case firebase.storage.TaskState.RUNNING: // or 'running'
            console.log('Upload is running');
            break;
          default:
            console.log(snapshot.state);
        }
      }, (error) => {
        console.error(error);
      }, () => {
        this.setState({ path: null, progress: 100 });
        this.photoRef.child(this.state.uid).push({ 
          title: firename, 
          url: uploadTask.snapshot.downloadURL,
          uid: this.state.uid,
          disname: this.state.disname, 
          type: this.state.type,
          ratings: {},
          latitude: this.state.latitude,
          longitude: this.state.longitude });
      });
    })
    .catch(err => console.error(err));
  }
  takePicture() {
    this.camera.capture()
      .then((data) => {
        this.setState({ photo: data, path: data.path });
      })
      .catch(err => console.error(err));
  }
  renderUpload() {
    if (this.state.progress !== 100) {
      return <ActivityIndicator size='small' color='#FFF'/>;    
    }
    return <Icon 
    name='cloud-upload'
    type='material-community'
    color='#333333'
    style={styles.photoButton}
    onPress={this.uploadPhoto.bind(this)}/>;
  }
  renderCamera(){
    return (
      <Camera
        ref={(cam) => {
          this.camera = cam;
        }}
        style={styles.preview}
        aspect={Camera.constants.Aspect.fill}
        playSoundOnCapture={false}
        captureTarget={Camera.constants.CaptureTarget.disk}
        onBarCodeRead={this._onBarCodeRead.bind(this)}
      >
        <Icon 
          name='camera-iris'
          type='material-community'
          color='#333333'
          style={styles.capture}
          onPress={this.takePicture.bind(this)}/>
      </Camera>
    );
  }
  renderImage() {
    return (
      <View>
        <Image
          source={{ uri: this.state.path }}
          style={styles.preview}
        />
        <View style={styles.photoButtons}>
          {this.renderUpload()}
          <Icon 
              name='cancel'
              type='material-community'
              color='#333333'
              style={styles.photoButton}
              onPress={() => this.setState({ path: null })}/>
        </View>
      </View>
    );
  }
  _onBarCodeRead(e) {
    this.setState({ barcode: e.data, barcodeType: e.type });
  }
  renderBarCodeInfo() {
    return (
      <View>
        <Text>Barcode Found!</Text>
        <Text>{this.state.barcode}</Text>
        <Text>{this.state.barcodeType}</Text>
        <Icon 
              name='cancel'
              type='material-community'
              color='#333333'
              style={styles.photoButton}
              onPress={() => this.setState({ barcode: null, barcodeType: null })}/>
      </View>
    )
  }
  selectPage(){
    if(this.state.path){
      return this.renderImage();
    }else if(this.state.barcode){
      return this.renderBarCodeInfo();
    }else{
      return this.renderCamera();
    }
  }  
  render() {
    return (
      <View style={styles.panelContrainer}>
        {this.selectPage()}
      </View>
    )
  }
}
module.exports = CameraPage;