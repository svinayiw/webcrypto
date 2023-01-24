import React from 'react';
import {
  Text,
  View,
  Button,
  StyleSheet,
} from 'react-native';
import PolyfillCrypto from 'react-native-webview-crypto'
const { TextEncoder } = require('web-encoding')

const defKeyLength = 2048
const UserAgent = "Wyseman Websocket Client API"
const KeyConfig = {
  name: 'RSA-PSS',
  modulusLength: 2048,
  publicExponent: new Uint8Array([1,0,1]),
  hash: 'SHA-256'
}
const SignConfig = {		//For signing with RSA-PSS
  name: 'RSA-PSS',
  saltLength: 128
}

async function signCheck(subtle) {
  const encoder = new TextEncoder();
  const message = "A test string"
  const encMsg = encoder.encode(message)

  const keyPair = await subtle.generateKey(KeyConfig, true, ['sign','verify']);
  const priv = keyPair.privateKey

  const sign = await subtle.sign(SignConfig, priv, encMsg)

  return sign;
}

const App = () => {
  const onPress = () => {
    if(window.crypto) {
      signCheck(window.crypto.subtle).then(console.log).catch(console.log)
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
