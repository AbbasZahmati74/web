let http = require("http");
let port = 8040;
let server = http.createServer(requestHandler);
server.listen(port);
console.log("Server Is Running On Port: " +port)

let headers  ={
text: {'Content-Type' : 'Text/Plain'},
 Html:  {'Content-Type' : 'Text/Html'}
};

function page1controller(response){
    response.writeHead(200, headers.Html);
    response.write(
        `<html>
        <head>
        <style>
        
        .circle {height:250px; width:250px; border-radius:50%; background-color:#29DBC7;}
        </style>
        
        </head>
        <body>
        <div class="circle"> Salam <strong> Be Shoma!</strong> </div> 
        </body>
        </html>`)
        response.end();     
    }
    let obj={
        page1: page1controller
    }
    function requestHandler (request,response){
        let firstpart= request.url.split('/')[1];
        if(firstpart !== 'favicion.ico'){
            obj[firstpart](response);
        }
    }



