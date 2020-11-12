const log4js = require('log4js');

log4js.configure({
    appenders: {
        out: { type: 'stdout' },
        dateFile: { type: 'dateFile', filename: 'logs/node-demo.log', keepFileExt: true }
    },
    categories: {
        default: { appenders: ['out', 'dateFile'], level: 'info' }
    }
});

const logger = log4js.getLogger();

module.exports = logger;
