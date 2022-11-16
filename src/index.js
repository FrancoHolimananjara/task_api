const express = require('express');

const {synchronization} = require('./models');
const router = require('./route/index')

const app = express();

app.use(express.json())
    .use(express.urlencoded({extended:true}));

// database stuff
synchronization;

app.use('/api',router);

app.listen(3001,()=>{
    console.log('Serveur en écoute');
})