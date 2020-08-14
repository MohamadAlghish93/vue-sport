// server.js 
var express = require('express');
var path = require('path');

var serveStatic = require('serve-static');
app = express();
app.use(serveStatic(__dirname + "/dist"));
//app.use(express.static(__dirname + '/dist'));
//app.use(express.static(path.join(__dirname, 'dist')));
app.route('/*')
    .get(function(req, res) {
          res.sendFile(path.join(__dirname + '/dist/index.html'));
});

var port = process.env.PORT || 5000;
app.listen(port);
console.log('server started '+ port);