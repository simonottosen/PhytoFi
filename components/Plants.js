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
  _renderWaterBar(){
    if((this.props.item.waterRef-1) <= this.props.item.water){
      return(
        <Progress.Bar progress={this.props.item.water /this.props.item.waterRef} width={250} size={50} height={10} margin={5} color={'green'} />
        
      );
    }else if((this.props.item.waterRef-4)>=this.props.item.water ){
      return(
        <Progress.Bar progress={this.props.item.water /this.props.item.waterRef} width={250} size={50} height={10} margin={5} color={'red'} />);
    }else{
      return(
        <Progress.Bar progress={this.props.item.water /this.props.item.waterRef} width={250} size={50} height={10} margin={5} color={'yellow'} />);
      
    }
  }
  _renderFertBar(){
    if((this.props.item.fertilizerRef-1) <= this.props.item.fertilizer){
      return(
        <Progress.Bar progress={this.props.item.fertilizer /this.props.item.fertilizerRef} width={250} size={50} height={10} margin={5} color={'green'} />
        
      );
    }else if((this.props.item.fertilizerRef-4)>=this.props.item.fertilizer ){
      return(
        <Progress.Bar progress={this.props.item.fertilizer /this.props.item.fertilizerRef} width={250} size={50} height={10} margin={5} color={'red'} />);
    }else{
      return(
        <Progress.Bar progress={this.props.item.fertilizer /this.props.item.fertilizerRef} width={250} size={50} height={10} margin={5} color={'yellow'} />);
      
    }
  }

  _renderLightBar(){
    if((this.props.item.lightRef-1) <= this.props.item.light){
      return(
        <Progress.Bar progress={this.props.item.light /this.props.item.lightRef} width={250} size={50} height={10} margin={5} color={'green'} />
        
      );
    }else if((this.props.item.lightRef-4)>=this.props.item.light ){
      return(
        <Progress.Bar progress={this.props.item.light /this.props.item.lightRef} width={250} size={50} height={10} margin={5} color={'red'} />);
    }else{
      return(
        <Progress.Bar progress={this.props.item.light /this.props.item.lightRef} width={250} size={50} height={10} margin={5} color={'yellow'} />);
      
    }
  }
  _renderTempBar(){
    if((this.props.item.temperatureRef-1) <= this.props.item.temperature){
      return(
        <Progress.Bar progress={this.props.item.temperature /this.props.item.temperatureRef} width={250} size={50} height={10} margin={5} color={'green'} />
        
      );
    }else if((this.props.item.temperatureRef-4)>=this.props.item.temperature ){
      return(
        <Progress.Bar progress={this.props.item.temperature /this.props.item.temperatureRef} width={250} size={50} height={10} margin={5} color={'red'} />);
    }else{
      return(
        <Progress.Bar progress={this.props.item.temperature /this.props.item.temperatureRef} width={250} size={50} height={10} margin={5} color={'yellow'} />);
      
    }
  }

 
  _onPress(){
    Actions.pop();
  }
  render() {
    return (


<View style={{flex: 1}}>
<View style={{paddingTop:20, paddingLeft:0,   flexDirection: 'row',
  flexWrap: 'wrap'
}}>

 <View style={{paddingTop:15, marginLeft:10,}}><Button
          onPress={this._onPress.bind(this)}
          title='Back'/></View>
<Image style={{justifyContent: 'center', marginLeft:50,
        alignItems: 'center',
         width: 143, height: 80,  marginRight:60}}
         source={require('./LogoTrans.png')}
       /> 
       








</View>

      <ScrollView style={{paddingTop:1,  padding: 50,  margin: 5}}>
      <Text style={styles.title}>{this.props.item.name}</Text>

      <Image 
            style={styles.liImg}
            source={{uri: this.props.item.url}}
          />
          <Text style={{fontWeight: 'bold', fontSize: 15, textAlign: 'center'}}> ─────  Fertilzer  ───── </Text>
        {this._renderFertBar()}

        <Text>
        The level of feritilzer in the {this.props.item.name} is {this._renderFertlizer()}.{"\n"} 
        </Text>
        <Text style={{fontWeight: 'bold', fontSize: 15, textAlign: 'center'}}> ─────  Sunlight  ───── </Text>
        {this._renderLightBar()}
        <Text>

        {"\n"}{this._renderSun()}. {"\n"} 
        
        
          
        </Text>
        <Text style={{fontWeight: 'bold', fontSize: 15, textAlign: 'center'}}> ──────  Water  ────── </Text>
        {this._renderWaterBar()}
        <Text>
        {"\n"}The water in the soil of the plant at the momemt {this._renderWater()}.{"\n"} 
          </Text>

          <Text style={{fontWeight: 'bold', fontSize: 15, textAlign: 'center'}}> ────  Temperature  ──── </Text>
        {this._renderTempBar()}
        <Text>
        {"\n"}The outside enviroment {this._renderTemp()}.{"\n"} 
          </Text>
        {/* <Text style={styles.liText}>{this.props.item.water} - {this._renderCalc()}</Text> */}

       

          
      </ScrollView>

      </View>
    );
  }
}
module.exports = Plants;