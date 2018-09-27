
const fs = require('fs');

const path = require('path');

function loadFile(request, response, url) {
  const file = path.resolve(__dirname, url);

  fs.stat(file, (err, stats) => {
    if (err) {
      if (err.code === 'ENOENT') {
        response.writeHead(404);
      }
      return response.end(err);
    }

    let { range } = request.headers;

    if (!range) {
      range = 'bytes=0-';
    }

    const positions = range.replace(/bytes=/, '').split('-');

    let start = parseInt(positions[0], 10);

    const total = stats.size;
    const end = positions[1] ? parseInt(positions[1], 10) : total - 1;

    if (start > end) {
      start = end - 1;
    }

    const contentParse = url.split('.');
    const mediaType = contentParse[contentParse.length - 1];
    console.log(mediaType);

    const stream = fs.createReadStream(file, { start, end });

    stream.on('open', () => {
      stream.pipe(response);
    });

    stream.on('error', (streamErr) => {
      response.end(streamErr);
    });

    return stream;
  });
}

const getSummer = (request, response) => {
  loadFile(request, response, '../client/summer/all.m3u8');
  // const file = path.resolve(__dirname, '../client/summer/manifest.mpd');
  // response.writeHead(206, { 'Content-Type': 'application/xhtml+xml' });
  // response.end();
};

const getSummerVideo = (request, response) => {
  console.log(`../client${request.url}`);
  loadFile(request, response, `../client${request.url}`);
  response.writeHead(206, {
    'Content-Type': 'application/x-mpegurl',
  });
};

module.exports.getSummer = getSummer;
module.exports.getSummerVideo = getSummerVideo;
