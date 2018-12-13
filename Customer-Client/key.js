/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var Wallet = require('ethereumjs-wallet');
var EthUtil = require('ethereumjs-util');

// Get a wallet instance from a private key
const privateKeyBuffer = EthUtil.toBuffer('0x61ce8b95ca5fd6f55cd97ac60817777bdf64f1670e903758ce53efc32c3dffeb');
const wallet = Wallet.fromPrivateKey(privateKeyBuffer);

// Get a public key
const publicKey = wallet.getPublicKeyString();                                                                                                                                                                                                                                                               
console.log(publicKey);
