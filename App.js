import React, {Component} from 'react';
import { ActivityIndicator, AsyncStorage, StyleSheet, Text, View } from 'react-native';
import { Icon } from 'react-native-elements';
import {Drawer, Router, Scene, Tabs} from 'react-native-router-flux';
import * as firebase from 'firebase';
import Authentication from './components/Authentication';
import HomePage from './components/HomePage';
import Camera from './components/Camera';
import DrawerContent from './components/DrawerContent';

const firebaseConfig = {
  apiKey: "AIzaSyAbDaMFCjAbSq105yNi8C3kVDrSOg2_6Jw",
  authDomain: "phytofi.firebaseapp.com",
  databaseURL: "https://phytofi.firebaseio.com",
  projectId: "phytofi",
  storageBucket: "phytofi.appspot.com",
  messagingSenderId: "695300792829"
};
const firebaseApp = firebase.initializeApp(firebaseConfig);
console.ignoredYellowBox = [
  "Setting a timer"
];
const MenuIcon = () => {
  return (
    <Icon 
    name='menu'
    type='material-community'
    color='#333333' />
  );
}

const TabIcon = ({ focused, title }) => {
  return (
    <Icon 
      name={title}
      type='material-community'
      color={focused ? '#333333' : '#c0c0c0'} />
  );
}

export default class App extends Component {
  constructor() {
    super();
    this.state = { hasToken: false, isLoaded: false };
  }
  componentWillMount() {
    AsyncStorage.getItem('id_token').then((token) => {
      this.setState({ hasToken: token !== null, isLoaded: true });
    });
  }
  render() {
    if (!this.state.isLoaded) {
      return (
        <ActivityIndicator />
      )
    } else {
      return (
        <Router>
          <Scene key='root'>
            <Scene
              component={Authentication}
              initial={!this.state.hasToken}
              hideNavBar={true}
              key='Authentication'
              title='Authentication'
            />
            <Drawer
              hideNavBar
              key="drawer"
              contentComponent={DrawerContent}
            >
              <Tabs
                key='Tabbar'
                swipeEnabled
                showLabel={false}
                tabs={true}
                tabBarPosition='bottom'
                tabBarStyle={{ backgroundColor: '#FFFFFF' }}
              >
                <Scene
                  key="HomeTab"
                  title="format-list-bulleted"
                  icon={TabIcon}>
                  <Scene
                    component={HomePage}
                    initial={this.state.hasToken}
                    key='HomePage'
                    title='Home Page'
                  />
                </Scene>
                <Scene
                  key="CameraTab"
                  title="camera"
                  icon={TabIcon}>
                  <Scene
                    component={Camera}
                    key='Camera'
                    title='Camera'
                  />
                </Scene>
              </Tabs>
            </Drawer>
          </Scene>
        </Router>
      );
    }
  }
}