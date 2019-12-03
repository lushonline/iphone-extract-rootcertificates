const moment = require('moment');

const config = {};

// Indicates a name for the configuration
config.customer = 'none';
config.startTimestamp = moment()
  .utc()
  .format('YYYYMMDD_HHmmss');

// DEBUG Options - Enables the check for Fiddler, if running the traffic is routed thru Fiddler
config.debug = {};

// Debug logging
// One of the supported default logging levels for winston - see https://github.com/winstonjs/winston#logging-levels
config.debug.loggingLevel = 'info';
config.debug.logpath = 'logs';
config.debug.logFile = `app_${config.startTimestamp}.log`;

config.truststore = {};
config.truststore.path = 'input';
config.truststore.file = 'TrustStore.sqlite3';

config.certificate = {};
config.certificate.path = 'output';

module.exports = config;
