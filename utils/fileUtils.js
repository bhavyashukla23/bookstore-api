const fs = require('fs').promises;
const path = require('path');

const readJSON = async (filename) => {
  const data = await fs.readFile(path.join(__dirname, '..', 'data', filename), 'utf-8');
  return JSON.parse(data);
};

const writeJSON = async (filename, data) => {
  await fs.writeFile(path.join(__dirname, '..', 'data', filename), JSON.stringify(data, null, 2));
};

module.exports = { readJSON, writeJSON };
