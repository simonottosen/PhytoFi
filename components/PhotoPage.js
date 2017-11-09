import React, {Component} from 'react';
import ReactNative from 'react-native';
import {Actions} from 'react-native-router-flux';
import * as firebase from 'firebase';
import Camera from 'react-native-camera';
import { Icon } from 'react-native-elements';
import StarRating from 'react-native-star-rating';
import StatusBar from './StatusBar';
import styles from '../styles';
const {
  ActivityIndicator,
  Alert,
  Image,
  Text,
  View,
  KeyboardAvoidingView,
  TouchableHighlight
} = ReactNative;

class PhotoPage extends Component {
  constructor(props) {
    super(props);
    this.state = { loading: false, rating: props.item.rating };
    this.fireRef = firebase.storage().ref('photos');
    this.offerRef = firebase.database().ref().child('offerings');
    this.ratingRef = firebase.database().ref().child('offerings').child(props.item.uid).child(props.item._key).child('ratings');
  }
  confirmRemove() {
    this.setState({ loading: true });
    Alert.alert(
      'Delete: '+this.props.item.title+'?',
      null,
      [
        {text: 'Yes', onPress:
        (text) => 
        {
          this.offerRef.child(this.props.uid).child(this.props.item._key).remove();
          this.fireRef.child(this.props.item.title).delete().then(function() {
            Actions.HomePage();
          }).catch(function(error) {
            console.log(error.message);
          });
        }},
        {text: 'Cancel', onPress: (text) => console.log('Cancelled')}
      ],
      {cancelable: false}
    );
  }
  renderIconOrSpinner() {
    if (this.state.loading) {
        return <ActivityIndicator size='small' color='#888' />;    
    }
    return <Icon 
      name='delete'
      type='material-community'
      color='#333333'
      style={styles.photoButton}
      onPress={this.confirmRemove.bind(this)}
    />;
  }
  onStarRatingPress(rating) {
    var that = this;
    this.setState({
      loading: true
    });
    this.ratingRef.child(this.props.uid).once('value', function(snapshot) {
      if(snapshot.val() === null){
        that.ratingRef.child(that.props.uid).set({rating: rating});
        that.setState({ loading: false, rating: rating });
      }else{
        that.ratingRef.child(that.props.uid).update({rating: rating})
        .then(() => {
          that.setState({ loading: false, rating: rating });
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
  render() {
    return (
      <View style={styles.panelContrainer}>
        <Image
          source={{ uri: this.props.item.url }}
          style={styles.preview}
        />
        <View style={styles.photoButtons}>
          <Icon 
            name='backspace'
            type='material-community'
            color='#333333'
            style={styles.photoButton}
            onPress={Actions.pop}/>
          <StarRating
            disabled={false}
            maxStars={5}
            starSize={20}
            rating={this.state.rating}
            selectedStar={(rating) => this.onStarRatingPress(rating)}
          />
          {this.renderIconOrSpinner()}
        </View>
      </View>
    )
  }
}
module.exports = PhotoPage;