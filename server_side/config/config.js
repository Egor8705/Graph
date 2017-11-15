const nconf = require('nconf');

nconf.argv()
    .env()
    .file({ file: './server_side/config/config.json'});

module.exports = nconf;