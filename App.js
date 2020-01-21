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
  let link = 'https://www.fembed.com/v/j-5gdcdq-nwldn2';
  let domain = getDomainNameFromLink(link);
  console.log(domain);

  return (
    <View style={{flex: 1}}>
      <WebView source={{ uri: link }}
        allowsFullscreenVideo
        onShouldStartLoadWithRequest={request => {
          // Only allow navigating within this website
          console.log(request);

          const { url, title } = request;
          let shouldLoad = url.includes(domain) || title === '';
          if (!shouldLoad) {
            ToastAndroid.showWithGravity('Popup has been blocked', 0.5, ToastAndroid.TOP);
          }

          return shouldLoad;
        }} />
    </View>
  );
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


export default App;
