const fs = require('fs');
const Path = require('path');
const _ = require('lodash');
// eslint-disable-next-line no-unused-vars
const pkginfo = require('pkginfo')(module);

const { transports } = require('winston');
const sqlite3 = require('sqlite3').verbose();

const logger = require('./lib/logger');
const myutil = require('./lib/util');
const configuration = require('./config');

const NODE_ENV = process.env.NODE_ENV || 'development';

const getDatabase = database => {
  return new sqlite3.Database(database, sqlite3.OPEN_READWRITE);
};

/**
 * Write the HEX string to a CRT file
 *
 * @param {*} str sqllite hex(blob) output
 * @param {*} file
 * @returns
 */
const writeHexStringToCert = (str, file) => {
  if (!str) {
    return '';
  }

  const a = [];
  for (let i = 0, len = str.length; i < len; i += 2) {
    a.push(parseInt(str.substr(i, 2), 16));
  }

  fs.writeFile(file, new Uint8Array(a), err => {
    if (err) throw err;
  });
  return file;
};

const allAsync = (db, sql) => {
  return new Promise((resolve, reject) => {
    db.all(sql, (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
};

/**
 * Main Process
 *
 * @param {*} options
 * @returns
 */
const main = async configOptions => {
  const loggingOptions = {
    label: 'main'
  };

  const options = configOptions || null;

  if (_.isNull(options)) {
    logger.error('Invalid configuration', loggingOptions);
    return false;
  }

  // Set logging to silly level for dev
  if (NODE_ENV.toUpperCase() === 'DEVELOPMENT') {
    logger.level = 'silly';
  } else {
    logger.level = options.debug.loggingLevel;
  }

  // Create logging folder if one does not exist
  if (!_.isNull(options.debug.logpath)) {
    if (!fs.existsSync(options.debug.logpath)) {
      myutil.makeFolder(options.debug.logpath);
    }
  }

  // Create output folder if one does not exist
  if (!_.isNull(options.certificate.path)) {
    if (!fs.existsSync(options.certificate.path)) {
      myutil.makeFolder(options.certificate.path);
    }
  }

  // Add logging to a file
  logger.add(
    new transports.File({
      filename: Path.join(options.debug.logpath, options.debug.logFile),
      options: {
        flags: 'w'
      }
    })
  );

  logger.info(`Start ${module.exports.name}`, loggingOptions);
  logger.debug(`Options: ${JSON.stringify(options)}`, loggingOptions);

  const trustStore = Path.join(options.truststore.path, options.truststore.file);

  logger.info(`Opening ${trustStore}`, loggingOptions);
  const db = getDatabase(trustStore);

  const sql = `Select hex(data) as cert FROM tsettings`;

  await allAsync(db, sql).then(rows => {
    rows.forEach((row, index) => {
      const filename = Path.join(options.certificate.path, `cert${index}.crt`);
      logger.info(`Saving Certificate to ${filename}`, loggingOptions);
      writeHexStringToCert(row.cert, filename);
    });
  });

  db.close();

  logger.info(`End ${module.exports.name}`, loggingOptions);
  return true;
};

main(configuration);
