const config = require('./test_config/config');
const app = require("../../app")(config);

app.listen(4000);

module.export = app;