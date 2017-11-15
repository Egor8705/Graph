const http = require("http");

const config = require('./server_side/config/config');
const app = require("./app")(config);

const server = http.Server(app);

server.listen(config.get("port"),config.get("host"));
