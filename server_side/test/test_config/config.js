const nconf = require('nconf');

nconf.argv()
    .env()
    .file({ file: './server_side/test/test_config/config.json'});

module.exports = nconf;