import React, {Component} from 'react';
import ReactNative from 'react-native';
import {Actions} from 'react-native-router-flux';
import * as firebase from 'firebase';
import styles from '../styles';
import * as Progress from 'react-native-progress';

const {
  ActivityIndicator,
  Alert,
  Button,
  Image,
  Text,
  View,
  KeyboardAvoidingView,
  ScrollView,
  ListView,
  TouchableHighlight
} = ReactNative;

class Plants extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  _renderCalc(){
    if(this.props.item.water < this.props.item.waterRef && this.props.item.weather != 'Rain'){
    return(
      
      <Text>Water</Text>
    );
  }else{
    return(
    <Text>Dont water</Text>);
    
  }

}
  _renderBar(){
    if(this.props.item.water < this.props.item.waterRef ){
      return(
        <Progress.Bar progress={this.props.item.water / 10} width={200} size={50} height={50} margin={5} color={'red'} />
      );
    }else{
      return(
        <Progress.Bar progress={this.props.item.water / 10} width={200} size={50} height={50} margin={5} color={'blue'} />);
    }
  }
  _onPress(){
    Actions.pop();
  }
  render() {
    return (


<View style={{flex: 1}}>
  

<View style={{paddingTop:20, paddingLeft:115}}>

<Image style={{justifyContent: 'center',
        alignItems: 'center',
         width: 143, height: 80,  paddingRight: 50}}
         source={require('./LogoTrans.png')}
       /> 

{/* <TextInput 
    returnKeyLabel='Go' 
    returnKeyType='go' 
    onSubmitEditing={this.getWeather.bind(this)}
    style={{height: 40, backgroundColor: '#f2f2f2'}}
    placeholder= {"Indtast by"}
    onChangeText={(text) => this.setState({text})}
/>
<Button style={{backgroundColor:'#fff'}}
 onPress={this.getWeather.bind(this)}
  title="Update"
  color="#841584"
  accessibilityLabel="Learn more about this purple button"
/> */}



</View>

      <ScrollView style={{paddingTop:10,  padding: 50,  margin: 10}}>
      <Text style={styles.title}>{this.props.item.name}</Text>

      <Image 
            style={styles.liImg}
            source={{uri: this.props.item.url}}
          />
        <Text style={styles.liText}>{"\n"}Temperaturen på denne plante er {this.props.item.temperature} på en skala fra 0 til 10.</Text>
        <Text style={styles.liText}>{this.props.item.water} - {this._renderCalc()}</Text>
        <Text style={styles.liText}>{this.props.item.waterRef}{"\n"}</Text>

        <Text style={{fontWeight: 'bold', fontSize: 20}}> Waterlevel </Text>
        {/* <Progress.Bar progress={this.props.item.water / 10} width={200} size={50} height={50} margin={5} color={'blue'} />); */}
        {this._renderBar()}
        <Button
          onPress={this._onPress.bind(this)}
          title='Back'/>
      </ScrollView>

      </View>
    );
  }
}
module.exports = Plants;