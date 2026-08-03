const express= require('express');
const app=express();
const homeRouter=require('./routes/home.router');

app.use('/api/v1',homeRouter);

module.exports=app; 