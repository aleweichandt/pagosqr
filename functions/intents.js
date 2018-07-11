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

    const cuitUsed = cuitStr.toString().split(' ').join('');
    const aliasUsed = aliasStr.toString().split(' ').join('');
    const text = `Aca tenes tu código generado.\n
                  CBU/AliasCBU: ${aliasUsed}\n
                  CUIT: ${cuitUsed}\n
                  Gracias por sumarte a la transformación digital! 💁`;
    agent.add(new Card({
        title: `Tu código QR`,
        imageUrl: 'https://firebasestorage.googleapis.com/v0/b/pagosqr-web.appspot.com/o/check.png?alt=media&token=d3d2a5ec-802c-479a-9e85-09792d852d32',
        text,
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
