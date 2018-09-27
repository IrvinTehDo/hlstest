const fs = require('fs');

const index = fs.readFileSync(`${__dirname}/../client/client.html`);
const eme = fs.readFileSync(`${__dirname}/../client/eme.html`);

const getIndex = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/html' });
  response.write(index);
  response.end();
};

const getEme = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/html' });
  response.write(eme);
  response.end();
};

module.exports.getIndex = getIndex;
module.exports.getEme = getEme;
