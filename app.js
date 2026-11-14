const express = require('express');
const app = express();
const homeRouter = require('./routes/home.router');
const inventoryRouter = require('./routes/inventory.router');
const approvalsRoute=require("./routes/approvals.router");
const configRoute=require("./routes/config.router");
const supplierRoute=require("./routes/supplier.router");
const cors = require('cors');
const ngrok = require("@ngrok/ngrok");
const path=require('path');
const commonRoute=require('./routes/commonRoute');
app.use(cors());
app.use(express.json());
let  publicPath = path.join(__dirname, 'public');
console.log(publicPath);
app.use(express.static(publicPath));


/*async function forwardToApp() {
  const forwarder = await ngrok.forward({
    addr: "localhost:3000",
  //  authtoken_from_env: true,
    authtoken:'3LluzuBFrW9KRPUKzmy8oSalXFn_5npWKjLdhC5eAbiLTYQbs',
    domain: "barman-striving-untangled.ngrok-free.dev",
  });
  console.log(`Available at: ${forwarder.url()}`);
}

forwardToApp();*/
app.get('/webhook', (req, res) => {
    const mode = req.query['hub.mode'];
    const token = req.query['hub.verify_token'];
    const challenge = req.query['hub.challenge'];

    if (mode === 'subscribe' && token === 'mahendra1212_cphrma_token_@_created_11_07-26_DCKCAT') {
        return res.status(200).send(challenge);
    }

    return res.sendStatus(403);
});

// 2. RECEIVE WHATSAPP WEBHOOK EVENTS
app.post("/webhook", (req, res) => {

  try {
    console.log("web hook called");
    console.log(res);
    const body = req.body;

    if (body.object === "whatsapp_business_account") {

      for (const entry of body.entry || []) {

        for (const change of entry.changes || []) {

          const value = change.value || {};

          // A. MESSAGE DELIVERY STATUS
          for (const status of value.statuses || []) {

            console.log("-------------------------");
            console.log("MESSAGE STATUS UPDATE");
            console.log("Message ID:", status.id);
            console.log("Recipient:", status.recipient_id);
            console.log("Status:", status.status);
            console.log("Timestamp:", status.timestamp);

            if (status.status === "failed") {
              console.log("ERROR:", status.errors);
            }

            console.log("-------------------------");
          }

          // B. INCOMING CUSTOMER MESSAGES
          for (const message of value.messages || []) {

            console.log("INCOMING MESSAGE");
            console.log("From:", message.from);
            console.log("Message:", message.text?.body);
            console.log("Type:", message.type);

          }
        }
      }
    }

    return res.sendStatus(200);

  } catch (error) {
    console.error("Webhook error:", error);
    return res.sendStatus(500);
  }
});

app.use('/api/v1', homeRouter);
app.use('/api/v1', inventoryRouter);
app.use('/api/v1', approvalsRoute);
app.use('/api/v1', configRoute);
app.use('/api/v1',supplierRoute);
app.use('/api/v1',commonRoute);
module.exports = app; 