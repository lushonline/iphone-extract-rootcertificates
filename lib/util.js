const fs = require('fs');
const axios = require('axios');

/**
 * Create the specified folder path
 *
 * @param {*} fullPath
 */
const makeFolder = fullPath => {
  const path = fullPath.replace(/\/$/, '').split('/');
  for (let i = 1; i <= path.length; i += 1) {
    const segment = path.slice(0, i).join('/');
    if (!fs.existsSync(segment)) {
      fs.mkdirSync(segment);
    }
  }
};

/**
 * Return a formatted string
 *
 * @param {*} bytes
 * @returns string
 */
const bytesToSize = bytes => {
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  if (bytes === 0) return '0 Byte';
  const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)), 10);
  return `${Math.round(bytes / 1024 ** i, 2)} ${sizes[i]}`;
};

/**
 * Check to see if Fiddler Proxy is accessible
 * at the IP and Port
 *
 * @param {*} fiddlerProxy
 * @param {*} fiddlerPort
 * @returns bool
 */
const isFiddlerRunning = async (fiddlerProxy, fiddlerPort) => {
  const fiddlerEchoPage = `http://${fiddlerProxy}:${fiddlerPort}`;
  try {
    const response = await axios.get(fiddlerEchoPage);
    if (/Fiddler Echo Service/.test(response.data || '')) {
      return true;
    }
  } catch (err) {
    return false;
  }
  return false;
};

module.exports = {
  makeFolder,
  bytesToSize,
  isFiddlerRunning
};
