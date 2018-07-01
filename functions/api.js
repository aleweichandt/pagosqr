const express = require('express')
const QRCode = require('qrcode');
const generator = require('./qrGenerator');

const api = express.Router()

api.get('/test', (req, res) => {
  QRCode.toString(generator({name:"nombre",alias:"fer.nando",cuit:"20320232644",city:"quilmes"}),
  { type: 'svg', errorCorrectionLevel: 'L' }, (err, string) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.send(string);
    }
  });
});

api.post('/generate', (req, res) => {
  const { body = {} } = req;
  const { name , alias, cuit, city } = body;
  QRCode.toString(generator({name, alias ,cuit ,city }),
  { type: 'svg', errorCorrectionLevel: 'L' }, (err, string) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.send(string);
    }
  });
})

module.exports = api;