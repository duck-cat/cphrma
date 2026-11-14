const app=require('./app');

const ngrok = require("@ngrok/ngrok");



app.listen(3000, () => {
  console.log('Server is running on port 3000');
});