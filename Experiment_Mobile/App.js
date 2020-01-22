/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import KeepAwake from 'react-native-keep-awake';
import { View, ToastAndroid, StatusBar } from 'react-native';
import { Appbar, Colors } from 'react-native-paper';
import WebView from 'react-native-webview';
import Orientation from 'react-native-orientation';

class App extends Component {
  vertical = false;

  constructor() {
    super();
    KeepAwake.activate();
  }

  render() {
    let home = 'https://www2.gogoanimes.ai/';
    let domain = getFullDomainFromLink(home);
    console.log(domain);

    // Remove ads
    const removeAdsScript = `
      let imgs = document.getElementsByTagName('img');
      for (let i of imgs) {
        if (i.border) i.remove();
      }

      let divs = document.getElementsByClassName('image-with-text');
      for (let d of divs) {
        divs.removeChild(d);
      }
    `;
    
    return (
      <View style={{flex: 1}}>
        <StatusBar backgroundColor={Colors.black}/>
        <WebView source={{ uri: home }} injectedJavaScript={removeAdsScript}
          allowsFullscreenVideo ref={ref => (this.webview = ref)}
          onShouldStartLoadWithRequest={request => {
            // Only allow navigating within this website
            console.log(request);
  
            const { url, title } = request;
            let shouldLoad = url.includes(domain) || title === '';
            if (!shouldLoad) {
              ToastAndroid.showWithGravity('Popup has been blocked', ToastAndroid.SHORT, ToastAndroid.TOP);
            }
            
            console.log(shouldLoad);
            return shouldLoad;
          }} />
        <Appbar style={{backgroundColor: Colors.amber400, justifyContent: 'space-around'}}>
          <Appbar.Action icon='arrow-left' onPress={() => this.webview.goBack()} />
          <Appbar.Action icon='arrow-right' onPress={() => this.webview.goForward()} />
          <Appbar.Action icon='home' onPress={() => {
            const redirectTo = 'window.location = "' + home + '"';
            this.webview.injectJavaScript(redirectTo);
          }} />
          <Appbar.Action icon='refresh' onPress={() => this.webview.reload()} />
          <Appbar.Action icon='screen-rotation' onPress={() => {
            if (this.vertical) {
              Orientation.lockToPortrait();
            } else {
              Orientation.lockToLandscape();
            }

            this.vertical = !this.vertical;
          }} />
        </Appbar>
      </View>
    );
  }
};

/**
 * Consider these cases
 * - https://www.google.com/
 * - https://google.com/
 * - google.com
 * - google.com/sdsahjs
 * First, we need to remove everything before //
 * @param {String} link 
 */
function getDomainNameFromLink(link) {
  let domain = link.split('//').pop();
  domain = domain.split('/').shift();
  return domain.split('www.').pop();
}


/**
 * Like `getDomainNameFromLink` but a longer version
 * @param {String} link 
 */
function getFullDomainFromLink(link) {
  let temp = link.split('//');
  let domain = temp[1].split('/').shift();
  return `${temp[0]}//${domain}`;
}

export default App;
