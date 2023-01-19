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

type SignArgs = {
  subtle: any,
  ip: string,
  cookie?: string,
  userAgent: string,
  date?: string,
}

export const signCheck = async (args: SignArgs) => {
  const encoder = new TextEncoder();
  const { ip, cookie, userAgent, date, subtle } = args;
  const  message = JSON.stringify({ip, cookie, userAgent, date})	//Must rebuild in this same order in the backend!

  const keyPair = await subtle.generateKey(KeyConfig, true, ['sign','verify']);
  const priv = keyPair.privateKey

  const sign = await subtle.sign(SignConfig, priv, encoder.encode(message))

  return sign;
}


