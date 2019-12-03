const config = require('./config.global');

config.customer = 'default';

// Debug logging
// One of the supported default logging levels for winston - see https://github.com/winstonjs/winston#logging-levels
// config.debug.loggingLevel = 'debug';

// Debug logging
// One of the supported default logging levels for winston - see https://github.com/winstonjs/winston#logging-levels
// config.debug.loggingLevel = 'debug';
config.debug.logpath = 'results/output';
config.debug.logFile = `${config.customer}.log`;

config.truststore.path = 'input';
config.truststore.file = 'TrustStore.sqlite3';

config.certificate.path = 'output';

module.exports = config;
