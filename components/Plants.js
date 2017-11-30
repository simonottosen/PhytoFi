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
        <Text>perfect and doesn't need any water for a while</Text>
        
      );
    }
    else if((this.props.item.waterRef-2)==this.props.item.water || (this.props.item.waterRef-3)==this.props.item.water){
      return(
        <Text>very good but could take a bit more water</Text>
        
      );
    }
    else{
      return(
        <Text>isn't good and should be watered urgently</Text>
      );
    }
  
  
  }
_renderSun(){
  if((this.props.item.lightRef-1) <= this.props.item.light){
    return(
      <Text>The sunlight is at a perfect level</Text>
    );
  }
  else if((this.props.item.lightRef-2)==this.props.item.light || (this.props.item.lightRef-3)==this.props.item.light){
    return(
      <Text>The level of sunlight is good, but for a perfect enviroment you could try to move it to a place with more sun</Text>
    );
  }
  else{
    return(
      <Text>At the moment it's very dark and will impact the health of the plant if it isn't moved to a place with more light</Text>
    );
  }


}
_renderFertlizer(){
  if((this.props.item.fertilizerRef-1) <= this.props.item.fertilizer){
    return(
      <Text>perfect and shouldn't be fertilized for a while</Text>
    );
  }
  else if((this.props.item.fertilizerRef-2)==this.props.item.fertilizer || (this.props.item.fertilizerRef-3)==this.props.item.fertilizer){
    return(
      <Text>very good, but could take a small handfull of fertilizer</Text>
    );
  }
  else{
    return(
      <Text>not very good. Try to get your hands on some fertilizer, or move it to a place in the garden with ferilized soil</Text>
    );
  }


}
_renderTemp(){
  if((this.props.item.temperatureRef-1) <= this.props.item.temperature){
    return(
      <Text>is just the right temperature</Text>
    );
  }
  else if((this.props.item.temperatureRef-2)==this.props.item.temperature || (this.props.item.temperatureRed-3)==this.props.item.temperature){
    return(
      <Text>is a bit cold for the plant and it could be moved to a warmer place or you could place a heatinglamp nearby</Text>
    );
  }
  else{
    return(
      <Text>is very cold and will kill the plant, if a heating lamp is not placed nearby. You could also try to place it inside the house, during the night</Text>
    );
  }


}
  _renderBar(){
    if(this.props.item.water < this.props.item.waterRef && this.props.item.weather != 'Rain'){
      return(
        <Progress.Bar progress={this.props.item.water / 10} width={250} size={50} height={10} margin={5} color={'green'} />
        
      );
    }else{
      return(
        <Progress.Bar progress={this.props.item.water / 10} width={250} size={50} height={10} margin={5} color={'green'} />);
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

      <Image 
            style={styles.liImg}
            source={{uri: this.props.item.url}}
          />
          <Text style={{fontWeight: 'bold', fontSize: 15, textAlign: 'center'}}> ────  Fertilzer  ──── </Text>
        {this._renderBar()}

        <Text>
        The level of feritilzer in the {this.props.item.name} is {this._renderFertlizer()}.{"\n"} 
        </Text>
        <Text style={{fontWeight: 'bold', fontSize: 15, textAlign: 'center'}}> ────  Sunlight  ──── </Text>
        {this._renderBar()}
        <Text>

        {"\n"}{this._renderSun()}. 
        The water in the soil of the plant at the momemt is {this._renderWater()}.{"\n"}{"\n"}The outside enviroment is {this._renderTemp()}.{"\n"} 
          
        </Text>
        {/* <Text style={styles.liText}>{this.props.item.water} - {this._renderCalc()}</Text> */}

        <Button
          onPress={this._onPress.bind(this)}
          title='Back'/>

          
      </ScrollView>

      </View>
    );
  }
}
module.exports = Plants;