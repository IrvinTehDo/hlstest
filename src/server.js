const http = require('http');
const htmlHandler = require('./htmlResponses');
const mediaHandler = require('./mediaResponses.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const onRequest = (request, response) => {
  console.log(request.url);

  switch (request.url) {
    case '/':
      htmlHandler.getIndex(request, response);
      break;
    case 'eme.html':
      htmlHandler.getEme(request, response);
      break;
    case '/summer/manifest.mpd':
      mediaHandler.getSummer(request, response);
      break;
    case '/favicon.ico':
      htmlHandler.getIndex(request, response);
      break;
    default:
      mediaHandler.getSummerVideo(request, response);
      break;
  }
};

http.createServer(onRequest).listen(port);

console.log(`Listening on localhost:${port}`);
