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
  let link = 'https://www2.gogoanimes.ai/heya-camp-episode-3';
  let domain = getFullDomainFromLink(link);
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
            ToastAndroid.showWithGravity('Popup has been blocked', ToastAndroid.SHORT, ToastAndroid.TOP);
          }
          
          console.log(shouldLoad);
          return shouldLoad;
        }} />
      <View>
        
      </View>
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
