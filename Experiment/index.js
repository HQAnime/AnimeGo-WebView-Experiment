/**
 * @format
 */

import * as React from 'react';
import { AppRegistry } from 'react-native';
import { name as appName } from './app.json';
import { Provider as PaperProvider } from 'react-native-paper';
import App from './App';

export default function Main() {
  return (
    <PaperProvider>
      <App />
    </PaperProvider>
  );
}

AppRegistry.registerComponent(appName, () => Main);
