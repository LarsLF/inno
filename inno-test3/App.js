import React, {Component} from 'react';
import { ActivityIndicator, AsyncStorage, StyleSheet, Text, View } from 'react-native';
import {Router, Scene} from 'react-native-router-flux';
import * as firebase from 'firebase';
import Authentication from './components/Authentication';
import HomePage from './components/HomePage';
import Topic from './components/Topic';



const firebaseConfig = {
  apiKey: "AIzaSyDGx6zhZQToXDNJwx0sqRwRJosMFFFZSJU",
  authDomain: "test-1d316.firebaseapp.com",
  databaseURL: "https://test-1d316.firebaseio.com",
  projectId: "test-1d316",
  storageBucket: "test-1d316.appspot.com",
  messagingSenderId: "1006265468223"
};
const firebaseApp = firebase.initializeApp(firebaseConfig);
console.ignoredYellowBox = [
  "Setting a timer"
];

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
              hideNavBar={true}
              initial={!this.state.hasToken}
              key='Authentication'
              title='Authentication'
            />
            <Scene
              component={HomePage}
              hideNavBar={true}
              initial={this.state.hasToken}
              key='HomePage'
              title='Home Page'
            />
            <Scene
              component={Topic}
              hideNavBar={true}
              initial={this.state.hasToken}
              key='Topic'
              title='Topic'
              />

          </Scene>
        </Router>
      );
    }
  }
}