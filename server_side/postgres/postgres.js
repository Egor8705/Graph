const log = require("../lib/log")(module);

module.exports = (config) => {
    const initOptions = {
    error: (error, e) => {
        if (e.cn) {
            log.error('CN:'+ e.cn);
            log.error('EVENT:' + error.message || error);
        }
    }
};
    
    const pgp = require("pg-promise")(initOptions);
    const db = pgp(config.get("postgres:options"));
    
    db.connect()
    .then(obj => {
        obj.done(); 
        log.info("Success connected");
    })
    .catch(error => {
        log.error(error.message || error);
    });
    
    return db;
};

    
    
