const express = require('express')
var app = express();
var http = require('http').Server(app);
var fs = require('fs')
app.set('port', (process.env.PORT || 5000));
app.get('/', function(req, res){
  fs.readFile('index.html', function(error, data){
      if(error){
          console.log(error);
      }else{
          res.writeHead(200, {'Content-Type': 'text/html'});
          res.end(data);
      }
  });
});
//맨처음에 서버 연결하면 몇번포트에 서버 연결되어있는지
http.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
