var http = require("http");
var express = require("express"), http = require("http");
var server1 = express();
const url = require('url'); 

// main server
// server1.use(express.static(__dirname + "/main"));

var request = require('request'); // npm install request

server1.all('*', function (req, res) { 
    console.log(req.headers.host, req.path, req.query, req)
    var options = {
        host: 'vmhost',
        port: 3000,
        path: req.path,
        method: req.method,
        query: req.query
    };
    var redirectUrl = url.format({
            pathname: "http://192.168.32.128:3000"+req.path,
            query: req.query
        })
    console.log('REDIRECTURL: ', redirectUrl )
    request({ 
        url: redirectUrl, headers: req.headers, body: req.body, method: req.method }, function(err, remoteResponse, remoteBody) {
        if (err) { return res.status(500).end('Error'); }
        // res.writeHead(remoteResponse); // copy all headers from remoteResponse
        // res.end(remoteBody);
        res.send(remoteBody);
        res.end();
    });

    
    // res.send(JSON.stringify(req))

    // var newReq = http.request(options, function(redirectRes) {
    //     // console.log("OPTIONS: ", options, redirectRes)
    //     // res.send(JSON.stringify(redirectRes).toString())
    //     redirectRes.setEncoding('utf8');
    //     redirectRes.on('data', function (chunk) {
    //         res.writeHead(chunk)
    //         res.end();
    //         // console.log('BODY: ' + chunk);

    //     });
    // })

    // newReq()
    // newReq.write('data\n');
    // newReq.end();

    // res.send(
    //     res.redirect(url.format({
    //     pathname: "http://192.168.32.128:3000"+req.path,
    //     query: req.query})) 

    // )
})
server1.listen(3000, function(err) {
    console.log("server listening on port 3000");
});

// http.createServer(function (request, response) {
    // response.writeHead(302, { Location: "http://192.168.32.128:3000" });
    // response.end();
    // response.send(request);
    // response.redirect("http://vmhost:3000");
    // if (request.headers.host === "mysite") {
    //     console.log("Request made to mysite.com");
    //     response.writeHead(302, { Location: "http://localhost:5555" });
    //     response.end();
    // } else if (request.headers.host === "dev.mysite") {
    //     console.log("Request made to dev.mysite.com");
    //     res.redirect("http://localhost:5556");
    // } else if (request.headers.host === "pi.mysite") {
    //     console.log("Request made to dev.mysite.com");
    //     // DROP ALL TRAFFIC EXCEPT FOR PORT 21
    //     response.end();
    // } else {
    //     console.log("Request made to something else");
    // }
// }).listen(3001);