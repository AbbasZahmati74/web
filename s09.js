const http = require("http");
const fs = require("fs");
const PORT = 8080;
const server = http.createServer(requestHandler);

server.listen(PORT);


console.log(`server listen in Port ${PORT}`);
let headers = {
  text: { "Content-Type": "Text/Plain" },
  html: { "Content-Type": "Text/Html" },
};


const routes = {
  page: pageHandler,
  method: methodController,
  404: pageNotFound,
};
function write(res, statusCode, headerType, body) {
  res.writeHead(statusCode, headers[headerType]);
  res.write(body);
  res.end();
}


function methodController(req, res , data) {
  console.log('boop boop' , data);
}

function pageHandler(req, res) {
  let fileName = req.url.split("/")[2];
  fs.readFile(fileName, (err, data) => {
    if (err) {
      pageNotFound(req, res);
    } else {
      write(res, 200, "html", data);
    }
  });
}

function pageNotFound(req, res) {
  fs.readFile("./404.html", (err, data) => {
    write(res, 404, "html", data);
  });
}

function requestHandler(req, res) {
  let route = req.url.split("/")[1];

  if (route == "favicon.ico") {
  }

  try {


    let body = '';
    req.on("error", function (err) {
      console.log(err);
    })
    req.on("data", function (chunck) {
      body += chunck;
    })
    req.on("end", function () {
      console.log('Final data is ', body);
    })



    routes[route](req, res, body);
  } catch (err) {
    routes["404"](req, res);
  }

}