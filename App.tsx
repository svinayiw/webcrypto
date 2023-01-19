import React from 'react';
import {
  Text,
  View,
  Button,
  StyleSheet,
} from 'react-native';
import PolyfillCrypto from 'react-native-webview-crypto'

import { signCheck } from './utils/crypto';

const App = () => {
  const onPress = () => {
    if(window.crypto) {
      signCheck({
        ip: '::ffff:139.5.71.139',
        userAgent: 'chark/1 CFNetwork/1402.0.8 Darwin |0th generation',
        subtle: window.crypto.subtle,
      }).then(console.log).catch(console.log)
    }
  } 

  return (
    <View
      style={styles.container}
    >
      <PolyfillCrypto />
      <Button
        title="Sign key"
        onPress={onPress}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: '10%',
  },
});

export default App;
