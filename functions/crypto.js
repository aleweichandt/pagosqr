const CryptoJS = require('crypto-js');
const bkey = require('./secret');

// var iv = '0123456789abcdef';
var keyHex = CryptoJS.enc.Base64.parse(bkey);

exports.hash = (input) => {
  const encrypted = CryptoJS.TripleDES.encrypt(input, keyHex, {
    iv: keyHex,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  });
  return encrypted.toString();
};

exports.unhash = (input) => {
  const decrypted = CryptoJS.TripleDES.decrypt(input, keyHex, {
    iv: keyHex,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  });
  return decrypted.toString(CryptoJS.enc.Utf8);
};
