const express = require("express");
const log = require("../lib/log")(module);
const router = express.Router();

module.exports = (config) => {
    const db = require('../postgres/postgres')(config);
    
    const node = require("../routes/nodes")(db);
    const line = require("../routes/lines")(db);
    
    router.get('/getNodes',node.getNodes);
    router.post('/changeNodePosition',node.changeNodePosition);
    router.put('/addNode',node.addNode);
    router.delete('/deleteNode',node.deleteNode);
    
    router.get('/getLines',line.getLines);    
    router.put('/addLine',line.addLine);  
    router.delete('/deleteLine',line.deleteLine);
    
    return router;
}; 

