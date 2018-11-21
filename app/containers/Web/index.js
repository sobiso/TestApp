import React from 'react';
import {Platform, StyleSheet, Text, Image, View, Linking, WebView} from 'react-native';
import { connect } from 'react-redux';
import { listRepos, removeItem } from './../../reducer' 
import { Container} from 'native-base';




class Web extends React.Component { // eslint-disable-line react/prefer-stateless-function
    render() {
        console.log(this.props)
      const uri = this.props.navigation.state.params.url
      return (
        <WebView
          ref={(ref) => { this.webview = ref; }}
          source={{ uri }}
          onNavigationStateChange={(event) => {
            if (event.url !== uri) {
              this.webview.stopLoading();
              Linking.openURL(event.url);
            }
          }}
        />
      );
    }
  }
  

export default Web