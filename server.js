var http = require('http');
var httpProxy = require('http-proxy');

httpProxy.createProxyServer({target:'http://vmhost:3000'}).listen(3000); // See (†)