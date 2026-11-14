const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

const client = new Client({
    authStrategy: new LocalAuth()
});

client.on('qr', (qr) => {
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log('WhatsApp Connected!');
});

client.on('message', async (message) => {
    console.log(message.from, message.body);

    if (message.body.toLowerCase() === 'hi') {
        await message.reply('Hello from Node.js!');
    }
});

client.initialize();