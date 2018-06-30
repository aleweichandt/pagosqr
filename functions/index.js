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

const app = express();

// Automatically allow cross-origin requests
app.use(cors({ origin: true }));

// Add middleware to authenticate requests
// app.use(myMiddleware);

// build multiple CRUD interfaces:
app.post('/test', (req, res) => {
  QRCode.toString('http://www.google.com', (err, string) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.send(string);
    }
  });
});

// Expose Express API as a single Cloud Function:
exports.qr = functions.https.onRequest(app);