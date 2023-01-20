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

export const signCheck = async (subtle) => {
  const encoder = new TextEncoder();
  const message = "A test string"
  const encMsg = encoder.encode(message)

  const keyPair = await subtle.generateKey(KeyConfig, true, ['sign','verify']);
  const priv = keyPair.privateKey

  const sign = await subtle.sign(SignConfig, priv, encMsg)

  return sign;
}


