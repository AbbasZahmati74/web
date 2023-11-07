let http = require ('http');
let server = http.createServer(requestHandler);
server.listen(80);

let headers = {'Content-Type': 'Text/Plain'}

function requestHandler(request, response){
    console.log('request url: ', request.url);
    console.log('request method: ', request.method);
    response.writeHead(200, headers);
    response.write('salam ' + request.url);
    response.end();
}
