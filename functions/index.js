const functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
const express = require('express');
const cors = require('cors');
const QRCode = require('qrcode');
const generator = require('./qrGenerator');

const app = express();

// Automatically allow cross-origin requests
app.use(cors({ origin: true }));

// Add middleware to authenticate requests
// app.use(myMiddleware);

// build multiple CRUD interfaces:
app.get('/test', (req, res) => {
  QRCode.toString(generator({name:"nombre",alias:"fer.nando",cuit:"20320232644",city:"quilmes"}),
  { type: 'svg', errorCorrectionLevel: 'L' }, (err, string) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.send(string);
    }
  });
});

// Expose Express API as a single Cloud Function:
exports.qr = functions.https.onRequest(app);