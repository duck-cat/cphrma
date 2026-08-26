const { Client } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const {steps}=require("./session/sessionUtils");

const client = new Client();

client.on('qr', (qr) => {
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log('Client is ready!');
});

client.on('message', (msg) => {
    if (msg.body.toLocaleLowerCase() == 'hi') {
        console.log("hellow");
        console.log(steps.step1);
        msg.reply(steps.step1);
    }
   console.log(msg);
});

client.initialize();