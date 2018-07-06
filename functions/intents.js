const express = require('express');

const { WebhookClient } = require('dialogflow-fulfillment');
const { Card } = require('dialogflow-fulfillment');

// const QRCode = require('qrcode');
const generator = require('./qrGenerator');
const { hash } = require('./crypto');

const intents = express.Router()

intents.post('/generate', (request, response) => {
  const agent = new WebhookClient({ request, response });
  const generarQR = (agent) => {
    const { name , alias, cuit, city } = agent.parameters;
    const str = generator({name, alias ,cuit ,city });
    const hashStr = encodeURIComponent(hash(str));

    agent.add(new Card({
        title: `Tu código QR`,
        text: `Aca tenes tu código generado.\n Gracias por sumarte a la transformación digital! 💁`,
        buttonText: 'Abrir',
        buttonUrl: `https://pagos-qr.com/share/${hashStr}`
      })
    );
  }
  let intentMap = new Map();
  intentMap.set('generar QR', generarQR);
  agent.handleRequest(intentMap);
});

module.exports = intents;
