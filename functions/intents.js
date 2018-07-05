const express = require('express');

const { WebhookClient } = require('dialogflow-fulfillment');
const { Card, Suggestion } = require('dialogflow-fulfillment');

const QRCode = require('qrcode');
const generator = require('./qrGenerator');

const intents = express.Router()

intents.post('/generate', (request, response) => {
  const agent = new WebhookClient({ request, response });
  const generarQR = (agent) => {
    const { name , alias, cuit, city } = agent.parameters;
    const str = generator({name, alias ,cuit ,city });
    //TODO encrypt
    const hash = str;

    agent.add(new Card({
        title: `Tu código QR`,
        text: `Aca tenes tu código generado.\n Gracias por sumarte a la transformación digital! 💁`,
        buttonText: 'Abrir',
        buttonUrl: `https://pagos-qr/share/${hash}`
      })
    );
  }
  let intentMap = new Map();
  intentMap.set('generar QR', generarQR);
  agent.handleRequest(intentMap);
});

module.exports = intents;
