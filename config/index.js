const configSettings = process.env.CONFIG || 'default';

const configFile = `config.${configSettings}`;
const configPath = `./${configFile}`;

//

const logmessage = (message, label, level) => {
  const info = {};
  info.timestamp = new Date().toISOString();
  info.message = message;
  info.label = label;
  info.level = level;

  // eslint-disable-next-line no-console
  console.log(`${info.timestamp} [${info.label}] ${info.level}: ${info.message}`);
};

logmessage('Loading Configuration', 'config', 'info');
logmessage(`Loading Config Overrides from ./config/${configFile}`, 'config', 'info');

// eslint-disable-next-line import/no-dynamic-require
const cfg = require(configPath);

logmessage('Loading Configuration Completed', 'config', 'info');
module.exports = cfg;
