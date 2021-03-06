import React from 'react';
import {Linking, WebView} from 'react-native';


class Web extends React.Component {
  render() {
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