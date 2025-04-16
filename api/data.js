// api/data.js
const { readFileSync } = require('fs');
const path = require('path');

module.exports = (req, res) => {
  const filePath = path.join(__dirname, 'api.json');
  const jsonData = JSON.parse(readFileSync(filePath, 'utf-8'));

  res.setHeader('Content-Type', 'application/json');
  res.status(200).json(jsonData);
};
