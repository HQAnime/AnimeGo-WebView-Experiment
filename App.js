/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import { View, Text, ToastAndroid } from 'react-native';
import WebView from 'react-native-webview';

const App = () => {
  return (
    <View style={{flex: 1}}>
      <WebView source={{ uri: 'https://vidstreaming.io/streaming.php?id=MTM1ODQx&title=BanG+Dream%21+3rd+Season+episode+4&typesub=SUB' }}
        allowsFullscreenVideo
        onShouldStartLoadWithRequest={request => {
          // Only allow navigating within this website
          console.log(request);
          ToastAndroid.showWithGravity('Popup has been blocked', 0.5, ToastAndroid.TOP);
          return request.url.startsWith('https://facebook.github.io/react-native');
        }} />
    </View>
  );
};


export default App;
