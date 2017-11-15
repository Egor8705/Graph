
const winston = require('winston');
 
module.exports = (module) => {
    const path = module.filename.split('/').slice(-2).join('/');
    return  new (winston.Logger)({
        transports: [
            new (winston.transports.Console)({
                name:"success",
                colorize: true,
                level: "info",
                label: path
            }),
            new (winston.transports.Console)({
                name:"error",
                colorize: true,
                level: "error",
                label: path
            })
        ]
    });
};
 
