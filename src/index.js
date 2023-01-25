const express = require('express');

require('dotenv').config();

const {synchronization} = require('./models');
const router = require('./route/index')

const app = express();

app.use(express.json())
    .use(express.urlencoded({extended:true}));

// database stuff
synchronization;

app.use('/api',router);
const Port = process.env.PORT || 5000
app.listen(Port,()=>{
    console.log('Serveur en écoute');
})