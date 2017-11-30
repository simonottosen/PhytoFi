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

  _renderWater(){
    if((this.props.item.waterRef-1) <= this.props.item.water){
      return(
        <Text>PERFECT</Text>
      );
    }
    else if((this.props.item.waterRef-2)==this.props.item.water || (this.props.item.waterRef-3)==this.props.item.water){
      return(
        <Text>very good</Text>
      );
    }
    else{
      return(
        <Text>SHIT</Text>
      );
    }
  
  
  }
_renderSun(){
  if((this.props.item.lightRef-1) <= this.props.item.light){
    return(
      <Text>PERFECT</Text>
    );
  }
  else if((this.props.item.lightRef-2)==this.props.item.light || (this.props.item.lightRef-3)==this.props.item.light){
    return(
      <Text>very good</Text>
    );
  }
  else{
    return(
      <Text>SHIT</Text>
    );
  }


}
_renderFertlizer(){
  if((this.props.item.fertilizerRef-1) <= this.props.item.fertilizer){
    return(
      <Text>PERFECT</Text>
    );
  }
  else if((this.props.item.fertilizerRef-2)==this.props.item.fertilizer || (this.props.item.fertilizerRef-3)==this.props.item.fertilizer){
    return(
      <Text>very good</Text>
    );
  }
  else{
    return(
      <Text>SHIT</Text>
    );
  }


}
_renderTemp(){
  if((this.props.item.temperatureRef-1) <= this.props.item.temperature){
    return(
      <Text>PERFECT</Text>
    );
  }
  else if((this.props.item.temperatureRef-2)==this.props.item.temperature || (this.props.item.temperatureRed-3)==this.props.item.temperature){
    return(
      <Text>very good</Text>
    );
  }
  else{
    return(
      <Text>SHIT</Text>
    );
  }


}
  _renderBar(){
    if(this.props.item.water < this.props.item.waterRef && this.props.item.weather != 'Rain'){
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

      <ScrollView style={{paddingTop:1,  padding: 50,  margin: 5}}>
      <Text style={styles.title}>{this.props.item.name}</Text>
      <Text style={{fontStyle: 'italic', fontSize: 11}}>{"\n"}We're measuring the {this.props.item.name} on a scale from 1 to 10, and compare the number to the reference on the perfect conditions for the plant.</Text>


      <Image 
            style={styles.liImg}
            source={{uri: this.props.item.url}}
          />
        <Text>
        The level of feritilzer in the {this.props.item.name} is {this._renderFertlizer()}. While the level of sunlight that it gets is {this._renderSun()}. 
        The water in the soil of the plant at the momemt is {this._renderWater()} at the moment, but be aware of the weather. Temps is {this._renderTemp()} (skriv her simon). In 6 hours we expect it to be . 
          
        </Text>
        {/* <Text style={styles.liText}>{this.props.item.water} - {this._renderCalc()}</Text> */}
        <Text style={styles.liText}>{this.props.item.waterRef}{"\n"}</Text>

        <Text style={{fontWeight: 'bold', fontSize: 20}}> Waterlevel </Text>
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