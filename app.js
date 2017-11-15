
module.exports = (config) => {
    
    const express = require('express');
    const bodyParser = require('body-parser');
    const router = require('./server_side/router/router')(config);
    const path = require("path");

    const app = express();


    app.use(express.static(path.join(__dirname, '/client_side/public')));

    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    app.use(bodyParser.json({ type: 'application/json'})); 

    app.use('/api',router);

    app.get('/', function (req, res) {
        res.sendFile(__dirname + '/client_side/public/index.html');
    });
    
    return app;
};

